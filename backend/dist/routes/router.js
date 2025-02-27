"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const taskRoutes_1 = __importDefault(require("./taskRoutes"));
// Import other route files here
const router = express_1.default.Router();
// Base routes
router.use("/api/auth", authRoutes_1.default);
router.use('/api/tasks', taskRoutes_1.default);
exports.default = router;
