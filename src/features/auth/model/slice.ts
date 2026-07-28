import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../shared/api/supabase';
import type { Session, User } from '@supabase/supabase-js';

type Role = 'admin' | 'manager' | 'teacher' | null;

interface AuthState {
  user: User | null
  session: Session | null
  role: Role
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  session: null,
  role: null,
  loading: true, 
}

export const checkSession = createAsyncThunk('auth/checkSession', async () => {
  const { data } = await supabase.auth.getSession()
  if (!data.session) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.session.user.id)
    .single()

  return {
    session: data.session,
    user: data.session.user,
    role: profile?.role ?? null,
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    return {
      session: data.session,
      user: data.user,
      role: profile?.role ?? null,
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await supabase.auth.signOut()
})


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkSession.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.session = action.payload.session
          state.user = action.payload.user
          state.role = action.payload.role
        }
      })
      .addCase(checkSession.rejected, (state) => {
        state.loading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.session = action.payload.session
        state.user = action.payload.user
        state.role = action.payload.role
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.session = null
        state.role = null
      })
  },
})

export default authSlice.reducer