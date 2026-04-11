import mongoose from "mongoose";
import logger from "../utils/logger.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

  
    logger.info(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error("Database connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
