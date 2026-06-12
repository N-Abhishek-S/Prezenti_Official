import { useParams, Navigate } from 'react-router-dom';
import { servicesData } from '../data/servicesContent';
import { locationsData } from '../data/locations';
import { ServiceLandingPage } from './ServiceLandingPage';
import { LocationLandingPage } from './LocationLandingPage';
import { LocationServiceLandingPage } from './LocationServiceLandingPage';

export function DynamicRouteResolver() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/" replace />;

  // 1. Is it an exact service?
  if (servicesData[slug]) {
    return <ServiceLandingPage service={servicesData[slug]} />;
  }

  // 2. Is it an exact location?
  if (locationsData[slug]) {
    return <LocationLandingPage location={locationsData[slug]} />;
  }

  // 3. Is it a Service x Location?
  // We need to find if the slug is formed by serviceSlug + '-' + locationSlug
  // Iterate through locations first (since there are fewer locations)
  for (const locKey of Object.keys(locationsData)) {
    if (slug.endsWith(`-${locKey}`)) {
      const possibleServiceSlug = slug.slice(0, -(locKey.length + 1));
      if (servicesData[possibleServiceSlug]) {
        return (
          <LocationServiceLandingPage 
            service={servicesData[possibleServiceSlug]} 
            location={locationsData[locKey]} 
          />
        );
      }
    }
  }

  // 4. Not found
  return <Navigate to="/" replace />;
}
