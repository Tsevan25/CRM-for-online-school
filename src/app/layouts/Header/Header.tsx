import { useAppSelector, useAppDispatch } from "@/app/store";
import { logout } from '@/features/auth'
import {Button} from "@/shared";
import styles from "./Header.module.css";
import { Bell } from "lucide-react";
import logoUrl from '@/shared/assets/icons/secondary-logo.svg'


const Header = () => {
  const { user, role, fullName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className={styles.header}>
      <img className={styles.logoImg} src={logoUrl} alt="logo" />
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
