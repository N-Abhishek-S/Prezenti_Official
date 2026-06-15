import { lazy, Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { servicesData } from '../data/servicesContent';
import { locationsData } from '../data/locations';
import { RouteFallback } from '../components/layout/RouteFallback';

const ServiceLandingPage = lazy(() => import('./ServiceLandingPage').then(m => ({ default: m.ServiceLandingPage })));
const LocationLandingPage = lazy(() => import('./LocationLandingPage').then(m => ({ default: m.LocationLandingPage })));
const LocationServiceLandingPage = lazy(() => import('./LocationServiceLandingPage').then(m => ({ default: m.LocationServiceLandingPage })));

export function DynamicRouteResolver() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/" replace />;

  // 1. Is it an exact service?
  if (servicesData[slug]) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <ServiceLandingPage service={servicesData[slug]} />
      </Suspense>
    );
  }

  // 2. Is it an exact location?
  if (locationsData[slug]) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <LocationLandingPage location={locationsData[slug]} />
      </Suspense>
    );
  }

  // 3. Is it a Service x Location?
  // We need to find if the slug is formed by serviceSlug + '-' + locationSlug
  // Iterate through locations first (since there are fewer locations)
  for (const locKey of Object.keys(locationsData)) {
    if (slug.endsWith(`-${locKey}`)) {
      const possibleServiceSlug = slug.slice(0, -(locKey.length + 1));
      if (servicesData[possibleServiceSlug]) {
        return (
          <Suspense fallback={<RouteFallback />}>
            <LocationServiceLandingPage 
              service={servicesData[possibleServiceSlug]} 
              location={locationsData[locKey]} 
            />
          </Suspense>
        );
      }
    }
  }

  // 4. Not found
  return <Navigate to="/" replace />;
}
