import { UserDto } from "../../domain/entities/dto/userDto";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepository";
import { hashPassword } from "../../infrastructure/security/passwordHasher";

export class UserService {
  private readonly userRepository = new UserRepository();

  async registerUser(userData: User) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) throw new Error("El correo ya está registrado");

    const hashedPassword = await hashPassword(userData.password);
    const newUser = new User(userData.fullName, userData.email, hashedPassword, userData.phone);
    return  await this.userRepository.createUser(newUser);
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.getAllUsers();
    return UserDto.fromEntities(users);
  }
}
