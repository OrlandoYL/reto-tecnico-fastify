import { Request, Response } from "express";
import { AuthService } from "../../application/services/authService";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await this.authService.login(email, password);
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }
  }
}
