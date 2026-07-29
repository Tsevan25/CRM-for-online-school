import { useAppSelector, useAppDispatch } from "../../../store";
import { logout } from "../../../../features/auth/model/slice";
import Button from "../../../../shared/ui/Button";
import styles from "./Header.module.css";
import { Bell } from "lucide-react";


const Header = () => {
  const { user, role, fullName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className={styles.header}>
      <span className={styles.logo}>English School CRM</span>
      <div className={styles.right}>
        <span className={styles.notification}><Bell /></span>

        <div className={styles.userInfo}>
          <span className={styles.email}>{fullName || user?.email}</span>
          <span className={styles.role}>{role}</span>
        </div>

        <Button variant="secondary" size="small" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </header>
  );
};

export default Header;
