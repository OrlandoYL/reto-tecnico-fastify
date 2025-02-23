import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./infrastructure/routes/userRoutes";
import { connectDB } from "./infrastructure/database/mongoClient";
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

const start = async () => {
  try {
    await connectDB();
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
