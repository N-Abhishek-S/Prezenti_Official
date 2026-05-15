import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
    ? error.message
    : String(error);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-8 text-center">
      <div className="max-w-2xl rounded-[28px] border border-rose-200 bg-white p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-rose-600">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-950">The page could not be rendered</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          We hit an issue while loading this view. Refresh the page or try again later.
        </p>
        <pre className="mt-6 overflow-x-auto rounded-2xl bg-slate-900/5 p-4 text-left text-xs text-slate-700">
          {message}
        </pre>
      </div>
    </div>
  );
}
