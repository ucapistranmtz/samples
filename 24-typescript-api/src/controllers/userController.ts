import { Request, Response, RequestHandler } from "express";
import { randomUUID } from "crypto";
import { User } from "../models/UserModel";

export const createUser: RequestHandler = (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const newUser: User = { id: randomUUID(), name, email };

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
