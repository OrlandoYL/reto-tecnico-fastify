import app from "./server";
import { connectDB } from "./infrastructure/database/mongoClient";

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
