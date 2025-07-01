// controllers/auth.controller.ts
import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
} from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await registerUser(email, password, name);
    res.status(201).json({ message: "Registered successfully", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await updateUser(id, { name, email, password });
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
