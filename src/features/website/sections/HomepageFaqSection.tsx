import { motion } from 'framer-motion';
import { FaqAccordion } from '../../../components/ui/FaqAccordion';
import { homepageFaqs } from '../websiteData';

export function HomepageFaqSection() {
  return (
    <motion.section
      className="bg-white py-14 sm:py-16 lg:py-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Everything you need to know about our corporate facility management services.
          </p>
        </div>
        <FaqAccordion faqs={homepageFaqs} />
      </div>
    </motion.section>
  );
}
