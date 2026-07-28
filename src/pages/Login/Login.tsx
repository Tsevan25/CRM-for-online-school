import LoginForm from "../../features/auth/ui/LoginForm";
import styles from "./Login.module.css";

const Login = () => {
    return (
        <div className={styles.loginWrapper}>
            <LoginForm />
        </div>
    )
}

export default Login;