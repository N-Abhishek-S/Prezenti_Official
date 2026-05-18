import { useEffect } from 'react';
import { ArrowRight, Bot, Clock3, Headphones, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AssistantChatWindow } from '../components/chat/AssistantChatWindow';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const supportPoints = [
  { icon: Clock3, label: '24/7 availability' },
  { icon: MessageCircle, label: 'Instant responses' },
  { icon: Headphones, label: 'Staffing consultation' },
  { icon: ShieldCheck, label: 'Facility management support' },
];

function focusChatInput() {
  document.getElementById('staffing-chat')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.setTimeout(() => {
    document.getElementById('live-support-message')?.focus();
  }, 450);
}

export function TalkToUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="overflow-hidden bg-canvas">
      <section className="relative isolate overflow-hidden pt-24 pb-12 sm:pt-28 lg:min-h-[calc(100svh-72px)] lg:pb-16">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#FBFDFB_0%,#F2F8F4_46%,#EAF7F5_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(32,178,170,0.18)_0%,rgba(255,255,255,0)_34%),radial-gradient(circle_at_78%_18%,rgba(163,217,177,0.35)_0%,rgba(255,255,255,0)_36%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-white/78" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10 xl:gap-14">
          <motion.div
            initial={false}
            animate="visible"
            variants={stagger}
            className="w-full min-w-0 max-w-88 sm:max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="primary" size="lg" className="mb-5 border border-primary-100 bg-white/80 shadow-card">
                AI Staffing Assistant
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-full text-[2.35rem] font-semibold leading-[1.05] tracking-normal text-neutral-950 sm:text-6xl sm:leading-[1.02] lg:text-[4.5rem]"
            >
              <span className="block">AI Staffing</span>
              <span className="block">Assistant</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-88 text-xl font-medium leading-8 text-primary-800 sm:max-w-xl sm:text-2xl sm:leading-9">
              Instantly discuss your staffing requirements with our AI assistant.
            </motion.p>

            <motion.p variants={fadeUp} className="mt-5 max-w-88 text-base leading-7 text-neutral-600 sm:max-w-2xl sm:text-lg sm:leading-8">
              Available 24/7 for instant responses, staffing consultation, and facility management support across offices, schools, hospitals, standalone buildings, small CHS, and businesses.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex w-full max-w-88 flex-col items-start gap-3 sm:max-w-none sm:flex-row sm:items-center">
              <Button type="button" size="lg" onClick={focusChatInput} className="min-h-13 rounded-full px-7">
                Start Conversation
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-3 text-sm font-semibold text-neutral-700 shadow-card">
                <Bot size={17} className="text-primary-700" aria-hidden="true" />
                Powered by PS staffing workflows
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-9 grid w-full max-w-88 gap-3 sm:max-w-none sm:grid-cols-2">
              {supportPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div key={point.label} className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/72 px-4 py-3 shadow-card backdrop-blur">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-neutral-800">{point.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.68, ease: 'easeOut', delay: 0.12 }}
            className="relative w-full min-w-0 max-w-88 sm:max-w-none"
          >
            <div className="absolute -inset-4 -z-10 rounded-[36px] bg-[linear-gradient(135deg,rgba(26,92,56,0.16),rgba(32,178,170,0.12))] blur-2xl" />
            <AssistantChatWindow />
          </motion.div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white py-8 sm:py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3">
          {[
            'Housekeeping, reception, office boy, pantry, security, supervisor, and facility manager support.',
            'Useful for offices, schools, hospitals, societies, standalone buildings, and growing businesses.',
            'Share headcount, location, shift timing, and site type to get a faster staffing conversation.',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm leading-6 text-neutral-600">
              <Sparkles size={17} className="mt-1 shrink-0 text-teal-600" aria-hidden="true" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
