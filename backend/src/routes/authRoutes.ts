import express from "express";
import * as authController from "../controller/authController";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema, resetPasswordSchema } from "../validators/authValidator";

const router = express.Router();

// Auth routes
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/verify-email/:token", authController.verifyEmail);
// router.post("/forgot-password", authController.forgotPassword);
// router.post("/reset-password/:token", validate(resetPasswordSchema), authController.resetPassword);
router.post("/logout", authController.logout);

// Protected route
router.get("/me", authenticate, authController.getMe);

export default router;
