import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { Navigate, createHashRouter } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { RouteError } from '../components/errors/RouteError';
import { HomePage } from '../features/website/HomePage';
import { RouteFallback } from '../components/layout/RouteFallback';
import { SectionRedirect } from '../components/layout/SectionRedirect';
import { TalkToUs } from './lazyRouteComponents';

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
  { path: '/app', element: <Navigate to="/" replace />,errorElement: <RouteError /> },
  { path: '/login', element: <Navigate to="/" replace />, errorElement: <RouteError /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);
