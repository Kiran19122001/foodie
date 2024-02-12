import express from "express";
import { userModel } from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
//gerating the strong jwt token
const secretKey = crypto.randomBytes(32).toString("hex");

//using the express router for routing routes
const router = express.Router();
//register route for user registration and storing the user data in the mongodb
router.post("/register", async (req, res) => {
  const { email, name, number, password } = req.body;
  const user = await userModel.findOne({ username: email });
  if (user) {
    return res.json({ message: "User already exists!" });
  }
  // hasing the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // add the new user to the database if it is not already there
  const newUser = new userModel({
    username: email,
    password: hashedPassword,
    number,
    name,
  });
  await newUser.save();
  res.json({ message: "User saved successfully" });
});
// login route for handling the user login request
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ username: email });
  if (!user) {
    return res.json({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "username or password is incorrect" });
  }
  // setting the jwt token
  const token = jwt.sign({ id: user._id }, secretKey, {
    expiresIn: "1h",
  });
  // sending the token and the userId
  res.json({ token, userId: user._id });
});

export { router as userRouter };
