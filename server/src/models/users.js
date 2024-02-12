import mongoose, { mongo } from "mongoose";
// setting the Schema for user data
const userSchema = new mongoose.Schema({
  username: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  number: { type: "string", required: true },
  name: { type: "string", required: true },
});

export const userModel = mongoose.model("users", userSchema);
