import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AppShell } from '../components/layout/AppShell';
import { RouteError } from '../components/errors/RouteError';
import { ProtectedRoute } from '../features/auth/ProtectedRoute';

// Website pages
import { HomePage } from '../features/website/HomePage';
import { PlatformPage } from '../features/website/PlatformPage';
import { ServicesPage } from '../features/website/ServicesPage';
import { IndustriesPage } from '../features/website/IndustriesPage';
import { AboutPage } from '../features/website/AboutPage';
import { PricingPage } from '../features/website/PricingPage';
import { CompliancePage } from '../features/website/CompliancePage';
import { CaseStudiesPage } from '../features/website/CaseStudiesPage';
import { FaqPage } from '../features/website/FaqPage';
import { ContactPage } from '../features/website/ContactPage';
import { SecurityPage } from '../features/website/SecurityPage';

// Auth
import { LoginPage } from '../features/auth/LoginPage';

// Dashboard
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { AdminPricingPage } from '../features/admin/AdminPricingPage';

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="text-5xl mb-4">🚧</div>
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <p className="text-neutral-500 text-sm max-w-md">This module is under active development and will be available in the next release.</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/platform', element: <PlatformPage /> },
      { path: '/services', element: <ServicesPage /> },
      { path: '/industries', element: <IndustriesPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/pricing', element: <PricingPage /> },
      { path: '/compliance', element: <CompliancePage /> },
      { path: '/case-studies', element: <CaseStudiesPage /> },
      { path: '/faq', element: <FaqPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/security', element: <SecurityPage /> },
    ],
  },
  { path: '/login', element: <LoginPage />, errorElement: <RouteError /> },
  {
    element: <ProtectedRoute allowedRoles={['client', 'admin', 'executive', 'supervisor']}><AppShell /></ProtectedRoute>,
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
    element: <ProtectedRoute allowedRoles={['admin']}><AppShell /></ProtectedRoute>,
    errorElement: <RouteError />,
    children: [
      { path: '/admin', element: <AdminPricingPage /> },
      { path: '/admin/pricing', element: <AdminPricingPage /> },
      { path: '/admin/crm', element: <ComingSoon title="CRM Pipeline" /> },
      { path: '/admin/workforce', element: <ComingSoon title="Workforce" /> },
      { path: '/admin/billing', element: <ComingSoon title="Billing Engine" /> },
      { path: '/admin/contracts', element: <ComingSoon title="Contracts" /> },
    ],
  },
]);
