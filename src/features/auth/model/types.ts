import type { Session, User } from "@supabase/supabase-js";
import { z } from "zod";

export type Role = "admin" | "manager" | "teacher" | null;

export interface AuthState {
  user: User | null;
  session: Session | null;
  role: Role;
  fullName: string | null;
  loading: boolean;
}

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required!").email("Incorrect email"),
  password: z.string().min(6, "Your password must be at least 6 characters long"),
});

export type LoginFormData = z.infer<typeof loginSchema>;