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
exports.sendPasswordResetEmail = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configure email transporter
const transporter = nodemailer_1.default.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_USER_PASSWORD,
    },
});
//  const transpoter = nodemailer.createTransport({
//      host: "smtp.gmail.com",
//      port: 587,
//      secure: false,
//      requireTLS: true,
//      auth: {
//          user: process.env.NODEMAILER_USER,
//          pass: process.env.NODEMAILER_USER_PASSWORD,
//      },
//  });
// Send verification email
const sendVerificationEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
    const mailOptions = {
        from: `"Task Manager" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: "Please verify your email",
        html: `
      <h1>Email Verification</h1>
      <p>Thank you for registering. Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendVerificationEmail = sendVerificationEmail;
// Send password reset email
const sendPasswordResetEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const mailOptions = {
        from: `"Task Manager" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: "Password Reset",
        html: `
      <h1>Password Reset</h1>
      <p>You requested a password reset. Please click the link below to set a new password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
