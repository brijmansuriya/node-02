// src/config/multer.ts
import multer from "multer";

// Memory storage (files kept in memory as buffer)
const upload = multer({ storage: multer.memoryStorage() });

export default upload;
