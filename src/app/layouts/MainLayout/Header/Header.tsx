import { useAppSelector, useAppDispatch } from "@/app/store";
import { logout } from "@/features/auth";
import { Button, Image} from "@/shared/ui";
import styles from "./Header.module.css";
import logoUrl from "@/shared/assets/icons/secondary-logo.svg";
import { SquareArrowRightExit } from "lucide-react";
import { ThemeToggleButton } from "@/features/theme";
import { UserBadge } from "@/shared/ui";

export const Header = () => {
  const {  role, fullName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className={styles.header}>
      <Image className={styles.logoImg} src={logoUrl} alt="logo" />
      <div className={styles.right}>
   
      
          <UserBadge fullName={fullName || 'unknown user'} role={role} />
         <ThemeToggleButton />

        <Button variant="icon" size="small" onClick={handleLogout}>
          <SquareArrowRightExit />
        </Button>
      </div>
    </header>
  );
};

