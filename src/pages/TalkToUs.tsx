import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TalkToExpertForm } from '../components/inquiry/TalkToExpertForm';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function TalkToUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto mb-9 max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">Talk to Expert</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Share your staffing requirement with the Prezenti team
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            Complete the inquiry form and our operations team will review your service requirement.
          </p>
        </motion.div>

        <TalkToExpertForm />
      </section>
    </main>
  );
}
