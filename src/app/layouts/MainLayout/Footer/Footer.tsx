import styles from "./Footer.module.css";
import type { PropsWithChildren } from "react";

export const Footer = ({ children }: PropsWithChildren) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className={styles.text}>© {currentYear} {children}</span>
    </footer>
  );
};


