import { User } from "../../domain/entities/User";
import { UserModel } from "../models/UserModel";

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
