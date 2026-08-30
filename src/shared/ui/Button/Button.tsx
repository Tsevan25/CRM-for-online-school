import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "icon";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = ({
  className,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled,
  children,
  type = "button",
  ...rest
}: ButtonProps) => {
  const combinedClasses = clsx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    className,
  );
  return (
    <button
      className={combinedClasses}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
