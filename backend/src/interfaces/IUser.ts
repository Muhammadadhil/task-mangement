import { ObjectId, Document } from "mongoose";

// export interface IUser extends Document {
//     _id: ObjectId;
//     name: string;
//     email: string;
//     password: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    verificationToken?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
    generateAuthToken(): string;
}