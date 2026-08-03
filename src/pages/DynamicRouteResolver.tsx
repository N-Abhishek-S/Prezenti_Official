import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { globalRouteRegistry } from '../app/routes/routeRegistry';
import { RouteFallback } from '../components/layout/RouteFallback';
import { NotFoundPage } from './NotFoundPage';

export function DynamicRouteResolver() {
  const location = useLocation();
  const pathKey = location.pathname.replace(/^\//, '');

  if (!pathKey) return <NotFoundPage />;

  const routeDef = globalRouteRegistry[pathKey];

  if (!routeDef) {
    return <NotFoundPage />;
  }

  const Component: any = routeDef.component;

  return (
    <Suspense fallback={<RouteFallback />}>
      <Component routeDef={routeDef} />
    </Suspense>
  );
}
