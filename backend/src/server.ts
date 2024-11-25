import express, { Express } from "express";
import dotenv from "dotenv";
import authRoutes from "@/routes/authRoutes";
import { errorHandler } from "@/middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Express + TypeScript Server",
    version: "1.0.0",
    health: true
  });
});

// auth routes
app.use("/api/auth", requestLogger, authRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
