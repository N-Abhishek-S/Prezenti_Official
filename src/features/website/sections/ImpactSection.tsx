import { motion } from 'framer-motion';
import { Badge } from '../../../components/ui/Badge';
import { impactMetrics } from '../websiteData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export function ImpactSection() {
  return (
    <motion.section
      className="bg-primary-900 py-14 text-white sm:py-16 lg:py-18"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="desktop-container">
        <motion.div variants={fadeUp} className="mb-10 text-center">
          <Badge variant="teal" size="lg" className="mb-3 bg-white/10 text-white">
            Impact
          </Badge>
          <h2 className="w-full wrap-break-word text-wrap-balance text-2xl font-semibold sm:text-[clamp(1.5rem,3vw+1rem,1.875rem)]">Our Service Focus</h2>
        </motion.div>
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-white/10 lg:grid-cols-4">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="bg-primary-900/80 p-4 text-center sm:p-6">
              <div className="mb-2 text-3xl font-bold tracking-tight text-white md:text-5xl">{metric.value}</div>
              <div className="text-sm font-medium text-white/62">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
