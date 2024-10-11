import { z } from 'zod';

export const registerRequestSchema = z.object({
  username: z.string(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  designation: z.string(),
  name: z.string()
});

// Infer the TypeScript type from the schema
export type RegisterRequest = z.infer<typeof registerRequestSchema>;