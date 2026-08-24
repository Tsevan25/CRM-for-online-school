import { useAsync } from "@/shared/hooks/useAsync";
import { fetchUsers, deleteUser } from "@/shared/api/users";
import type { UserProfile } from "@/entities/user";
import { UpdateRoleSelect } from "@/features/user-role-update/UpdateRoleSelect";
import { DeleteUserButton } from "@/features/user-delete/DeleteUserButton";
import { AddUserModal } from "@/features/user-create/AddUserModal";
import {
  Card,
  EmptyState,
  DataTable,
  Button,
  AsyncBoundary,
  ConfirmDialog,
  PageHeader,
} from "@/shared/ui";
import type { Column } from "@/shared/ui/DataTable";
import { useAppDispatch } from "@/app/store";
import { addNotification } from "@/features/notifications";
import styles from "./UserList.module.css";
import { useState } from "react";

const UserList = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<UserProfile | null>(null);

  const { loading, error, refetch } = useAsync(async () => {
    const data = await fetchUsers();
    setUsers(data);
    return data;
  });

  const handleDelete = async () => {
    if (!deletingUser) return;
    try {
      await deleteUser(deletingUser.id);
      setDeletingUser(null);
      await refetch();
      dispatch(
        addNotification({
          type: "success",
          message: "User deleted successfully",
        }),
      );
    } catch (err) {
      console.error("Error deleting user:", err);
      dispatch(
        addNotification({
          type: "error",
          message: "Failed to delete user",
        }),
      );
    }
  };

  const handleUserCreated = () => {
    refetch();
    dispatch(
      addNotification({
        type: "success",
        message: "User created successfully",
      }),
    );
  };

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
      render: (u) => <DeleteUserButton onDelete={() => setDeletingUser(u)} />,
    },
  ];

  return (
    <AsyncBoundary loading={loading} error={error}>
      <div className={styles.container}>
        <PageHeader
          title="Users"
          action={
            <Button
              variant="primary"
              size="small"
              onClick={() => setIsAddUserModalOpen(true)}
            >
              + Add User
            </Button>
          }
        />

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
          onCreated={handleUserCreated}
        />

        <ConfirmDialog
          isOpen={!!deletingUser}
          title="Delete User"
          message={`Are you sure you want to delete ${
            deletingUser?.full_name || deletingUser?.email || "this user"
          }?`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setDeletingUser(null)}
        />
      </div>
    </AsyncBoundary>
  );
};

export default UserList;