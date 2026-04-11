npm i -D ts-node-dev @types/node @types/express


pm install express mongoose zod cors dotenv
npm install --save-dev typescript tsx @types/express @types/node @types/cors


npm install cors
npm install --save-dev @types/cors


ChatGPT said:

Perfect 🔥 — adding logging is the next pro step toward a production-ready backend.

We'll use Winston, a powerful and flexible logging library that can:

Log messages to console and files

Format logs nicely (timestamps, colors, JSON)

Separate error logs from info logs

Work seamlessly with Express + TypeScript

Let’s build it cleanly 👇

🧩 Step 1: Install Winston
npm install winston
npm install --save-dev @types/winston

📁 Step 2: Create a Logger Utility

File: src/utils/logger.ts

import winston from "winston";

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom log message format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] : ${stack || message}`;
});

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // Capture stack traces
    logFormat
  ),
  transports: [
    // Console output
    new winston.transports.Console(),

    // Log all info-level and above to app.log
    new winston.transports.File({
      filename: "logs/app.log",
      level: "info",
    }),

    // Log only errors to error.log
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

export default logger;


✅ Explanation

Console logs for local development

Separate files for normal logs and errors

Auto-handles uncaught exceptions & promise rejections

Pretty formatting with timestamps

⚙️ Step 3: Use Logger in the Error Handler

File: src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import logger from "../utils/logger.js";

export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = (err as ApiError).statusCode || 500;
  const message = err.message || "Internal Server Error";

  // 🔥 Log errors
  logger.error(`${statusCode} - ${message}`, {
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};


✅ Explanation

Every error gets logged to console + file.

Keeps API responses clean while logging full details behind the scenes.

⚙️ Step 4: Use Logger Across the App
Example 1 — Log app start

In src/server.ts:

import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));

Example 2 — Log successful DB connection

In src/config/db.ts:

import mongoose from "mongoose";
import logger from "../utils/logger.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

export default connectDB;

🧾 Step 5: Folder for logs

Create a folder:

project-root/logs/


Winston will automatically create these files inside:

logs/app.log
logs/error.log
logs/exceptions.log
logs/rejections.log

🧠 Step 6: Example Output

Console:

2025-10-09 06:00:12 [info] : 🚀 Server running on port 5000
2025-10-09 06:00:13 [info] : ✅ MongoDB Connected: localhost
2025-10-09 06:00:20 [error] : 404 - User not found


logs/error.log:

2025-10-09 06:00:20 [error] : 404 - User not found
Error: User not found
    at getUser (src/controllers/user.controller.ts:20:11)