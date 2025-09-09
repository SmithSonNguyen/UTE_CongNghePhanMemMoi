import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

export const User = mongoose.model("user", userSchema);
