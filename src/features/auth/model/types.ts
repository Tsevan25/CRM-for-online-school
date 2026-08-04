import type { Session, User } from "@supabase/supabase-js";

export type Role = "admin" | "manager" | "teacher" | null;

export interface AuthState {
  user: User | null;
  session: Session | null;
  role: Role;
  fullName: string | null;
  loading: boolean;
}