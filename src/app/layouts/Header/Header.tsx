import { useAppSelector, useAppDispatch } from "@/app/store";
import { logout } from "@/features/auth";
import { Button, Image, Typography } from "@/shared/ui";
import styles from "./Header.module.css";
import { Bell } from "lucide-react";
import logoUrl from "@/shared/assets/icons/secondary-logo.svg";
import { SquareArrowRightExit } from "lucide-react";

const Header = () => {
  const { user, role, fullName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className={styles.header}>
      <Image className={styles.logoImg} src={logoUrl} alt="logo" />
      <div className={styles.right}>
        <Typography variant="caption" className={styles.notification}>
          <Bell />
        </Typography>

        <div className={styles.userInfo}>
          <Typography variant="caption" className={styles.email}>
            {fullName || user?.email}
          </Typography>
          <Typography variant="caption" className={styles.role}>
            {role}
          </Typography>
        </div>

        <Button variant="icon" size="small" onClick={handleLogout}>
          <SquareArrowRightExit />
        </Button>
      </div>
    </header>
  );
};

export default Header;
