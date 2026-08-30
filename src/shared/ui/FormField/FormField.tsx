import type { PropsWithChildren } from "react";
import clsx from "clsx";
import { Typography } from "@/shared/ui";
import styles from "./FormField.module.css";

interface FormFieldProps extends PropsWithChildren {
  label?: string;
  error?: string;
  htmlFor?: string;
  className?: string;
}

export const FormField = ({
  label,
  error,
  htmlFor,
  className,
  children,
}: FormFieldProps) => {
  const fieldId =
    htmlFor || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={clsx(styles.field, className)}>
      {label && (
        <label htmlFor={fieldId} className={styles.label}>
          <Typography variant="caption">{label}</Typography>
        </label>
      )}
      {children}
      {error && (
        <Typography variant="caption" className={styles.error}>
          {error}
        </Typography>
      )}
    </div>
  );
};
