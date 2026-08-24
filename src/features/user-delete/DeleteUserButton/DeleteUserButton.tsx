import { useState } from 'react'
import {Button} from '@/shared/ui'
import { deleteUser } from '@/shared/api/users'
import type { UserProfile } from '@/entities/user/model/types'
import { Trash } from 'lucide-react'
import styles from './DeleteUserButton.module.css'
interface DeleteUserButtonProps {
  user: UserProfile
  onDeleted?: () => void
}

const DeleteUserButton = ({ user, onDeleted }: DeleteUserButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClick = async () => {
    if (!confirm(`Delete user ${user.full_name || user.email}?`)) return
    setIsDeleting(true)
    try {
      await deleteUser(user.id)
      onDeleted?.()
    } catch (err) {
      console.error('Error deleting user:', err)
      alert(
        'Failed to delete user: ' +
          (err instanceof Error ? err.message : JSON.stringify(err))
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button variant='icon' size="small" onClick={handleClick} disabled={isDeleting} className={styles.deleteButton}>
      <Trash />
    </Button>
  )
}

export default DeleteUserButton