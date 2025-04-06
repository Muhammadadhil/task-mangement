import { Request, Response, NextFunction } from "express";
import User from "../model/User";
import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { sendVerificationEmail, sendPasswordResetEmail } from "../utils/EmailService";

// Register new user
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // throw new ApiError(400, "Email already in use");
            res.status(400).json({message:'Email already registered'});
            return
        }

        // Create verification token
        const verificationToken = crypto.randomBytes(20).toString("hex");
        // Create new user
        const user = await User.create({
            name,
            email,
            password,
            verificationToken,
            isVerified: false,
        });

        // Send verification email
        await sendVerificationEmail(user.email, verificationToken);

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

    } catch (error) {
        next(error);
    }
};

// Login user
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            throw new ApiError(400, "Please provide email and password");
        }

        // Find user
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new ApiError(401, "Invalid credentials");
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid credentials");
        }

        if (!user.isVerified){
            res.status(400).json({success:false,message:"Email not verified"});
            return
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
    } catch (error) {
        next(error);
    }
};

// Verify email
export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { token } = req.params;
        // Find user by verification token
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            res.status(400).json({success:false,message:"Email verification failed"});
            throw new ApiError(400, "Invalid or expired verification token");
        }

        // Update user
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully. You can now login.",
        });
        
    } catch (error) {
        next(error);
    }
};

// Logout
export const logout = async (req: Request, res: Response): Promise<void> => {
    res.cookie("refreshToken", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};


export const refreshAccessToken = async (req: Request, res: Response): Promise<Response> => {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                return res.status(400).json({ message: "No Refresh token found" });
            }

            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET!) as JwtPayload;
            if (!decoded) {
                // return null;
            }
            const { id } = decoded;

            const user = await User.findOne({ _id: id });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const newAccessToken = user?.generateAuthToken();
            
            if (!newAccessToken) {
                return res.status(400).json({ message: "Invalid refresh token" });
            }
            return res.status(200).json({ accessToken: newAccessToken });

        } catch (error) {
            console.error("Error refreshing access token:", error);
            return res.status(500).json({ error: "Failed to refresh access token" });
        }
    }

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            throw new ApiError(404, "User not found");
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
    } catch (error) {
        next(error);
    }
};
