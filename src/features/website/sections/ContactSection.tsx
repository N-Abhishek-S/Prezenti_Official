import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../lib/cn';
import faqsData, { type FaqGroup } from '../../../data/faqsData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full min-h-[44px] items-center justify-between gap-5 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/20 rounded-md"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-neutral-950">{question}</span>
        <ChevronDown size={18} className={cn('shrink-0 text-neutral-500 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm leading-6 text-neutral-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactSection() {
  const groups: FaqGroup[] = faqsData;

  return (
    <motion.section
      id="contact"
      className="bg-white py-8 sm:py-10 lg:py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="desktop-container">
        <motion.div variants={fadeUp} className="mx-auto mb-8 max-w-[760px] text-center">
          <Badge variant="primary" size="lg" className="mb-3">
            FAQs
          </Badge>
          <h2 className="mb-4 w-full break-words text-wrap-balance text-2xl font-semibold sm:text-[clamp(1.5rem,3vw+1rem,1.875rem)]">Quick Answers</h2>
          <p className="text-base leading-relaxed text-neutral-500 sm:text-lg">
            Quick answers for staffing scope, deployment timelines, support, and pricing.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-5 lg:grid-cols-2">
          {groups.map((group) => (
            <section key={group.title} className="rounded-[28px] border border-neutral-200 bg-canvas p-4 sm:p-5">
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-800 text-white">
                  <HelpCircle size={18} />
                </span>
                <h3 className="text-xl font-semibold text-neutral-950">{group.title}</h3>
              </div>
              <div className="mt-2">
                {group.items.map((item) => (
                  <FaqItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            </section>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
