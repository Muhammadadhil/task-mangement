"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.refreshAccessToken = exports.logout = exports.verifyEmail = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../model/User"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const EmailService_1 = require("../utils/EmailService");
// Register new user
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            // throw new ApiError(400, "Email already in use");
            res.status(400).json({ message: 'Email already registered' });
            return;
        }
        // Create verification token
        const verificationToken = crypto_1.default.randomBytes(20).toString("hex");
        console.log('verification Token:', verificationToken);
        // Create new user
        const user = yield User_1.default.create({
            name,
            email,
            password,
            verificationToken,
            isVerified: false,
        });
        // Send verification email
        yield (0, EmailService_1.sendVerificationEmail)(user.email, verificationToken);
        // Generate token
        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();
        // Return user without password
        const userWithoutPassword = {
            id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
        };
        // Set cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully. Please verify your email.",
            data: {
                user: userWithoutPassword,
                accessToken,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
// Login user
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            throw new ApiError_1.ApiError(400, "Please provide email and password");
        }
        // Find user
        const user = yield User_1.default.findOne({ email }).select("+password");
        if (!user) {
            throw new ApiError_1.ApiError(401, "Invalid credentials");
        }
        // Verify password
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError_1.ApiError(401, "Invalid credentials");
        }
        if (!user.isVerified) {
            res.status(400).json({ success: false, message: "Email not verified" });
            return;
        }
        // Generate token
        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();
        // Return user without password
        const userWithoutPassword = {
            id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
        };
        // Set cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: userWithoutPassword,
                accessToken,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
// Verify email
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        console.log('tokennn:', token);
        // Find user by verification token
        const user = yield User_1.default.findOne({ verificationToken: token });
        if (!user) {
            res.status(400).json({ success: false, message: "Email verification failed" });
            throw new ApiError_1.ApiError(400, "Invalid or expired verification token");
        }
        // Update user
        user.isVerified = true;
        user.verificationToken = undefined;
        yield user.save();
        res.status(200).json({
            success: true,
            message: "Email verified successfully. You can now login.",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyEmail = verifyEmail;
// Logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("refreshToken", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});
exports.logout = logout;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({ message: "No Refresh token found" });
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET);
        if (!decoded) {
            console.log("invalid token");
            // return null;
        }
        const { id } = decoded;
        const user = yield User_1.default.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const newAccessToken = user === null || user === void 0 ? void 0 : user.generateAuthToken();
        if (!newAccessToken) {
            return res.status(400).json({ message: "Invalid refresh token" });
        }
        return res.status(200).json({ accessToken: newAccessToken });
    }
    catch (error) {
        console.error("Error refreshing access token:", error);
        return res.status(500).json({ error: "Failed to refresh access token" });
    }
});
exports.refreshAccessToken = refreshAccessToken;
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.id);
        if (!user) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMe = getMe;
