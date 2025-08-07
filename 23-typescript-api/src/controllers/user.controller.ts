import { Request, Response, RequestHandler, NextFunction } from "express";
import * as userModel from "../models/user.model";
import { ApiError } from "../utils/api-error";

export const getAll: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = userModel.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = userModel.getUserById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const createUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = userModel.createUser(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deleted = userModel.deleteUserById(id);
    if (!deleted) {
      throw new ApiError(404, "User not found");
    }
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = userModel.updateUserById(id, req.body);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
