import express from "express";
import authRoutes from "./authRoutes";
// Import other route files here

const router = express.Router();

// Base routes
router.use("/api/auth", authRoutes);


export default router;
