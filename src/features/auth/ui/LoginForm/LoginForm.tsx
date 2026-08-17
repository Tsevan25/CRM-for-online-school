import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {Input, Button, Typography} from '@/shared';
import { useAppDispatch } from "@/app/store/index";
import { login } from "@/features/auth";
import styles from "./LoginForm.module.css";
import { useNavigate } from 'react-router-dom'

const loginSchema = z.object({
  email: z.string().min(1, "Email is required!").email("Incorrect email"),
  password: z
    .string()
    .min(6, "Your password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
  try {
    await dispatch(login(data)).unwrap()
    navigate('/dashboard')
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unknown login error'
    setError('root', { message })
  }
}

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h2" className={styles.title}>Log In to CRM</Typography>

      <Input
        labelClassName={styles.label}
        label="Email"
        type="email"
        placeholder="Enter your email adress"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        labelClassName={styles.label}
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}

      <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Вход..." : "Log In"}
      </Button>
    </form>
  );
};

export default LoginForm;
