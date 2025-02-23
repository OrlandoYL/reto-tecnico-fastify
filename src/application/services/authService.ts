import { UserRepository } from "../../domain/repositories/userRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new Error("Credenciales inválidas");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Credenciales inválidas");

    const token = jwt.sign(
      {  email: user.email },
      process.env.JWT_SECRET ?? "default_secret",
      { expiresIn: "1h" }
    );

    return { token, email: user.email };
  }
}
