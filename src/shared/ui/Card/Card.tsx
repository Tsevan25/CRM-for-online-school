import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import styles from "./Card.module.css";

type CardPadding = "small" | "medium" | "large";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  padding?: CardPadding;
}

export const Card = ({
  padding = "medium",
  className,
  children,
  ...rest
}: CardProps) => {
  const combinedClasses = clsx(styles.card, styles[padding], className);
  return (
    <div className={combinedClasses} {...rest}>
      {children}
    </div>
  );
};
