import { lazy } from 'react';

export const LoginPage = lazy(() => import('../features/auth/LoginPage').then((module) => ({ default: module.LoginPage })));
export const AppShell = lazy(() => import('../components/layout/AppShell').then((module) => ({ default: module.AppShell })));
export const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage').then((module) => ({ default: module.DashboardPage })));
export const AdminPricingPage = lazy(() => import('../features/admin/AdminPricingPage').then((module) => ({ default: module.AdminPricingPage })));
