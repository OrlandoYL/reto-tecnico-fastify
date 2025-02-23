import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../../application/services/userService";
import { User } from "../../domain/entities/User";
import { ResponseGeneric } from "../../domain/entities/dto/ResponseGeneric";
import { UserDto } from "../../domain/entities/dto/userDto";

const userService = new UserService();

export const registerUserController = async (
  request: FastifyRequest<{ Body: User }>,
  reply: FastifyReply
) => {
  try {
    const newUser = await userService.registerUser(request.body);
    const response: ResponseGeneric<typeof newUser> = {
      status: "success",
      message: "Usuario registrado exitosamente",
      data: newUser
    };
    return reply.status(201).send(response);  
  } catch (error: any) {
    return reply.status(500).send({
      status: "error",
      message: error.message
    });
    }
};
export const getUsers = async(req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users: UserDto[] = await userService.getUsers();
    const response: ResponseGeneric<typeof users> = {
      status: "success",
      message: "Listado de usuarios",
      data: users
    };
    return reply.status(200).send(response);  
  } catch (error:any) {
    return reply.status(500).send({
      status: "error",
      message: error.message
    });
  }
}