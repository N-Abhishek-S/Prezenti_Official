import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { comparisonItems, comparisonMedia } from '../websiteData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export function ComparisonSection() {
  return (
    <motion.section
      className="bg-canvas py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div variants={fadeUp} className="mx-auto mb-12 max-w-[720px] text-center">
          <Badge variant="primary" size="lg" className="mb-3">
            Why Presenti
          </Badge>
          <h2 className="mb-4 text-[30px] font-semibold">Traditional hiring → Prezenti hiringy</h2>
          <p className="text-lg leading-relaxed text-neutral-500">Reliable Support Staff. Ready On Demand</p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid items-center gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-[20px] border border-success-100 bg-success-50 p-8 shadow-[0_24px_70px_rgba(10,42,34,0.07)]">
            <h3 className="mb-5 flex items-center gap-3 text-[22px] font-semibold">
              <CheckCircle size={26} className="text-success-500" />
              With Prezenti
            </h3>
            <ul className="flex flex-col gap-3">
              {comparisonItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_34px_90px_rgba(10,42,34,0.12)] md:min-h-[440px] lg:min-h-[500px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(106,189,126,0.16),transparent_32%),linear-gradient(135deg,rgba(10,42,34,0.04),rgba(255,255,255,0)_44%)]" />
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={comparisonMedia.poster}
              aria-label="Prezenti workforce app visual"
            >
              <source src={comparisonMedia.src} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_38%,rgba(10,42,34,0.16)_100%)]" />
            <div className="pointer-events-none absolute inset-4 rounded-[22px] border border-white/50" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
