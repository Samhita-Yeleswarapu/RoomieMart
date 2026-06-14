import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import { connectDB } from "./config/db.js";
import { initializeSocket } from "./sockets/socketServer.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import demandRoutes from "./routes/demandRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

const server = http.createServer(app);

// Database
connectDB();

// Socket.IO
initializeSocket(server);

// Middleware
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
// API Routes
app.use("/user-api", userRoutes);

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RoomieMart Backend Running 🚀",
  });
});

app.use("/product-api", productRoutes);

app.use("/wishlist-api", wishlistRoutes);

app.use("/demand-api", demandRoutes);

app.use("/rental-api", rentalRoutes);

app.use("/review-api", reviewRoutes);

app.use(
  "/notification-api",
  notificationRoutes
);

app.use("/report-api", reportRoutes);

app.use("/chat-api", chatRoutes);

app.use("/ai-api", aiRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `RoomieMart Server Running on Port ${PORT}`
  );
});
