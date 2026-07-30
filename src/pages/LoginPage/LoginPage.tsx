import LoginForm from "../../features/auth/ui/LoginForm";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
    return (
        <div className={styles.loginWrapper}>
            <LoginForm />
        </div>
    )
}

export default LoginPage;