import { useAsync } from "@/shared/hooks/useAsync";
import { fetchUsers } from "@/shared/api/users";
import type { UserProfile } from "@/entities/user";
import { UpdateRoleSelect } from "@/features/user-role-update/UpdateRoleSelect";
import { DeleteUserButton } from "@/features/user-delete/DeleteUserButton";
import { AddUserModal } from "@/features/user-create/AddUserModal";
import {
  Card,
  Spinner,
  ErrorMessage,
  EmptyState,
  DataTable,
  Typography,
  Button,
} from "@/shared/ui";
import type { Column } from "@/shared/ui/DataTable";
import styles from "./UserList.module.css";
import { useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const { loading, error, refetch } = useAsync(async () => {
    const data = await fetchUsers();
    setUsers(data);
    return data;
  });

  const columns: Column<UserProfile>[] = [
    { key: "name", header: "Name", render: (u) => u.full_name || "—" },
    { key: "email", header: "Email", render: (u) => u.email || "—" },
    {
      key: "role",
      header: "Role",
      render: (u) => <UpdateRoleSelect user={u} onRoleUpdated={refetch} />,
    },
    {
      key: "created_at",
      header: "Created",
      render: (u) => new Date(u.created_at).toLocaleDateString("en-US"),
    },
    {
      key: "actions",
      header: "Actions",
      render: (u) => <DeleteUserButton user={u} onDeleted={refetch} />,
    },
  ];

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h2" className={styles.title}>
          Users
        </Typography>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          + Add User
        </Button>
      </div>

      <Card padding="small">
        {users.length === 0 ? (
          <EmptyState message="No users" />
        ) : (
          <DataTable columns={columns} data={users} keyField="id" />
        )}
      </Card>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onCreated={() => refetch()}
      />
    </div>
  );
};

export default UserList;
