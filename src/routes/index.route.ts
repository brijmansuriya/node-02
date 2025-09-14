import { Router } from "express";
import authRoutes from "@routes/auth.route";
import userRoutes from "@routes/user.route";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Index route working!" });
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
