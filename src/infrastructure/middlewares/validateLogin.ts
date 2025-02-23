import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const loginValidationRules = [
  body("email").isEmail().withMessage("El correo electrónico no es válido"),
  body("password").not().isEmpty().withMessage("Ingrese clave porfavor"),
];

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: "error",
      message: "Error en los datos de entrada",
      errors: errors.array(),
    });
    return;
  }
  next();
};
