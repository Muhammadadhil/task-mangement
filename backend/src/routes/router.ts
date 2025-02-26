import express from "express";
import authRoutes from "./authRoutes";
import taskRoutes from './taskRoutes'
// Import other route files here

const router = express.Router();

// Base routes
router.use("/api/auth", authRoutes);
router.use('/api/tasks/:userId',taskRoutes)


export default router;
