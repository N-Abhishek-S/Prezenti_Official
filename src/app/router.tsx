import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { Navigate, createHashRouter } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { RouteError } from '../components/errors/RouteError';
import { ProtectedRoute } from '../features/auth/ProtectedRoute';
import { HomePage } from '../features/website/HomePage';
import { ComingSoon } from '../components/layout/ComingSoon';
import { RouteFallback } from '../components/layout/RouteFallback';
import { SectionRedirect } from '../components/layout/SectionRedirect';
import { AdminOperationsPage, AppShell, DashboardPage, LoginPage, TalkToUs } from './lazyRouteComponents';

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

export const router = createHashRouter([
  {
    element: <PublicLayout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/platform', element: <SectionRedirect sectionId="services" /> },
      { path: '/services', element: <SectionRedirect sectionId="services" /> },
      { path: '/industries', element: <SectionRedirect sectionId="services" /> },
      { path: '/about', element: <SectionRedirect sectionId="home" /> },
      { path: '/pricing', element: <SectionRedirect sectionId="services" /> },
      { path: '/talk-to-us', element: withSuspense(<TalkToUs />) },
      { path: '/live-support', element: <Navigate to="/talk-to-us" replace /> },
      { path: '/compliance', element: <SectionRedirect sectionId="services" /> },
      { path: '/case-studies', element: <SectionRedirect sectionId="home" /> },
      { path: '/faq', element: <SectionRedirect sectionId="contact" /> },
      { path: '/contact', element: <SectionRedirect sectionId="contact" /> },
      { path: '/security', element: <SectionRedirect sectionId="services" /> },
    ],
  },
  { path: '/app', element: <Navigate to="/login" replace />, errorElement: <RouteError /> },
  { path: '/login', element: withSuspense(<LoginPage />), errorElement: <RouteError /> },
  {
    element: withSuspense(
      <ProtectedRoute allowedRoles={['client', 'admin', 'executive', 'supervisor']}>
        <AppShell />
      </ProtectedRoute>,
    ),
    errorElement: <RouteError />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/dashboard/tickets', element: <ComingSoon title="Ticket Management" /> },
      { path: '/dashboard/attendance', element: <ComingSoon title="Attendance Dashboard" /> },
      { path: '/dashboard/branches', element: <ComingSoon title="Branch Management" /> },
      { path: '/dashboard/sla', element: <ComingSoon title="SLA Dashboard" /> },
      { path: '/dashboard/compliance', element: <ComingSoon title="Compliance Vault" /> },
      { path: '/dashboard/invoices', element: <ComingSoon title="Invoice Center" /> },
      { path: '/dashboard/approvals', element: <ComingSoon title="Approvals" /> },
      { path: '/dashboard/amc', element: <ComingSoon title="AMC Calendar" /> },
      { path: '/dashboard/reports', element: <ComingSoon title="Reports Center" /> },
      { path: '/dashboard/escalations', element: <ComingSoon title="Escalation Center" /> },
      { path: '/dashboard/settings', element: <ComingSoon title="Settings" /> },
    ],
  },
  {
    element: withSuspense(
      <ProtectedRoute allowedRoles={['admin']}>
        <AppShell />
      </ProtectedRoute>,
    ),
    errorElement: <RouteError />,
    children: [
      { path: '/admin', element: <AdminOperationsPage /> },
      { path: '/admin/services', element: <AdminOperationsPage /> },
      { path: '/admin/packages', element: <AdminOperationsPage /> },
      { path: '/admin/cities', element: <AdminOperationsPage /> },
      { path: '/admin/leads', element: <AdminOperationsPage /> },
      { path: '/admin/crm', element: <ComingSoon title="CRM Pipeline" /> },
      { path: '/admin/workforce', element: <ComingSoon title="Workforce" /> },
      { path: '/admin/billing', element: <ComingSoon title="Billing Engine" /> },
      { path: '/admin/contracts', element: <ComingSoon title="Contracts" /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
