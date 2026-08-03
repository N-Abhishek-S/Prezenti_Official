import { lazy } from 'react';

// Lazy load page components
export const ServiceLandingPage = lazy(() => import('../../pages/ServiceLandingPage').then(m => ({ default: m.ServiceLandingPage })));
export const LocationLandingPage = lazy(() => import('../../pages/LocationLandingPage').then(m => ({ default: m.LocationLandingPage })));
export const LocationServiceLandingPage = lazy(() => import('../../pages/LocationServiceLandingPage').then(m => ({ default: m.LocationServiceLandingPage })));
export const KnowledgePage = lazy(() => import('../../pages/KnowledgePage').then(m => ({ default: m.KnowledgePage })));

export type RouteType = 'SERVICE' | 'LOCATION' | 'LOCATION_SERVICE' | 'KNOWLEDGE' | 'INDUSTRY' | 'BLOG' | 'COMPARISON';

export interface RouteDefinition {
  type: RouteType;
  component: React.LazyExoticComponent<any>;
  dataKey: string; // The key to look up data in the respective content file
  serviceKey?: string; // Used for LocationService permutations
  locationKey?: string; // Used for LocationService permutations
}

// We will populate this registry dynamically from our individual route files
export const globalRouteRegistry: Record<string, RouteDefinition> = {};

export function registerRoutes(routes: Record<string, RouteDefinition>) {
  if (import.meta.env.DEV) {
    for (const [path, route] of Object.entries(routes)) {
      const errors: string[] = [];
      if (!path) errors.push('Missing path/slug');
      if (!route.dataKey) errors.push('Missing dataKey');
      if (!route.component) errors.push('Missing component');
      if (!route.type) errors.push('Missing type');

      if (errors.length > 0) {
        console.error(
          `❌ Invalid Route Registration\nPath: /${path}\nReason:\n - ${errors.join('\\n - ')}\n`,
          route
        );
      }
    }
  }
  Object.assign(globalRouteRegistry, routes);
}

export function resolveRoutePath(type: RouteType, dataKey: string): string | null {
  for (const [path, route] of Object.entries(globalRouteRegistry)) {
    if (route.type === type && route.dataKey === dataKey) {
      return `/${path}`;
    }
  }
  
  if (import.meta.env.DEV) {
    console.error(`[Route Registry] Failed to resolve URL for type '${type}' and dataKey '${dataKey}'.`);
  }
  
  return null;
}
