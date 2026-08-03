import { lazy } from 'react';
import type { RouteDefinition } from './routeRegistry';
import { industryData } from '../../content/industries/industryData';

const IndustryLandingPage = lazy(() => import('../../pages/IndustryLandingPage').then(m => ({ default: m.IndustryLandingPage })));

export const industryRoutes: Record<string, RouteDefinition> = {};

Object.entries(industryData).forEach(([key, data]) => {
  industryRoutes[`industries/${data.slug}`] = {
    type: 'INDUSTRY',
    component: IndustryLandingPage,
    dataKey: key
  };
});
