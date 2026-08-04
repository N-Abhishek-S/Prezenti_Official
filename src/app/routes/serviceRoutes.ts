import { ServiceLandingPage, LocationLandingPage, LocationServiceLandingPage } from './routeRegistry';
import type { RouteDefinition } from './routeRegistry';
import { servicesData } from '../../data/servicesContent';
import { locationsData } from '../../data/locations';

export const serviceRoutes: Record<string, RouteDefinition> = {};

// Register exact services
Object.keys(servicesData).forEach(slug => {
  serviceRoutes[slug] = {
    type: 'SERVICE',
    component: ServiceLandingPage,
    dataKey: slug
  };
});

// Register exact locations — flat /{city} routes.
// LocationLandingPage reads from content/locations/locationData.ts (only
// 'pune', 'hinjawadi', 'kharadi' exist there), not from this file's
// locationsData (which has 8 more template-generated cities used below for
// the service x location permutations). Registering a flat /{city} route
// for a city LocationLandingPage can't resolve just renders NotFoundPage,
// so only 'pune' — the one key present in both datasets — is registered
// here. See COMMIT_3_INDEXABILITY_MATRIX.md: this route duplicates
// /locations/pune and is intentionally excluded from the sitemap/prerender
// manifest; it self-canonicalizes to /locations/pune via LocationLandingPage.
if (locationsData['pune']) {
  serviceRoutes['pune'] = {
    type: 'LOCATION',
    component: LocationLandingPage,
    dataKey: 'pune'
  };
}

// Register Service x Location permutations
Object.keys(servicesData).forEach(serviceSlug => {
  Object.keys(locationsData).forEach(locationSlug => {
    const combinedSlug = `${serviceSlug}-${locationSlug}`;
    serviceRoutes[combinedSlug] = {
      type: 'LOCATION_SERVICE',
      component: LocationServiceLandingPage,
      dataKey: combinedSlug,
      serviceKey: serviceSlug,
      locationKey: locationSlug
    };
  });
});
