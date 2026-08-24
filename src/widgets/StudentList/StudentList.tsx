import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Student, StudentFormData } from "@/entities/student/model/types";
import { AddStudentModal } from "@/features/student-add/AddStudentModal";
import { EditStudentModal } from "@/features/student-edit/EditStudentModal";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent as deleteStudentAPI,
} from "@/shared/api/students";
import { useAppSelector, useAppDispatch } from "@/app/store";
import {
  Button,
  Card,
  EmptyState,
  DataTable,
  AsyncBoundary,
  ConfirmDialog,
  PageHeader,
} from "@/shared/ui";
import { useAsync } from "@/shared/hooks/useAsync";
import type { Column } from "@/shared/ui/DataTable";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import styles from "./StudentList.module.css";
import { UserPen, Trash } from "lucide-react";
import { addNotification } from "@/features/notifications";

interface StudentListProps {
  students?: Student[];
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

const StudentList = ({
  students: externalStudents,
  canAdd = true,
  canEdit = true,
  canDelete = true,
}: StudentListProps) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [internalStudents, setInternalStudents] = useState<Student[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

  const students = externalStudents ?? internalStudents;
  const isExternal = !!externalStudents;

  const { loading, error, refetch } = useAsync(async () => {
    if (isExternal) return [];
    const data = await fetchStudents();
    setInternalStudents(data);
    return data;
  });

  const handleAddStudent = async (data: StudentFormData) => {
    if (!user?.id) return;
    try {
      await createStudent({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        balance: data.initialBalance,
        created_by: user.id,
      });
      setIsAddModalOpen(false);
      await refetch();
      dispatch(addNotification({ type: "success", message: "Student added successfully" }));
    } catch (err) {
      console.error("Error creating student:", err);
      dispatch(addNotification({ type: "error", message: "Failed to add student" }));
    }
  };

  const handleEditStudent = async (data: StudentFormData) => {
    if (!editingStudent) return;
    try {
      await updateStudent(editingStudent.id, {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        balance: data.initialBalance,
      });
      setEditingStudent(null);
      await refetch();
      dispatch(addNotification({ type: "success", message: "Student updated successfully" }));
    } catch (err) {
      console.error("Error updating student:", err);
      dispatch(addNotification({ type: "error", message: "Failed to update student" }));
    }
  };

  const handleDeleteStudent = async () => {
    if (!deletingStudent) return;
    try {
      await deleteStudentAPI(deletingStudent.id);
      setDeletingStudent(null);
      await refetch();
      dispatch(addNotification({ type: "success", message: "Student deleted successfully" }));
    } catch (err) {
      console.error("Error deleting student:", err);
      dispatch(addNotification({ type: "error", message: "Failed to delete student" }));
    }
  };

  const columns: Column<Student>[] = [
    {
      key: "name",
      header: "Name",
      render: (student) =>
        !isExternal ? (
          <Button
            variant="secondary"
            size="small"
            onClick={() => navigate(`/students/${student.id}`)}
          >
            {student.full_name}
          </Button>
        ) : (
          student.full_name
        ),
    },
    {
      key: "email",
      header: "Email",
      render: (student) => student.email || "—",
    },
    {
      key: "phone",
      header: "Phone",
      render: (student) => student.phone || "—",
    },
    {
      key: "balance",
      header: "Balance",
      render: (student) => formatCurrency(student.balance),
    },
    {
      key: "created_at",
      header: "Created",
      render: (student) =>
        new Date(student.created_at).toLocaleDateString("en-US"),
    },
    ...(canEdit || canDelete
      ? [
          {
            key: "actions",
            header: "Actions",
            render: (student: Student) => (
              <>
                {canEdit && !isExternal && (
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => setEditingStudent(student)}
                    aria-label="Edit student"
                  >
                    <UserPen />
                  </Button>
                )}
                {canDelete && !isExternal && (
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => setDeletingStudent(student)}
                    aria-label="Delete student"
                  >
                    <Trash />
                  </Button>
                )}
              </>
            ),
          },
        ]
      : []),
  ];

  return (
    <AsyncBoundary loading={loading} error={error}>
      <div className={styles.container}>
        <PageHeader
          title="Students"
          action={
            canAdd && !isExternal ? (
              <Button
                variant="primary"
                size="small"
                onClick={() => setIsAddModalOpen(true)}
              >
                + Add Student
              </Button>
            ) : undefined
          }
        />

        <Card padding="small">
          {students.length === 0 ? (
            <EmptyState message="No students" />
          ) : (
            <DataTable columns={columns} data={students} keyField="id" />
          )}
        </Card>

        {!isExternal && (
          <AddStudentModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddStudent}
          />
        )}

        {editingStudent && (
          <EditStudentModal
            student={editingStudent}
            isOpen={!!editingStudent}
            onClose={() => setEditingStudent(null)}
            onSubmit={handleEditStudent}
          />
        )}

        <ConfirmDialog
          isOpen={!!deletingStudent}
          title="Delete Student"
          message={`Are you sure you want to delete ${deletingStudent?.full_name}?`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleDeleteStudent}
          onCancel={() => setDeletingStudent(null)}
        />
      </div>
    </AsyncBoundary>
  );
};

export default StudentList;