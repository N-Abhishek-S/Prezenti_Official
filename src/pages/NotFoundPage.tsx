import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container } from '../components/ui/Container';
import { ArrowRight } from 'lucide-react';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404: Page Not Found | Prezenti</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-[70vh] flex items-center justify-center bg-brand-light py-20 px-4">
        <Container>
          <div className="max-w-2xl mx-auto text-center bg-white p-12 rounded-[28px] shadow-sm border border-brand-accent/10">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-accent">Error 404</p>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold text-brand-dark">Page Not Found</h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-dark/70">
              The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-dark"
              >
                Go back home
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/talk-to-us"
                className="inline-flex items-center gap-2 rounded-full bg-brand-light px-6 py-3.5 text-sm font-semibold text-brand-dark transition-all hover:bg-brand-dark/10"
              >
                Contact support
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
