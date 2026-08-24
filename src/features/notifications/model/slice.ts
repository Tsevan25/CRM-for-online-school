import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Notification, NotificationType } from './types'

interface NotificationsState {
  items: Notification[]
}

const initialState: NotificationsState = {
  items: [],
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<{ message: string; type: NotificationType }>
    ) => {
      const id = crypto.randomUUID()
      state.items.push({
        id,
        message: action.payload.message,
        type: action.payload.type,
      })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload)
    },
  },
})

export const { addNotification, removeNotification } = notificationsSlice.actions
export default notificationsSlice.reducer