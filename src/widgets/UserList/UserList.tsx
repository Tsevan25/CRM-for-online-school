import { useEffect, useState } from 'react'
import { fetchUsers } from '@/shared/api/users'
import type { UserProfile } from '@/entities/user'
import {Card} from '@/shared'
import styles from './UserList.module.css'

const UserList = () => {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUsers()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div>Loading users...</div>
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
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className={styles.row}>
                <td className={styles.cell}>{u.full_name || '—'}</td>
                <td className={styles.cell}>{u.email || '—'}</td>
                <td className={styles.cell}>{u.role || '—'}</td>
                <td className={styles.cell}>{new Date(u.created_at).toLocaleDateString('en-US')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export default UserList