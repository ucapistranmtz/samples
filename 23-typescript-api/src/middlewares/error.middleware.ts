import { Request, Response, NextFunction, RequestHandler } from "express";
import { ApiError } from "../utils/api-error";

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    sucess: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
