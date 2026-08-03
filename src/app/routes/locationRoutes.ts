import { lazy } from 'react';
import type { RouteDefinition } from './routeRegistry';
import { locationData } from '../../content/locations/locationData';

const LocationLandingPage = lazy(() => import('../../pages/LocationLandingPage').then(m => ({ default: m.LocationLandingPage })));

export const locationRoutes: Record<string, RouteDefinition> = {};

Object.entries(locationData).forEach(([key, data]) => {
  locationRoutes[`locations/${data.slug}`] = {
    type: 'LOCATION',
    component: LocationLandingPage,
    dataKey: key
  };
});
