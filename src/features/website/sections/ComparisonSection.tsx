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
      className="bg-canvas py-8 sm:py-10 lg:py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="desktop-container">
        <motion.div variants={fadeUp} className="mx-auto mb-8 max-w-[720px] text-center">
          <Badge variant="primary" size="lg" className="mb-3">
            Why Prezenti
          </Badge>
          <h2 className="mb-4 w-full break-words text-wrap-balance text-2xl font-semibold sm:text-[clamp(1.5rem,3vw+1rem,1.875rem)]">Support staff, on demand — powered by Prezenti.</h2>
          <p className="text-base leading-relaxed text-neutral-500 sm:text-lg">Reliable Support Staff. Ready On Demand</p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid items-stretch gap-6 lg:gap-8 lg:grid-cols-[0.4fr_0.6fr]">
          <div className="flex flex-col justify-center rounded-[20px] border border-success-100 bg-success-50 p-6 shadow-[0_24px_70px_rgba(10,42,34,0.07)] sm:p-7 lg:p-8 lg:py-10">
            <h3 className="mb-5 flex items-center gap-3 w-full break-words text-wrap-balance text-[clamp(1.125rem,2vw+0.5rem,1.375rem)] font-semibold">
              <CheckCircle size={26} className="shrink-0 text-success-500" />
              With Prezenti
            </h3>
            <ul className="flex flex-col gap-3.5">
              {comparisonItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700 md:text-[15px]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-success-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden rounded-[20px] border border-neutral-200 bg-white shadow-[0_34px_90px_rgba(10,42,34,0.12)] sm:rounded-[24px] lg:rounded-[28px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(106,189,126,0.16),transparent_32%),linear-gradient(135deg,rgba(10,42,34,0.04),rgba(255,255,255,0)_44%)]" />
            <video
              className="relative z-10 w-full h-auto max-h-full object-contain object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Prezenti workforce app visual"
            >
              <source src={comparisonMedia.src} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_38%,rgba(10,42,34,0.16)_100%)]" />
            <div className="pointer-events-none absolute inset-4 z-20 rounded-[22px] border border-white/50" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
