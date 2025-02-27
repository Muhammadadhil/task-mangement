import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


// Configure email transporter
const transporter = nodemailer.createTransport({
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
export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
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

    await transporter.sendMail(mailOptions);
};

// Send password reset email
export const sendPasswordResetEmail = async (email: string, token: string): Promise<void> => {
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

    await transporter.sendMail(mailOptions);
};
