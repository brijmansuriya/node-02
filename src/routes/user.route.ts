import { Router } from "express";
import { UserController } from "@controllers/user.controller";
import { auth } from "@middlewares/auth"
const userController = new UserController();

const router = Router();

//mid
router.use(auth);

router.get("/", userController.index);
router.post("/", userController.create);
router.post("/", userController.update);
router.get("/delete/:id", userController.delete);

export default router;
