import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            trim: true,
            maxlength: [50, "Name cannot be more than 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false, // Don't return password by default
        },
        verificationToken: {
          type:String
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAuthToken = function (): string {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET || 'default_jwt_secret',
    { expiresIn: process.env.JWT_EXPIRE || '30d' } as jwt.SignOptions
  );
};

export default mongoose.model<IUser>('User', UserSchema);
