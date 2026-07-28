import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

const ProtectedRoute = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
