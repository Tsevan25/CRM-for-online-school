import { useAsync } from '@/shared/hooks/useAsync'
import { fetchUsers } from '@/shared/api/users'
import type { UserProfile } from '@/entities/user'
import { UpdateRoleSelect } from '@/features/user'
import { DeleteUserButton } from '@/features/user'
import {Card, Spinner} from '@/shared'
import styles from './UserList.module.css'
import { useState } from 'react'

const UserList = () => {
  const [users, setUsers] = useState<UserProfile[]>([])

  const { loading, error, refetch } = useAsync(async () => {
    const data = await fetchUsers()
    setUsers(data)
    return data
  })

  if (loading) return <Spinner />
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users</h2>
      <Card padding="small">
        <table className={styles.table}>
          <thead>
            <tr className={styles.headRow}>
              <th className={styles.headCell}>Name</th>
              <th className={styles.headCell}>Email</th>
              <th className={styles.headCell}>Role</th>
              <th className={styles.headCell}>Created</th>
              <th className={styles.headCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={styles.row}>
                <td className={styles.cell}>{user.full_name || '—'}</td>
                <td className={styles.cell}>{user.email || '—'}</td>
                <td className={styles.cell}>
                  <UpdateRoleSelect user={user} onRoleUpdated={refetch} />
                </td>
                <td className={styles.cell}>
                  {new Date(user.created_at).toLocaleDateString('en-US')}
                </td>
                <td className={styles.actions}>
                  <DeleteUserButton user={user} onDeleted={refetch} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export default UserList