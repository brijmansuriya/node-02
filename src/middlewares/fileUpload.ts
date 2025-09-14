import multer from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { log } from "console";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.fieldname + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).any(); // .any() supports all cases

export function fileUpload(req: Request, res: Response, next: NextFunction) {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });

    (req as any).filesStored = {};

    // Case 1: multiple files → req.files (array)
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file: Express.Multer.File) => {
        (req as any).filesStored[file.fieldname] = file.filename;
      });
    }

    // Case 2: single file → req.file
    if (req.file) {
      (req as any).filesStored[req.file.fieldname] = req.file.filename;
    }
    
    next();
  });
}
