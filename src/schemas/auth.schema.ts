import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({ message: "Name is required" }).min(2, "Name must be at least 2 characters"),
  email: z.string({ message: "Email is required" }).email("Invalid email address"),
  password: z.string({ message: "Password is required" }).min(6, "Password must be at least 6 characters"),
  image: z.string().url("Image must be a valid URL").optional(),
});

export const loginSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email address"),
  password: z.string({ message: "Password is required" }).min(6, "Password must be at least 6 characters"),
});

//profileSchema
export const profileSchema = z.object({
  name: z.string({ message: "Name is required" }).min(2, "Name must be at least 2 characters"),
  image: z.string().url("Image must be a valid URL").optional(),
  email: z.string({ message: "Email is required" }).email("Invalid email address"),
  password: z.string({ message: "Password is required" }).min(6, "Password must be at least 6 characters"),
  status: z.string().optional(),
  type: z.string().optional(),
});