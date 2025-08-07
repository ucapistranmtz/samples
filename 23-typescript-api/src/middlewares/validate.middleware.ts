import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";

export const validate =
  (schema: ZodSchema, source: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const message = result.error.errors.map((err) => err.message).join(", ");
      return next(new ApiError(400, message));
    }

    req[source] = result.data;
    next();
  };
