import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const mongoURI = process.env?.MONGO_URI;

if (!mongoURI) {
  throw new Error("Missing MONGO_URI environment variable");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection.asPromise();

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};