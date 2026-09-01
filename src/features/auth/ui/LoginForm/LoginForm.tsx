import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Typography, FormField } from "@/shared/ui";
import { useAppDispatch } from "@/app/store";
import { login } from "@/features/auth";
import { loginSchema, type LoginFormData } from "../../model/types";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      await dispatch(login(data)).unwrap();
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown login error";
      setError("root", { message });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h2" className={styles.title}>
        Log In to CRM
      </Typography>

      <FormField label="Email" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="Enter your email address"
          error={!!errors.email}
          {...register("email")}
        />
      </FormField>

      <FormField label="Password" error={errors.password?.message}>
        <Input
          type="password"
          placeholder="Enter your password"
          error={!!errors.password}
          {...register("password")}
        />
      </FormField>

      {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}

      <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : "Log In"}
      </Button>
    </form>
  );
};