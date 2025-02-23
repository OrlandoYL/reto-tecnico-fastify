import { FastifyInstance } from "fastify";
import { getUsers, registerUserController } from "../controllers/userController";
import { userSchema } from "../schemas/userSchema";

export default async function userRoutes(app: FastifyInstance) {
  app.post("/users/register", { schema: userSchema }, registerUserController);
  app.get("/api/users", getUsers);

}
