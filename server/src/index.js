import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";

const app = express();
app.use(express.json());
//cors for resources sharing
app.use(cors());
//router for login and register routes
app.use("/auth", userRouter);
//cnnecting to the mogoDb server
mongoose.connect(
  "mongodb+srv://Kiranbandla:Kiranbandla@cluster0.7z4juun.mongodb.net/recipiedb"
);
//port listening
app.listen(3001, () => {
  console.log("listening on http://localhost:3001");
});
