import { useAsync } from '@/shared/hooks/useAsync'
import { useSearch } from '@/shared/hooks/useSearch'
import { fetchUsers } from '@/entities/user'

import { CreateUserAction } from '@/features/user/create'
import { UpdateRoleSelect } from '@/features/user/role-update'
import { DeleteUserAction } from '@/features/user/delete'
import {
  PageHeader,
  DataTable,
  Card,
  EmptyState,
  AsyncBoundary,
  SearchInput,
} from '@/shared/ui'
import type { Column } from '@/shared/ui/DataTable'
import type { UserProfile } from '@/entities/user/model/types'
import styles from './UserList.module.css'

export const UserList = () => {
  const { data, loading, error, refetch } = useAsync(fetchUsers)
  const users = data ?? []

  const { searchTerm, setSearchTerm, filteredData } = useSearch(
    users,
    (user) => `${user.full_name ?? ''} ${user.email ?? ''}`
  )

  const columns: Column<UserProfile>[] = [
    { key: 'name', header: 'Name', render: (u) => u.full_name || '—' },
    { key: 'email', header: 'Email', render: (u) => u.email || '—' },
    {
      key: 'role',
      header: 'Role',
      render: (u) => <UpdateRoleSelect user={u} onRoleUpdated={refetch} />,
    },
    {
      key: 'created_at',
      header: 'Created',
      render: (u) => new Date(u.created_at).toLocaleDateString('en-US'),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (u) => <DeleteUserAction user={u} onDeleted={refetch} />,
    },
  ]

  return (
    <AsyncBoundary loading={loading} error={error}>
      <div className={styles.container}>
        <PageHeader title="Users" action={<CreateUserAction onSuccess={refetch} />} />
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search users..."
        />
        <Card padding="small">
          {filteredData.length === 0 ? (
            <EmptyState message="No users" />
          ) : (
            <DataTable columns={columns} data={filteredData} keyField="id" />
          )}
        </Card>
      </div>
    </AsyncBoundary>
  )
}