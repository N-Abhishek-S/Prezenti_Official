/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { RouteError } from '../components/errors/RouteError';
import { HomePage } from '../features/website/HomePage';
import { RouteFallback } from '../components/layout/RouteFallback';
import { SectionRedirect } from '../components/layout/SectionRedirect';
import { DynamicRouteResolver } from '../pages/DynamicRouteResolver';
import { NotFoundPage } from '../pages/NotFoundPage';
import './routes/index'; // Initialize global route registry
const ServicesHubPage = lazy(() => import('./lazyRouteComponents').then(m => ({ default: m.ServicesHubPage })));
const PrivacyPolicy = lazy(() => import('./lazyRouteComponents').then(m => ({ default: m.PrivacyPolicy })));
const TermsAndConditions = lazy(() => import('./lazyRouteComponents').then(m => ({ default: m.TermsAndConditions })));
const AboutUs = lazy(() => import('./lazyRouteComponents').then(m => ({ default: m.AboutUs })));
const TalkToUs = lazy(() => import('../pages/TalkToUs').then(m => ({ default: m.TalkToUs })));

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/platform', element: <SectionRedirect sectionId="services" /> },
      { path: '/services', element: withSuspense(<ServicesHubPage />) },
      { path: '/privacy-policy', element: withSuspense(<PrivacyPolicy />) },
      { path: '/terms-and-conditions', element: withSuspense(<TermsAndConditions />) },
      { path: '/industries', element: <SectionRedirect sectionId="services" /> },
      { path: '/about', element: withSuspense(<AboutUs />) },
      { path: '/pricing', element: <SectionRedirect sectionId="services" /> },
      { path: '/talk-to-us', element: withSuspense(<TalkToUs />) },
      { path: '/live-support', element: <Navigate to="/talk-to-us" replace /> },
      { path: '/receptionist-services', element: <Navigate to="/receptionist-staffing-services" replace /> },
      { path: '/compliance', element: <SectionRedirect sectionId="services" /> },
      { path: '/case-studies', element: <SectionRedirect sectionId="home" /> },
      { path: '/faq', element: <SectionRedirect sectionId="contact" /> },
      { path: '/faqs', element: <SectionRedirect sectionId="contact" /> },
      { path: '/contact', element: <SectionRedirect sectionId="contact" /> },
      { path: '/security', element: <SectionRedirect sectionId="services" /> },
      { path: '/blog', element: <DynamicRouteResolver /> },
      { path: '/blog/:slug', element: <DynamicRouteResolver /> },
      { path: '/industries/:slug', element: <DynamicRouteResolver /> },
      { path: '/locations/:slug', element: <DynamicRouteResolver /> },
      { path: '/:slug', element: <DynamicRouteResolver /> },
    ],
  },
  { path: '/app', element: <Navigate to="/" replace />, errorElement: <RouteError /> },
  { path: '/login', element: <Navigate to="/" replace />, errorElement: <RouteError /> },
  { path: '*', element: <NotFoundPage /> },
]);
