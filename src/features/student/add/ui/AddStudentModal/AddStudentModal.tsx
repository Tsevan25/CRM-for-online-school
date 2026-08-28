import {Modal} from "@/shared/ui";
import { StudentForm, type StudentFormData } from "@/entities/student";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => void;
}

export const AddStudentModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddStudentModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Student">
      <StudentForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
};

