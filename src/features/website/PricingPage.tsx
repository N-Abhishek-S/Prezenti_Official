import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { demoPricingPlans } from '../../data/demoPricingData';
import { apiGet, type PricingPlan } from '../../lib/api';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>(demoPricingPlans);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewData, setIsPreviewData] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    apiGet<PricingPlan[]>('/pricing/plans?limit=100&sortBy=displayOrder')
      .then((response) => {
        if (!isMounted) return;

        if (response.data.length > 0) {
          setPlans(response.data);
          setIsPreviewData(false);
        }
      })
      .catch(() => {
        if (!isMounted) return;

        setPlans(demoPricingPlans);
        setIsPreviewData(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const byId = new Map<string, NonNullable<PricingPlan['category']>>();
    plans.forEach((plan) => {
      if (plan.category) byId.set(plan.category.id, plan.category);
    });
    return Array.from(byId.values()).sort((a, b) => a.displayOrder - b.displayOrder);
  }, [plans]);

  const visiblePlans = activeCategoryId === 'all' ? plans : plans.filter((plan) => plan.categoryId === activeCategoryId);

  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-gradient-to-br from-canvas via-[#EDF5F0] to-teal-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp}>
              <Badge variant="primary" size="lg" className="mb-4">{isPreviewData ? 'Preview Pricing' : 'Dynamic Pricing'}</Badge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-6">
              Service Packages Built<br /><span className="text-primary-600">Around Your Site</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-neutral-600 leading-relaxed">
              Pricing is managed by our operations team and updated centrally, so every service card reflects the latest approved package.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <button
                onClick={() => setActiveCategoryId('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium border cursor-pointer ${activeCategoryId === 'all' ? 'bg-primary-800 text-white border-primary-800' : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'}`}
              >
                All services
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium border cursor-pointer ${activeCategoryId === category.id ? 'bg-primary-800 text-white border-primary-800' : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}

          {isLoading && !isPreviewData && <div className="text-center text-neutral-500 py-12">Loading current service pricing...</div>}

          {visiblePlans.length > 0 && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
              {visiblePlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden" hover>
                  <div className="p-7 bg-white">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <Badge variant="info" className="mb-3">{plan.category?.name ?? 'Service'}</Badge>
                        <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                        {plan.shiftTiming && <p className="text-sm text-neutral-500">{plan.shiftTiming}</p>}
                      </div>
                      {plan.trainingIncluded && <ShieldCheck size={22} className="text-primary-600 shrink-0" />}
                    </div>

                    <div className="mb-6">
                      <div className="text-3xl font-bold text-neutral-900">{formatter.format(plan.monthlyPrice)}</div>
                      <p className="text-xs text-neutral-400 mt-1">per month</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                      {plan.workingHours && (
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Clock size={15} className="text-primary-600" /> {plan.workingHours}
                        </div>
                      )}
                      {plan.availabilitySla && (
                        <div className="text-neutral-600">{plan.availabilitySla}</div>
                      )}
                      {plan.replacementGuarantee && (
                        <div className="col-span-2 text-neutral-600">{plan.replacementGuarantee}</div>
                      )}
                    </div>

                    <Link to="/contact">
                      <Button variant="primary" size="lg" className="w-full">
                        Request Proposal <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </div>

                  <div className="p-6 border-t border-neutral-200 bg-neutral-50/50">
                    <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">Included</h4>
                    <div className="space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature.id} className="flex items-center gap-3 text-sm text-neutral-600">
                          <CheckCircle size={14} className="text-primary-600 shrink-0" /> {feature.label}
                        </div>
                      ))}
                    </div>
                    {plan.customNotes && <p className="text-sm text-neutral-500 mt-5">{plan.customNotes}</p>}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Need a custom deployment?</h2>
          <p className="text-neutral-500 mb-6">Our solutions team will configure services, shifts, SLA, and replacement coverage for your exact facility needs.</p>
          <Link to="/contact"><Button variant="primary" size="xl">Talk to Sales</Button></Link>
        </div>
      </section>
    </div>
  );
}
