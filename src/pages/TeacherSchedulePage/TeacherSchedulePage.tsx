import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/store";
import { ScheduleCalendar } from "@/widgets/ScheduleCalendar";
import { fetchLessonsByTeacher, updateLesson } from "@/shared/api/lessons";
import type {
  LessonStatus,
  LessonWithNames,
} from "@/entities/lesson/model/types";
import { AsyncBoundary } from "@/shared/ui";
import { useAsync } from "@/shared/hooks/useAsync";
import { addNotification } from "@/features/notifications";

const TeacherSchedulePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [lessons, setLessons] = useState<LessonWithNames[]>([]);

  const { loading, error } = useAsync(async () => {
    if (!user?.id) return [];
    const data = await fetchLessonsByTeacher(user.id);
    setLessons(data);
    return data;
  });

  const handleStatusChange = async (
    lessonId: string,
    newStatus: LessonStatus,
  ) => {
    try {
      const updated = await updateLesson(lessonId, { status: newStatus });
      setLessons((prev) =>
        prev.map((l) => (l.id === updated.id ? updated : l)),
      );
      dispatch(
        addNotification({
          type: "success",
          message: "Status updated successfully",
        }),
      );
    } catch (err) {
      console.error("Error updating status:", err);
      dispatch(
        addNotification({
          type: "error",
          message: "Failed to update status",
        }),
      );
    }
  };

  return (
    <AsyncBoundary loading={loading} error={error}>
      <ScheduleCalendar
        lessons={lessons}
        canCreate={false}
        canEdit={false}
        canCancel={false}
        canChangeStatus={true}
        onStatusChange={handleStatusChange}
      />
    </AsyncBoundary>
  );
};

export default TeacherSchedulePage;