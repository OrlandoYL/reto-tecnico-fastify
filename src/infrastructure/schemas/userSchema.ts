import { FastifySchema } from "fastify";

export const userSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["fullName", "email", "password"],
    properties: {
      fullName: { type: "string", minLength: 1 },
      email: { type: "string", format: "email" },
      password: {
        type: "string",
        minLength: 8,
        pattern: "^(?=.*[A-Z])(?=.*\\d).*$", // Al menos 1 mayúscula y 1 número
      },
      phone: {
        type: "string",
        pattern: "^[+]?[0-9]{10,15}$", // Formato internacional opcional
        nullable: true,
      },
    },
  }
};
