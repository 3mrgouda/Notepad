import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import notes from "./routes/notes.js";
import users from "./routes/users.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({
  path: "./config/.env",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "../client", "dist")));

// API Routes
app.use("/api/v1/notes", notes);
app.use("/api/v1/users", users);

// Fallback for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

// Start server after connecting to DB
const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
