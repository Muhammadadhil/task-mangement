"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const common_1 = require("@_opportune/common");
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const socketServer_1 = require("./config/socketServer");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
const allowedOrigins = [(_a = process.env.LOCAL_ORIGIN) === null || _a === void 0 ? void 0 : _a.replace(/\/$/, ""), (_b = process.env.VERCEL_ORIGIN) === null || _b === void 0 ? void 0 : _b.replace(/\/$/, ""), (_c = process.env.PRODUCTION_ORIGIN) === null || _c === void 0 ? void 0 : _c.replace(/\/$/, "")];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use(common_1.errorHandler);
app.use("/", router_1.default);
(0, common_1.connectMongoDB)(process.env.MONGODB_URL, "Task-mangagement");
const server = http_1.default.createServer(app);
(0, socketServer_1.initSocketServer)(server);
const PORT = process.env.PORT || 3199;
server.listen(PORT, () => {
    console.log(`Backend server is running on the port ${PORT}`);
    console.log(`Socket.io server available at ws://localhost:${PORT}/socket.io/`);
});
