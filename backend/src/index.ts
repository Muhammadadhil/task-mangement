import express from "express";
import router from "./routes/router";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongoDB, errorHandler } from "@_opportune/common";
import morgan from 'morgan'

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(morgan('dev'));


const allowedOrigins = [process.env.LOCAL_ORIGIN?.replace(/\/$/, ""), process.env.VERCEL_ORIGIN?.replace(/\/$/, ""), process.env.PRODUCTION_ORIGIN?.replace(/\/$/, "")];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(errorHandler);

app.use("/", router);

connectMongoDB(process.env.MONGODB_URL!,"Task-mangagement");

const PORT = process.env.PORT || 3199;

app.listen(PORT, () => {
    console.log(`Backend server is running on the port ${PORT}`);
});
