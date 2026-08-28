import { useState } from 'react'
import { Select } from '@/shared/ui'
import { updateUserRole } from '../../api/updateUserRole'
import { useAppDispatch } from '@/app/store'
import { addNotification } from '@/features/notifications'
import type { UserProfile } from '@/entities/user/model/types'

const ROLE_OPTIONS = [
  { value: 'teacher', label: 'Teacher' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
]

interface UpdateRoleSelectProps {
  user: UserProfile
  onRoleUpdated?: () => void
}

export const UpdateRoleSelect = ({ user, onRoleUpdated }: UpdateRoleSelectProps) => {
  const dispatch = useAppDispatch()
  const [role, setRole] = useState(user.role || 'teacher')
  const [isUpdating, setIsUpdating] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as 'admin' | 'manager' | 'teacher'
    setRole(newRole)
    setIsUpdating(true)
    try {
      await updateUserRole(user.id, newRole)
      onRoleUpdated?.()
      dispatch(addNotification({ type: 'success', message: 'Role updated successfully' }))
    } catch (err) {
      console.error('Error updating role:', err)
      setRole(user.role || 'teacher')
      dispatch(addNotification({ type: 'error', message: 'Failed to update role' }))
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Select
      value={role}
      onChange={handleChange}
      disabled={isUpdating}
      options={ROLE_OPTIONS}
    />
  )
}