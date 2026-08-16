import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import ProtectedRoute from '@/app/router/ProtectedRouter'
import {MainLayout} from '@/app/layouts/MainLayout'
import DashboardPage from '@/pages/DashboardPage'
import StudentsPage from '@/pages/StudentPage/StudentPage'
import StudentDetailPage from '@/pages/StudentDetailPage'
import SchedulePage from '@/pages/SchedulePage/SchedulePage'
import TeacherSchedulePage from '@/pages/TeacherSchedulePage/TeacherSchedulePage'
import TransactionsPage from '@/pages/TransactionsPage/TransactionsPage'
import MyStudentsPage from '@/pages/MyStudentsPage/MyStudentsPage'
import { UsersPage } from '@/pages/UsersPage'




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
        element: <MainLayout />,
        children: [

          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'students', element: <StudentsPage /> },
          { path: 'students/:id', element: <StudentDetailPage />},
          { path: 'my-students', element: <MyStudentsPage /> },
          { path: 'transactions', element: <TransactionsPage /> },
          { path: 'schedule', element: <SchedulePage /> },
          {path: 'my-schedule', element: <TeacherSchedulePage />},
          { path: 'users', element: <UsersPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
])