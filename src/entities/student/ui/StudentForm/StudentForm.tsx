import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  studentSchema,
  type StudentFormData,
} from "@/entities/student/model/types";
import { Input, Button, FormField } from "@/shared/ui";
import styles from "./StudentForm.module.css";

interface StudentFormProps {
  defaultValues?: Partial<StudentFormData>;
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export const StudentForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Add Student",
}: StudentFormProps) => {
  const [rootError, setRootError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      initialBalance: 0,
      ...defaultValues,
    },
  });

  const onFormSubmit = async (data: StudentFormData) => {
    try {
      await onSubmit(data);
      setRootError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error submitting form";
      setRootError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <FormField label="Full Name" error={errors.fullName?.message}>
        <Input
          placeholder="John Doe"
          error={!!errors.fullName}
          {...register("fullName")}
        />
      </FormField>

      <FormField label="Email" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="student@example.com"
          error={!!errors.email}
          {...register("email")}
        />
      </FormField>

      <FormField label="Phone" error={errors.phone?.message}>
        <Input
          type="tel"
          placeholder="+1 234 567 890"
          error={!!errors.phone}
          {...register("phone")}
        />
      </FormField>

      <FormField
        label="Initial Balance ($)"
        error={errors.initialBalance?.message}
      >
        <Input
          type="number"
          error={!!errors.initialBalance}
          {...register("initialBalance")}
        />
      </FormField>

      {rootError && <p className={styles.rootError}>{rootError}</p>}

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};
