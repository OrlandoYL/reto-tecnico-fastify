import { FastifyInstance } from "fastify";
import { getUsers, registerUserController } from "../controllers/userController";
import { userSchema } from "../schemas/userSchema";

export default async function userRoutes(app: FastifyInstance) {
  app.post("/users/register", { schema: userSchema }, registerUserController);
  // ✅ Proteger esta ruta con autenticación
  app.get("/api/users", { preHandler: [app.authenticate] }, async (req, reply) => {
    return getUsers(req, reply);
  });

}
