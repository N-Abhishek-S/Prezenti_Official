import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { RouteError } from '../components/errors/RouteError';
import { HomePage } from '../features/website/HomePage';
import { RouteFallback } from '../components/layout/RouteFallback';
import { SectionRedirect } from '../components/layout/SectionRedirect';
import { TalkToUs, ServicesHubPage, PrivacyPolicy, TermsAndConditions, IndustryLandingPage, BlogHubPage, BlogPostPage, AboutUs } from './lazyRouteComponents';
import { DynamicRouteResolver } from '../pages/DynamicRouteResolver';

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
      { path: '/contact', element: <SectionRedirect sectionId="contact" /> },
      { path: '/security', element: <SectionRedirect sectionId="services" /> },
      { path: '/industries/:slug', element: withSuspense(<IndustryLandingPage />) },
      { path: '/blog', element: withSuspense(<BlogHubPage />) },
      { path: '/blog/:slug', element: withSuspense(<BlogPostPage />) },
      { path: '/:slug', element: <DynamicRouteResolver /> },
    ],
  },
  { path: '/app', element: <Navigate to="/" replace />, errorElement: <RouteError /> },
  { path: '/login', element: <Navigate to="/" replace />, errorElement: <RouteError /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);
