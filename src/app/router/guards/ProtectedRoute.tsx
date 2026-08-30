import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";
import { Spinner } from "@/shared/ui";

export const ProtectedRoute = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

