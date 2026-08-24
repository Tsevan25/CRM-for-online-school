import { useState } from 'react'
import {Modal, Input, Button, Select} from '@/shared/ui'
import { createUser } from '@/shared/api/users'
import styles from './AddUserModal.module.css'

type Role = 'admin' | 'manager' | 'teacher'

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
}

const AddUserModal = ({ isOpen, onClose, onCreated }: AddUserModalProps) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('teacher')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await createUser({ email, password, full_name: fullName, role })
      onCreated()
      onClose()
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null
            ? (err as { message?: string }).message || JSON.stringify(err)
            : 'Error creating user'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const roleOptions = [
    { value: 'teacher', label: 'Teacher' },
    { value: 'manager', label: 'Manager' },
    { value: 'admin', label: 'Admin' },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add User">
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Min 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <Select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          options={roleOptions}
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create User'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddUserModal