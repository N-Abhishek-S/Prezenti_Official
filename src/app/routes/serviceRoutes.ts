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

// Register exact locations
Object.keys(locationsData).forEach(slug => {
  serviceRoutes[slug] = {
    type: 'LOCATION',
    component: LocationLandingPage,
    dataKey: slug
  };
});

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
