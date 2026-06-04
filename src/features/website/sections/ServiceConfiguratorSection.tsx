import { motion } from 'framer-motion';
import { ServiceConfigurator } from '../../../components/services/ServiceConfigurator';

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
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <motion.div variants={fadeUp}>
          <ServiceConfigurator />
        </motion.div>
      </div>
    </motion.section>
  );
}
