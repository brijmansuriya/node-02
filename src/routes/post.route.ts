import { Router } from "express";
import { PostController } from "@controllers/post.controller";
import { auth } from "@middlewares/auth"
const postController = new PostController();

const router = Router();

//mid
router.use(auth);

router.get("/", postController.index);

export default router;
