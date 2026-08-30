import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store'

interface RoleRouteProps {
  roles: Array<'admin' | 'manager' | 'teacher'>
}

export const RoleRoute = ({ roles }: RoleRouteProps) => {
  const { role } = useAppSelector((state) => state.auth)

  if (!role || !roles.includes(role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}