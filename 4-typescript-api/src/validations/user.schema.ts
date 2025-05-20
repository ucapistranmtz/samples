import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required').max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  userName: z
    .string()
    .min(1, 'Username is required')
    .max(20, 'Username must be at most 20 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof userSchema>;
