
import app from './app';
import { initPrisma } from '@config/database';
import indexRoutes from '@routes/index.route';

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Index route working!" });
});

app.use("/api", indexRoutes);

async function startServer() {
  await initPrisma();
  app.listen(PORT, () => {
    const host = process.env.HOST || 'localhost';
    console.log(`Server running at http://${host}:${PORT}`);
  });
}

startServer();