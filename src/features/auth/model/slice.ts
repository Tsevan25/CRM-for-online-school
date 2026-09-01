import { createSlice } from '@reduxjs/toolkit'
import type { AuthState } from './types'
import { checkSession, login, logout } from './auth.thunks'

const initialState: AuthState = {
  user: null,
  session: null,
  role: null,
  fullName: null,
  loading: true,
}

export const authSlice = createSlice({
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
          state.fullName = action.payload.fullName
        }
      })
      .addCase(checkSession.rejected, (state) => {
        state.loading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.session = action.payload.session
        state.user = action.payload.user
        state.role = action.payload.role
        state.fullName = action.payload.fullName
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.session = null
        state.role = null
        state.fullName = null
      })
  },
})

export default authSlice.reducer