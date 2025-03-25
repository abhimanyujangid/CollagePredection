import { z } from "zod";

//=====================Zod Schemas for Auth Features======================

// Authservice Schemas
export const LoginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

export const RegisterDataSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[!@#$%^&*]/, "Must contain at least one special character"),
  role: z.enum(["STUDENT", "COLLEGE_ADMIN"]),
  terms: z
    .boolean()
    .refine((v) => v, { message: "You must agree to the terms" }),
});
export type RegisterData = z.infer<typeof RegisterDataSchema>;

export const UserSchema = z.object({
  email: z.string().email().optional(),
  fullName: z.string().optional(),
  avatar: z.string().optional(),
  role: z.string().optional(),
  _id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type User = z.infer<typeof UserSchema>;

export const LoginResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const RegisterResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
});
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

export const UpdatePasswordDataSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});
export type UpdatePasswordData = z.infer<typeof UpdatePasswordDataSchema>;

// AuthSlice Schemas
export const AuthStateSchema = z.object({
  user: UserSchema.nullable(),
  loading: z.boolean(),
  error: z.string().nullable(),
  isAuthenticated: z.boolean(),
});
export type AuthState = z.infer<typeof AuthStateSchema>;
