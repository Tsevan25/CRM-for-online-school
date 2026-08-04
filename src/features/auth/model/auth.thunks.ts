import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '@/shared/api/supabase'

export const checkSession = createAsyncThunk('auth/checkSession', async () => {
  const { data } = await supabase.auth.getSession()
  if (!data.session) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', data.session.user.id)
    .single()

  return {
    session: data.session,
    user: data.session.user,
    role: profile?.role ?? null,
    fullName: profile?.full_name ?? null,
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', data.user.id)
      .single()

    return {
      session: data.session,
      user: data.user,
      role: profile?.role ?? null,
      fullName: profile?.full_name ?? null,
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await supabase.auth.signOut()
})