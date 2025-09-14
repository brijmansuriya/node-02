import { config } from 'dotenv';
config();
import express, { Express } from 'express';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads
app.use("/uploads", express.static("uploads"));

// Example route
// app.post("/upload", fileUpload, (req, res) => {
//   return res.json({
//     success: true,
//     message: "Image uploaded successfully",
//     url: (req as any).fileUrl,
//   });
// });


export default app;