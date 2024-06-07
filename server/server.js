import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import notes from "./routes/notes.js";
import users from "./routes/users.js";
import { connectDB } from "./config/db.js";
dotenv.config({
  path: "./config/.env",
});
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/notes", notes);
app.use("/api/v1/users", users);

app.listen(3000, () => {
  try {
    connectDB();
    console.log("Server started on port 3000");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
