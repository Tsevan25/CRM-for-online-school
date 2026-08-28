import { useState } from 'react'
import { Button, ConfirmDialog } from '@/shared/ui'
import { deleteUser } from '../../api/deleteUser'
import { useAppDispatch } from '@/app/store'
import { addNotification } from '@/features/notifications'
import type { UserProfile } from '@/entities/user/model/types'
import { Trash } from 'lucide-react'

interface DeleteUserActionProps {
  user: UserProfile
  onDeleted?: () => void
}

export const DeleteUserAction = ({ user, onDeleted }: DeleteUserActionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleConfirm = async () => {
    try {
      await deleteUser(user.id)
      setIsOpen(false)
      onDeleted?.()
      dispatch(addNotification({ type: 'success', message: 'User deleted successfully' }))
    } catch (err) {
      console.error('Error deleting user:', err)
      dispatch(addNotification({ type: 'error', message: 'Failed to delete user' }))
    }
  }

  return (
    <>
      <Button variant="icon" size="small" onClick={() => setIsOpen(true)} aria-label="Delete user">
        <Trash />
      </Button>
      <ConfirmDialog
        isOpen={isOpen}
        title="Delete User"
        message={`Are you sure you want to delete ${user.full_name || user.email}?`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setIsOpen(false)}
      />
    </>
  )
}