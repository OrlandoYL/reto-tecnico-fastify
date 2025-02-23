import { IUser } from './../../interfaces/userInterfaces';
import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
