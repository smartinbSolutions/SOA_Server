// services/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const registerUser = async (
  email: string,
  password: string,
  name: any
) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
  });

  return { id: user._id, email: user.email };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password.");

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "90d",
  });

  return {
    token,
    user: { id: user._id, email: user.email, name: user.name },
  };
};
export const getUsers = async () => {
  return await User.find({}, "-password");
};

export const updateUser = async (
  id: string,
  data: { name?: string; email?: string; password?: string }
) => {
  const updateData: any = {};

  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) throw new Error("User not found");

  return updatedUser;
};
