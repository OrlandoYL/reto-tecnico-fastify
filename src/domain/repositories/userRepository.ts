import mongoose from "mongoose";
import { User } from "../../domain/entities/User";

const UserSchema = new mongoose.Schema<User>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: false },
});

const UserModel = mongoose.model("User", UserSchema);

export class UserRepository {
  async createUser(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async getAllUsers(): Promise<User[]> {
    return await UserModel.find();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ email }).exec();
      return user ? user.toObject() : null;
    } catch (error) {
      throw new Error("Database error while fetching user.");
    }
  }
}
