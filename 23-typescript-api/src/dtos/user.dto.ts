import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  age: z.number().int().positive().optional(),
});
