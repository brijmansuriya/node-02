import { Router } from "express";
import { AuthController } from "@controllers/auth.controller";
import { validate } from "@middlewares/validate";
import { registerSchema, loginSchema, profileSchema } from "@schemas/auth.schema";
import { fileUpload } from "@middlewares/fileUpload";
import { auth } from "@middlewares/auth"

const router = Router();
const authController = new AuthController();

router.get("/", authController.index);
router.post("/login", fileUpload, validate(loginSchema), authController.login);
router.post("/register", fileUpload, validate(registerSchema), authController.register);
router.get("/logout", auth, authController.logout);

//auth middleware
router.get('/profile', auth, authController.profile);
router.post('/profile/:id', auth,fileUpload, validate(profileSchema), authController.profileUpdate);

export default router;