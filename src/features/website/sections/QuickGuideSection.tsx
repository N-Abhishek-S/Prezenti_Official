import { motion } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { appIntegration, quickGuideSteps } from '../websiteData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export function QuickGuideSection() {
  const navigate = useNavigate();

  return (
    <motion.section
      id="quick-guide"
      className="bg-white py-14 sm:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div variants={fadeUp} className="mb-12 grid gap-5 lg:grid-cols-[0.75fr_1fr] lg:items-end">
          <div>
            <Badge variant="primary" size="lg" className="mb-3">
              Quick Guide
            </Badge>
            <h2 className="text-2xl font-semibold sm:text-[30px]">From Onboarding to Operational Excellence</h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg lg:justify-self-end">
            Typical onboarding takes 2-4 weeks depending on the number of locations and services.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="relative grid gap-4 md:grid-cols-2">
            {quickGuideSteps.map((step, index) => (
              <div key={step.title} className="rounded-[18px] border border-neutral-200 bg-canvas p-5 sm:p-6">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mb-2 text-base font-semibold text-neutral-950">{step.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[24px] bg-primary-900 p-5 text-white shadow-[0_30px_90px_rgba(10,42,34,0.18)] sm:rounded-[28px] sm:p-8">
            <div className="absolute right-[-22%] top-[-18%] h-52 w-52 rounded-full border border-white/10" />
            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Smartphone size={22} />
              </div>
              <Badge variant="teal" className="mb-4 bg-white/10 text-white">
                Future app integration
              </Badge>
              <h3 className="mb-3 text-2xl font-semibold">{appIntegration.title}</h3>
              <p className="mb-8 text-sm leading-relaxed text-white/74">{appIntegration.description}</p>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full border-white bg-white text-primary-800 hover:bg-neutral-100 sm:w-auto"
                onClick={() => navigate('/app')}
              >
                Open App
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
