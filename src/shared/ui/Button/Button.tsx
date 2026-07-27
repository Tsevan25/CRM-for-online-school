import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button = ({
  className,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled,
  children,
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
    <button className={combinedClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
