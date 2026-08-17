import { Typography, Image } from "@/shared";
import LoginForm from "../../features/auth/ui/LoginForm";
import styles from "./LoginPage.module.css";
import logoUrl from "@/shared/assets/icons/main-logo.png";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.contentArea}>
        <Typography variant="h1" className={styles.schoolTitle}>
          SurfLingo
        </Typography>
        <Image className={styles.logo} src={logoUrl} alt="logo" />
        <Typography variant="body" className={styles.tagline}>
          Conquer the ocean of language. <br /> Speak without limits.
        </Typography>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
