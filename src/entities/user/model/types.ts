export type Role = 'admin' | 'manager' | 'teacher' | null

export interface UserProfile {
  id: string
  role: Role
  full_name: string | null
  email: string | null
  created_at: string
}