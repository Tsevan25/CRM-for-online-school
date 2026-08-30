ENGLISH SCHOOL CRM

A CRM system for an online English language school, designed to manage students, teachers, schedules, and finances. Supports three user roles: Administrator, Manager, and Teacher.

FEATURES:

- Role-based authentication and protected routes
- Dashboard with analytics and charts for each role
- Student management (add, edit, delete, view details)
- Lesson calendar with create, edit, cancel, and status change
- Financial tracking (transactions, automatic payment on lesson creation)
- User management (admin only)
- Dark theme toggle and toast notifications
- Local search in lists
- Weather widget and personal todo list
- Responsive layout for mobile devices

Tech Stack:

- React 19 + TypeScript
- Vite
- Redux Toolkit
- React Router
- Supabase (Auth, Database, RLS, Edge Functions)
- React Hook Form + Zod
- Recharts
- React Big Calendar
- Feature-Sliced Design (FSD) architecture

PROJECT STRUCTURE (FEATURE-SLICED DESIGN):

src/
app/ – app initialization, router, store, layouts
pages/ – application pages
widgets/ – composite UI blocks
features/ – user scenarios and actions
entities/ – business entities (student, lesson, transaction, user)
shared/ – reusable UI components, hooks, utilities, API client
test/ – test setup and utilities (optional)
main.tsx – entry point
