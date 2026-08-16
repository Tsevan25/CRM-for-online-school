import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { role } = useAppSelector((state) => state.auth);

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink to="/dashboard" className={linkClassName}>
          Дашборд
        </NavLink>

        {role === "admin" && (
          <>
            <NavLink to="/users" className={linkClassName}>
              Пользователи
            </NavLink>
            <NavLink to="/settings" className={linkClassName}>
              Настройки
            </NavLink>
          </>
        )}

        {(role === "admin" || role === "manager") && (
          <>
            <NavLink to="/students" className={linkClassName}>
              Ученики
            </NavLink>
            <NavLink to="/transactions" className={linkClassName}>
              Транзакции
            </NavLink>
            <NavLink to="/schedule" className={linkClassName}>
              Расписание
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

export default Sidebar;
