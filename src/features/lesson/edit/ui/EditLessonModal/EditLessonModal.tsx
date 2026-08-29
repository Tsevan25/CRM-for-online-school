import { useState, useEffect } from "react";
import Modal from "@/shared/ui/Modal/Modal";
import Button from "@/shared/ui/Button/Button";
import { LessonForm } from "@/entities/lesson/ui/LessonForm";
import { updateLesson } from "../../api/updateLesson";
import { useAppDispatch } from "@/app/store";
import { addNotification } from "@/features/notifications";
import type {
  LessonFormData,
  LessonWithNames,
} from "@/entities/lesson/model/types";
import { fetchStudents } from "@/entities/student/api/studentApi";
import { supabase } from "@/shared/api/supabase";

const toLocalInput = (iso: string) => {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const toISODate = (localDateTime: string) =>
  new Date(localDateTime).toISOString();

interface EditLessonModalProps {
  lesson: LessonWithNames;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onCancelRequest?: () => void;
}

export const EditLessonModal = ({
  lesson,
  isOpen,
  onClose,
  onSuccess,
  onCancelRequest,
}: EditLessonModalProps) => {
  const dispatch = useAppDispatch();
  const [students, setStudents] = useState<{ id: string; full_name: string }[]>(
    [],
  );
  const [teachers, setTeachers] = useState<{ id: string; full_name: string }[]>(
    [],
  );

  useEffect(() => {
    if (isOpen) {
      fetchStudents().then(setStudents);
      supabase
        .from("profiles")
        .select("id, full_name")
        .eq("role", "teacher")
        .then(({ data }) => {
          if (data) setTeachers(data);
        });
    }
  }, [isOpen]);

  const handleSubmit = async (data: LessonFormData) => {
    try {
      await updateLesson(lesson.id, {
        student_id: data.studentId,
        teacher_id: data.teacherId,
        start_time: toISODate(data.startTime),
        end_time: toISODate(data.endTime),
        price: data.price,
      });
      onSuccess?.();
      onClose();
      dispatch(
        addNotification({
          type: "success",
          message: "Lesson updated successfully",
        }),
      );
    } catch (err) {
      console.error("Error updating lesson:", err);
      dispatch(
        addNotification({ type: "error", message: "Failed to update lesson" }),
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Lesson">
      <LessonForm
        defaultValues={{
          studentId: lesson.student_id,
          teacherId: lesson.teacher_id,
          startTime: toLocalInput(lesson.start_time),
          endTime: toLocalInput(lesson.end_time),
          price: lesson.price,
        }}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Save Changes"
        students={students}
        teachers={teachers}
      />
      {onCancelRequest && (
        <div style={{ marginTop: "1rem", textAlign: "right" }}>
          <Button variant="danger" onClick={onCancelRequest}>
            Cancel Lesson
          </Button>
        </div>
      )}
    </Modal>
  );
};
