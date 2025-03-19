import express from "express";
import authRoutes from "./authRoutes";
import taskRoutes from './taskRoutes'

const router = express.Router();

// Base routes
router.use("/api/auth", authRoutes);
router.use('/api/tasks',taskRoutes)


export default router;
