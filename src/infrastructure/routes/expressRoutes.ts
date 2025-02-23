import express from "express";
import { AuthController } from "../controllers/authController";
import { AuthService } from "../../application/services/authService";
import { UserRepository } from "../../domain/repositories/userRepository";
import { loginValidationRules, validateLogin } from "../middlewares/validateLogin";

const expressApp = express();
expressApp.use(express.json());

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

expressApp.post("/api/login", loginValidationRules, validateLogin, (req:any, res:any) => {
  return authController.login(req, res);
});

export default expressApp;
