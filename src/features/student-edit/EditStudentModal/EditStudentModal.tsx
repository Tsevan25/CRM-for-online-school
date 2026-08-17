import {Modal} from "@/shared/ui";
import type { Student } from "@/entities/student/model/types";
import { type StudentFormData, StudentForm } from "@/entities/student";

interface EditStudentModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => void;
}

const EditStudentModal = ({
  student,
  isOpen,
  onClose,
  onSubmit,
}: EditStudentModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Edit Student">
    <StudentForm
      defaultValues={{
        fullName: student.full_name,
        email: student.email || "",
        phone: student.phone || "",
        initialBalance: student.balance,
      }}
      onSubmit={onSubmit}
      onCancel={onClose}
      submitLabel="Save Changes"
    />
  </Modal>
);

export default EditStudentModal;
