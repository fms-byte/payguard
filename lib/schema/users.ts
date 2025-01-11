import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(72, "Password cannot exceed 72 characters")
  .regex(
    /^(?=.*[a-z])(?=.*\d)/,
    "Password must contain at least one lowercase letter, and one number"
  );

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: passwordSchema,
});

// Base User Schema
export const baseUserSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

// Signup User Schema
export const signupSchema = baseUserSchema
  .extend({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Role type
export const UserRole = z.enum(["admin", "user"]);
export type UserRoleSchema = z.infer<typeof UserRole>;

// User schema
export const userSchema = baseUserSchema.extend({
    password: passwordSchema,
    role: UserRole.default("user"),
});

// Reset password schema
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Email only schema (for password reset request)
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});


// Types derived from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type User = z.infer<typeof userSchema>;
