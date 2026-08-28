import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "@/app/router/ProtectedRouter";
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
          { path: "students", element: <StudentsPage /> },
          { path: "students/:id", element: <StudentDetailPage /> },
          { path: "my-students", element: <MyStudentsPage /> },
          { path: "transactions", element: <TransactionsPage /> },
          { path: "schedule", element: <SchedulePage /> },
          { path: "my-schedule", element: <TeacherSchedulePage /> },
          { path: "users", element: <UsersPage /> },
        ],
      },
    ],
  },
]);
