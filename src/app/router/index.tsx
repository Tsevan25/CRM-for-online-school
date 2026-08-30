import { createBrowserRouter, Navigate } from "react-router-dom";
import { RoleRoute } from "@/app/router/guards/RoleRoute";
import {ProtectedRoute} from "@/app/router/guards/ProtectedRoute";
import { MainLayout } from "@/app/layouts/MainLayout";

import {LoginPage} from '@/pages/LoginPage';
import { HomePage } from "@/pages/HomePage";
import {DashboardPage} from '@/pages/DashboardPage';
import {StudentsPage} from '@/pages/StudentsPage';
import {StudentDetailPage} from '@/pages/StudentDetailPage';
import {SchedulePage} from '@/pages/SchedulePage';
import {TeacherSchedulePage} from '@/pages/TeacherSchedulePage';
import { TransactionsPage } from '@/pages/TransactionsPage';
import {MyStudentsPage} from '@/pages/MyStudentsPage';
import {UsersPage} from '@/pages/UsersPage';


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "home", element: <HomePage /> },
          { path: "dashboard", element: <DashboardPage /> },

  
          {
            element: <RoleRoute roles={['admin']} />,
            children: [
              { path: "users", element: <UsersPage /> },
            ],
          },


          {
            element: <RoleRoute roles={['admin', 'manager']} />,
            children: [
              { path: "students", element: <StudentsPage /> },
              { path: "students/:id", element: <StudentDetailPage /> },
              { path: "transactions", element: <TransactionsPage /> },
              { path: "schedule", element: <SchedulePage /> },
            ],
          },

          {
            element: <RoleRoute roles={['teacher']} />,
            children: [
              { path: "my-schedule", element: <TeacherSchedulePage /> },
              { path: "my-students", element: <MyStudentsPage /> },
            ],
          },
        ],
      },
    ],
  },
]);