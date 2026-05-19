import { lazy } from 'react';

export const LoginPage = lazy(() => import('../features/auth/LoginPage').then((module) => ({ default: module.LoginPage })));
export const AppShell = lazy(() => import('../components/layout/AppShell').then((module) => ({ default: module.AppShell })));
export const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage').then((module) => ({ default: module.DashboardPage })));
export const AdminOperationsPage = lazy(() => import('../features/admin/AdminOperationsPage').then((module) => ({ default: module.AdminOperationsPage })));
export const TalkToUs = lazy(() => import('../pages/TalkToUs').then((module) => ({ default: module.TalkToUs })));
export const LiveSupport = lazy(() => import('../pages/LiveSupport').then((module) => ({ default: module.LiveSupport })));
