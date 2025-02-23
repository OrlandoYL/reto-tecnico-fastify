import app from "./server";
import { connectDB } from "./infrastructure/database/mongoClient";

const start = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT ?? 3000
    await app.listen({ port: Number(PORT), host: "0.0.0.0" });
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
