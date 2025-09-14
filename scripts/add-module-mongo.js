// scripts/add-module.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const name = process.argv[2];

if (!name) {
  console.error("❌ Please provide a module name. Example: npm run add auth");
  process.exit(1);
}

const pascalCase = name.charAt(0).toUpperCase() + name.slice(1);

// Folders
const basePath = path.join(__dirname, "..", "src");
const routesPath = path.join(basePath, "routes");
const controllersPath = path.join(basePath, "controllers");
const modelsPath = path.join(basePath, "models");

// Ensure folders exist
[routesPath, controllersPath, modelsPath].forEach((p) => {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Files
const files = [
  {
    filePath: path.join(routesPath, `${name}.route.ts`),
    content: `import { Router } from "express";
import { ${name}Controller } from "../controllers/${name}.controller";

const router = Router();

router.get("/", ${name}Controller.index);

export default router;
`
  },
  {
    filePath: path.join(controllersPath, `${name}.controller.ts`),
    content: `import { Request, Response } from "express";

export const ${name}Controller = {
  index: (req: Request, res: Response) => {
    res.json({ message: "${pascalCase} controller working!" });
  }
};
`
  },
  {
    filePath: path.join(modelsPath, `${name}.model.ts`),
    content: `// ${pascalCase} model (adjust as needed)
export interface ${pascalCase} {
  id: string;
  // add more fields
}
`
  }
];

// Write files if they don’t exist
files.forEach(({ filePath, content }) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log("✅ Created:", filePath);
  } else {
    console.log("⚠️ Already exists:", filePath);
  }
});
