import LoginForm from "../../features/auth/ui/LoginForm";
import styles from "./LoginPage.module.css";
import logoUrl from "../../shared/assets/icons/main-logo.png";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.contentArea}>
        <h1 className={styles.schoolTitle}>SurfLingo</h1>
        <img className={styles.logo} src={logoUrl} alt="logo" />
        <p className={styles.tagline}>
          Conquer the ocean of language. <br /> Speak without limits.
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
