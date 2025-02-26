import express from "express";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validators/authValidator";
import * as taskController from "../controller/taskController";


const router = express.Router();

router.get("/", authenticate,taskController.getUsersTasks);

export default router;
