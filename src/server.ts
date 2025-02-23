import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./infrastructure/routes/userRoutes";
import { ResponseGeneric } from "./domain/entities/dto/ResponseGeneric";
import expressApp from "./infrastructure/routes/expressRoutes";
import fastifyExpress from "fastify-express";
import express from "express";

const app = fastify({ logger: true });

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
