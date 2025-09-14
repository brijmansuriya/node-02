import { Router } from "express";
import { UserController } from "@controllers/user.controller";
const userController = new UserController();

const router = Router();

router.get("/", userController.index);
router.post("/", userController.create);
router.post("/", userController.update);
router.get("/", userController.delete);

export default router;
