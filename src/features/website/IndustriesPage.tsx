import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const industries = [
  {
    icon: '🏢', title: 'Corporate Offices', tagline: 'Multi-floor, multi-city operations',
    bg: 'bg-primary-50', color: 'text-primary-800',
    challenges: ['Managing multiple vendors across floors', 'Inconsistent cleaning standards', 'No real-time attendance visibility'],
    solutions: ['Single-vendor accountability with SLA governance', 'Digital quality audit checklists', 'GPS-verified workforce tracking'],
    metrics: { sites: '120+', sla: '99.1%', savings: '18%' },
  },
  {
    icon: '💻', title: 'IT Parks & GCCs', tagline: '24/7 technology campus operations',
    bg: 'bg-teal-50', color: 'text-teal-700',
    challenges: ['24/7 shift management complexity', 'Strict compliance requirements from global HQ', 'High standards for visitor experience'],
    solutions: ['Automated shift planning and roster management', 'Centralized compliance vault with global reporting', 'Premium housekeeping with quality score tracking'],
    metrics: { sites: '45+', sla: '98.7%', savings: '22%' },
  },
  {
    icon: '🏥', title: 'Hospitals & Healthcare', tagline: 'Infection control and biomedical compliance',
    bg: 'bg-info-50', color: 'text-info-600',
    challenges: ['Strict NABH/JCI compliance needs', 'Biomedical waste management', 'Infection control protocols'],
    solutions: ['Healthcare-specific cleaning checklists', 'BMW tracking and documentation', 'Infection control audit automation'],
    metrics: { sites: '30+', sla: '99.5%', savings: '15%' },
  },
  {
    icon: '🏭', title: 'Manufacturing & Warehouses', tagline: 'Industrial hygiene and safety',
    bg: 'bg-warning-50', color: 'text-warning-600',
    challenges: ['Large floor areas with safety zones', 'Hazardous material handling', 'Regulatory compliance burden'],
    solutions: ['Zone-based cleaning with safety protocols', 'Specialized PPE-trained workforce', 'Automated compliance document management'],
    metrics: { sites: '55+', sla: '97.8%', savings: '20%' },
  },
  {
    icon: '🎓', title: 'Educational Institutions', tagline: 'Campus safety and hygiene',
    bg: 'bg-success-50', color: 'text-success-600',
    challenges: ['Large campus footprint', 'Student safety requirements', 'Seasonal deep cleaning needs'],
    solutions: ['Campus-wide facility management platform', 'Background-verified security personnel', 'Seasonal and event-based service scheduling'],
    metrics: { sites: '25+', sla: '98.2%', savings: '16%' },
  },
  {
    icon: '🏬', title: 'Retail & Commercial', tagline: 'Multi-location standardized ops',
    bg: 'bg-critical-50', color: 'text-critical-600',
    challenges: ['Standardizing quality across 100+ outlets', 'High footfall hygiene management', 'Pest control for food retail'],
    solutions: ['Centralized operations dashboard', 'Branch-level SLA tracking', 'Integrated pest management with certification'],
    metrics: { sites: '200+', sla: '97.5%', savings: '25%' },
  },
];

export function IndustriesPage() {
  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-gradient-to-br from-canvas via-[#EDF5F0] to-teal-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp}><Badge variant="primary" size="lg" className="mb-4">Industries</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-6">
              Tailored for Every<br /><span className="text-primary-600">Enterprise Vertical</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-neutral-600 leading-relaxed">
              Industry-specific solutions addressing unique compliance, operational, and workforce challenges.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <motion.section className="py-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <div className="max-w-[1280px] mx-auto px-6 space-y-10">
          {industries.map(ind => (
            <motion.div key={ind.title} variants={fadeUp}>
              <Card className="overflow-hidden">
                <div className={`px-8 py-5 ${ind.bg} border-b border-neutral-100 flex items-center gap-4`}>
                  <span className="text-3xl">{ind.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{ind.title}</h3>
                    <p className="text-sm text-neutral-500">{ind.tagline}</p>
                  </div>
                </div>
                <div className="p-8 grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-sm font-semibold text-critical-600 uppercase tracking-wider mb-4">Challenges</h4>
                    <div className="space-y-3">
                      {ind.challenges.map(c => (
                        <div key={c} className="flex items-start gap-2 text-sm text-neutral-600">
                          <span className="text-critical-400 shrink-0">✕</span> {c}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-success-600 uppercase tracking-wider mb-4">Presenti Solution</h4>
                    <div className="space-y-3">
                      {ind.solutions.map(s => (
                        <div key={s} className="flex items-start gap-2 text-sm text-neutral-600">
                          <CheckCircle size={14} className="text-success-500 shrink-0 mt-0.5" /> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-canvas rounded-lg p-5 border border-neutral-100">
                    <h4 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-4">Results</h4>
                    <div className="space-y-4">
                      <div><div className="text-2xl font-bold text-primary-800">{ind.metrics.sites}</div><div className="text-xs text-neutral-400">Sites managed</div></div>
                      <div><div className="text-2xl font-bold text-primary-600">{ind.metrics.sla}</div><div className="text-xs text-neutral-400">Avg. SLA score</div></div>
                      <div><div className="text-2xl font-bold text-teal-600">{ind.metrics.savings}</div><div className="text-xs text-neutral-400">Cost reduction</div></div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="py-20 bg-white text-center">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4">Don't see your industry?</h2>
          <p className="text-neutral-500 text-lg mb-8 max-w-lg mx-auto">We build custom solutions for any enterprise vertical. Let's discuss your specific needs.</p>
          <Link to="/contact"><Button variant="primary" size="xl">Talk to an Expert <ArrowRight size={16} /></Button></Link>
        </div>
      </section>
    </div>
  );
}
