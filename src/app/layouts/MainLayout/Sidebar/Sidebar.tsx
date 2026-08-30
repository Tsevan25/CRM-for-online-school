import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { role } = useAppSelector((state) => state.auth);

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink to="/home" className={linkClassName}>
          Home
        </NavLink>
        <NavLink to="/dashboard" className={linkClassName}>
          Dashboard
        </NavLink>

        {role === "admin" && (
          <>
            <NavLink to="/users" className={linkClassName}>
              Users
            </NavLink>
          </>
        )}

        {(role === "admin" || role === "manager") && (
          <>
            <NavLink to="/students" className={linkClassName}>
              Students
            </NavLink>
            <NavLink to="/transactions" className={linkClassName}>
              Transactions
            </NavLink>
            <NavLink to="/schedule" className={linkClassName}>
              Schedule
            </NavLink>
          </>
        )}

        {role === "teacher" && (
          <>
            <NavLink to="/my-schedule" className={linkClassName}>
              My Schedule
            </NavLink>
            <NavLink to="/my-students" className={linkClassName}>
              My Students
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

