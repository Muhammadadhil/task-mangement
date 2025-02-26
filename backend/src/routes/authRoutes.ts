import express from "express";
import * as authController from "../controller/authController";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validators/authValidator";

const router = express.Router();

// Auth routes
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/logout", authController.logout);

// router.get("/me", authenticate, authController.getMe);

export default router;
