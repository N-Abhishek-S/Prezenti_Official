import { motion } from 'framer-motion';
import { ServiceConfigurator } from '../../../components/services/ServiceConfigurator';
import { Badge } from '../../../components/ui/Badge';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export function ServiceConfiguratorSection() {
  return (
    <motion.section
      id="services"
      className="bg-canvas py-14 sm:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div variants={fadeUp} className="mb-10 grid gap-5 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <Badge variant="teal" size="lg" className="mb-3">
              Services
            </Badge>
            <h2 className="text-2xl font-semibold sm:text-[30px]">Configure Your Staffing Requirement</h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg lg:justify-self-end">
            Select the role, property context, and work timing. The final quote is prepared after site assessment so your package fits the actual facility.
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <ServiceConfigurator />
        </motion.div>
      </div>
    </motion.section>
  );
}
