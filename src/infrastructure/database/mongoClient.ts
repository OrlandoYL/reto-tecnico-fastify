import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/fastifydb'
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error", err);
    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("🔌 Conexión a la base de datos cerrada");
  } catch (error) {
    console.error("❌ Error al cerrar la conexión de la base de datos:", error);
  }
};