import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { trackCTA } from '../../lib/analytics';

export function ServiceCta({ title, description }: { title: string; description: string }) {
  const navigate = useNavigate();

  return (
    <section className="bg-primary-900 py-16 px-4 sm:px-6 lg:px-8 text-center rounded-2xl my-16 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/brand/prezenti-mark.png')] opacity-5 bg-center bg-no-repeat bg-contain" />
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-primary-100">
          {description}
        </p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="bg-white text-primary-900 hover:bg-neutral-50"
            onClick={() => {
              trackCTA('Request Quote', { cta_location: 'service_cta' });
              navigate('/talk-to-us');
            }}
          >
            <span className="font-semibold">Get a Quote</span> <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
