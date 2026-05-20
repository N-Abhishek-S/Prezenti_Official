import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../lib/cn';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const faqGroups = [
  {
    title: 'General',
    items: [
      {
        question: 'What services does Prezenti provide?',
        answer: 'Prezenti provides managed staffing support for housekeeping, office assistance, facility supervision, and reception roles.',
      },
      {
        question: 'Which areas do you serve?',
        answer: 'Prezenti currently focuses on Pune service zones, including Baner, Hinjewadi, Wakad, Balewadi, Kharadi, Viman Nagar, and nearby commercial areas.',
      },
      {
        question: 'How fast can staff be deployed?',
        answer: 'Deployment timelines depend on role, location, shift preference, and verification needs. The team confirms availability after reviewing your inquiry.',
      },
    ],
  },
  {
    title: 'Staffing',
    items: [
      {
        question: 'Full-time vs half-time difference?',
        answer: 'Full-time support covers an 8-hour daily slot. Half-time support covers a 4-hour daily slot for lighter or focused operational needs.',
      },
      {
        question: 'Can I request replacement staff?',
        answer: 'Yes. Replacement support can be discussed with the operations team based on the package, role, and site requirements.',
      },
      {
        question: 'Are staff verified?',
        answer: 'Prezenti works with verified staffing processes and role-specific screening before deployment.',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        question: 'How do I contact support?',
        answer: 'Use the Talk to Expert form. Your inquiry is sent to the Prezenti team so they can call back with the right context.',
      },
      {
        question: 'Can I request callback?',
        answer: 'Yes. Choose Request Callback in the inquiry type dropdown while submitting the Talk to Expert form.',
      },
    ],
  },
  {
    title: 'Billing',
    items: [
      {
        question: 'How pricing works?',
        answer: 'Pricing is shared after understanding the selected role, slot, service area, start date, and site-specific expectations.',
      },
      {
        question: 'Any hidden charges?',
        answer: 'The team explains package inclusions, exclusions, and any applicable additional charges before confirmation.',
      },
    ],
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
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
            <p className="pb-5 text-sm leading-6 text-neutral-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactSection() {
  return (
    <motion.section
      id="contact"
      className="bg-white py-14 sm:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div variants={fadeUp} className="mx-auto mb-12 max-w-[760px] text-center">
          <Badge variant="primary" size="lg" className="mb-3">
            FAQs
          </Badge>
          <h2 className="mb-4 text-2xl font-semibold sm:text-[30px]">Quick Answers</h2>
          <p className="text-base leading-relaxed text-neutral-500 sm:text-lg">
            Quick answers for staffing scope, deployment timelines, support, and pricing.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-5 lg:grid-cols-2">
          {faqGroups.map((group) => (
            <section key={group.title} className="rounded-[28px] border border-neutral-200 bg-canvas p-5 sm:p-6">
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
