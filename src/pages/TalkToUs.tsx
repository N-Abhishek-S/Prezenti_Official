import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, MessageSquareText, ShieldCheck } from 'lucide-react';
import { TalkToExpertForm } from '../components/inquiry/TalkToExpertForm';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const trustPoints = [
  { icon: MessageSquareText, label: 'Guided requirement capture' },
  { icon: CheckCircle2, label: 'Professional message generated' },
  { icon: Mail, label: 'Sent to team over email' },
  { icon: ShieldCheck, label: 'WhatsApp delivery from backend' },
];

export function TalkToUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-9 max-w-4xl">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">Talk to Expert</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Share your staffing requirement with the Prezenti team
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            Complete the guided form once. We generate the inquiry message and deliver it to the senior team through secure backend channels.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustPoints.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-card">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                <Icon size={18} />
              </span>
              <span className="text-sm font-semibold text-neutral-800">{label}</span>
            </div>
          ))}
        </motion.div>

        <TalkToExpertForm />
      </section>
    </main>
  );
}
