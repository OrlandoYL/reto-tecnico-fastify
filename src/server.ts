import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./infrastructure/routes/userRoutes";
import { ResponseGeneric } from "./domain/entities/dto/ResponseGeneric";
import expressApp from "./infrastructure/routes/expressRoutes";
import fastifyExpress from "fastify-express";
import express from "express";
import jwt from "jsonwebtoken";
import fastifyCors from "@fastify/cors";

const app = fastify({ logger: true });

// Habilitar CORS 🔥
app.register(fastifyCors, {
  origin: "*", // Permite solicitudes desde cualquier origen (modifica esto según tu caso)
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  credentials: true, // Permite el envío de cookies o credenciales
});

// ✅ Middleware de autenticación para proteger endpoints
app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
  console.log("Headers:", request.headers);
  console.log("Intentando verificar token...");
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return reply.status(401).send({ status: "error", message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1]; // Extraer el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "default_secret"); // Verificar el token

    request.user = decoded; // Guardar datos del usuario autenticado
  } catch (err) {
    return reply.status(401).send({ status: "error", message: "Token inválido o no proporcionado" });
  }
});

(async () => {
  await app.register(fastifyExpress);
  const expressInstance = express();
  expressInstance.use(expressApp);
  app.use(expressInstance);
})();

app.register(userRoutes);

app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  if (error.validation) {
    reply.status(400).send({
      status: "error",
      message: "Error en los datos de entrada",
      details: error.validation.map((err) => ({
        field: err.instancePath.replace("/", ""),
        error: err.message,
      })),
    });
  } else {
    const response: ResponseGeneric<null> = {
      status: "error",
      message: error.message
    };
    return reply.status(error.statusCode ?? 500).send(response);
  }
});

// 🔥 Exportamos la instancia de Fastify sin iniciar el servidor
export default app;
