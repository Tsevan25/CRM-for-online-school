import { Typography, Image } from "@/shared/ui";
import {LoginForm} from '@/features/auth';
import styles from "./LoginPage.module.css";
import logoUrl from "@/shared/assets/icons/main-logo.png";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.contentArea}>
        <Typography variant="h1" className={styles.schoolTitle}>
          SurfLingo
        </Typography>
        <Typography variant="body" className={styles.tagline}>
          Conquer the ocean of language. <br /> Speak without limits.
        </Typography>
        <Image className={styles.logo} src={logoUrl} alt="logo" />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
