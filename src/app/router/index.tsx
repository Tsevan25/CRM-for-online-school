import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../../pages/LoginPage'
import ProtectedRoute from './ProtectedRouter'
import Layout from '../layouts/MainLayout'
import DashboardPage from '../../pages/DashboardPage'



const StudentsPage = () => <div>Ученики</div>;
const TransactionsPage = () => <div>Транзакции</div>;
const SchedulePage = () => <div>Расписание</div>;
const UsersPage = () => <div>Пользователи</div>;
const SettingsPage = () => <div>Настройки</div>;

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [

          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'students', element: <StudentsPage /> },
          { path: 'transactions', element: <TransactionsPage /> },
          { path: 'schedule', element: <SchedulePage /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
])