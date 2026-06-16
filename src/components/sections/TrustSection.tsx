import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Users, Sliders } from 'lucide-react';

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Trained & Verified Staff',
    description: 'Every staff member undergoes rigorous background checks and professional training.'
  },
  {
    icon: Zap,
    title: 'Quick Deployment',
    description: 'Rapid turnaround times to ensure your operations never face downtime.'
  },
  {
    icon: Users,
    title: 'Professional Workforce Management',
    description: 'Comprehensive management of attendance, compliance, and performance.'
  },
  {
    icon: Sliders,
    title: 'Flexible Staffing Solutions',
    description: 'Scalable manpower solutions tailored exactly to your changing requirements.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function TrustSection() {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
            Why Choose Prezenti
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver excellence through our vetted workforce, ensuring your facility operates at peak performance.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7CB342]/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#7CB342]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
