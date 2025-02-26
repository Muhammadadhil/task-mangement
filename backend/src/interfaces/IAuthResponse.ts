import {IUser} from "./IUser";

export type RegisterUserResponse = Promise<{ success: true; user: Omit<IUser, "password">; accessToken: string; refreshToken: string } | { success: false; message: string }>;
export type LoginUserResponse = Promise<{ user: IUser; accessToken: string; refreshToken: string }>;