import { useState } from 'react'
import { updateUserRole } from '@/shared/api/users'
import type { UserProfile } from '@/entities/user/model/types'
import styles from './UpdateRoleSelect.module.css'

const ROLE_OPTIONS = ['admin', 'manager', 'teacher'] as const

interface UpdateRoleSelectProps {
  user: UserProfile
  onRoleUpdated?: () => void
}

const UpdateRoleSelect = ({ user, onRoleUpdated }: UpdateRoleSelectProps) => {
  const [role, setRole] = useState(user.role || 'teacher')
  const [isUpdating, setIsUpdating] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as 'admin' | 'manager' | 'teacher'
    setRole(newRole)
    setIsUpdating(true)
    try {
      await updateUserRole(user.id, newRole)
      onRoleUpdated?.()
    } catch (err) {
      console.error('Error updating role:', err)
      setRole(user.role || 'teacher') 
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <select
      className={styles.select}
      value={role}
      onChange={handleChange}
      disabled={isUpdating}
    >
      {ROLE_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default UpdateRoleSelect