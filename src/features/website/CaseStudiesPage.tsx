import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const caseStudies = [
  {
    client: 'TechCorp India', industry: 'IT & Corporate', sites: 45, workforce: 1200,
    challenge: 'Managing 45 sites across 8 cities with 12 different vendors, resulting in inconsistent SLAs and zero operational visibility.',
    solution: 'Consolidated all vendors into a single Presenti-managed operation with unified dashboard and real-time SLA tracking.',
    results: [
      { metric: 'SLA Compliance', before: '82%', after: '98.4%', change: '+16.4%' },
      { metric: 'Ticket Resolution', before: '48 hrs', after: '8 hrs', change: '-83%' },
      { metric: 'Cost Reduction', before: '—', after: '22%', change: '22% savings' },
      { metric: 'Compliance Score', before: '60%', after: '100%', change: '+40%' },
    ],
    quote: 'Presenti gave us operational visibility we never had. Our facility costs dropped 22% while service quality improved dramatically.',
    quotePerson: 'Rajesh Kumar, VP Operations',
  },
  {
    client: 'MedLife Hospitals', industry: 'Healthcare', sites: 12, workforce: 800,
    challenge: 'NABH compliance requirements, biomedical waste tracking gaps, and infection control audit failures across hospital chain.',
    solution: 'Deployed healthcare-specific checklists, BMW tracking, and compliance vault with auto-expiry alerts for all certifications.',
    results: [
      { metric: 'NABH Compliance', before: '72%', after: '98%', change: '+26%' },
      { metric: 'Audit Pass Rate', before: '65%', after: '100%', change: '+35%' },
      { metric: 'BMW Incidents', before: '14/mo', after: '1/mo', change: '-93%' },
      { metric: 'Document Retrieval', before: '2 days', after: '30 sec', change: '-99%' },
    ],
    quote: 'The compliance vault alone saved us hundreds of hours during our annual NABH audit.',
    quotePerson: 'Dr. Sunita Patel, Director Facilities',
  },
  {
    client: 'BuildMax Properties', industry: 'Real Estate', sites: 25, workforce: 600,
    challenge: 'No visibility into security guard attendance, ghost worker problem, and escalation requests lost in email chains.',
    solution: 'GPS-verified attendance, real-time workforce dashboard, and structured escalation matrix with SLA timelines.',
    results: [
      { metric: 'Ghost Workers', before: '8%', after: '0%', change: '-100%' },
      { metric: 'Attendance Accuracy', before: '78%', after: '99.2%', change: '+21%' },
      { metric: 'Escalation Resolution', before: '5 days', after: '4 hrs', change: '-97%' },
      { metric: 'Annual Savings', before: '—', after: '₹45L', change: '₹45 Lakhs saved' },
    ],
    quote: 'GPS verification and real-time attendance eliminated our ghost worker problem overnight.',
    quotePerson: 'Anil Mehta, CFO',
  },
];

export function CaseStudiesPage() {
  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-gradient-to-br from-canvas via-[#EDF5F0] to-teal-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp}><Badge variant="primary" size="lg" className="mb-4">Case Studies</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-6">
              Real Results.<br /><span className="text-primary-600">Real Enterprises.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-neutral-600 leading-relaxed">
              See how India's leading enterprises transformed their facility operations with Presenti.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <motion.section className="py-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          {caseStudies.map((cs) => (
            <motion.div key={cs.client} variants={fadeUp}>
              <Card className="overflow-hidden">
                <div className="p-8 bg-primary-50/50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <Badge variant="primary" className="mb-2">{cs.industry}</Badge>
                    <h3 className="text-2xl font-semibold">{cs.client}</h3>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-right"><div className="text-xl font-bold text-primary-800">{cs.sites}</div><div className="text-xs text-neutral-500">Sites</div></div>
                    <div className="text-right"><div className="text-xl font-bold text-primary-800">{cs.workforce.toLocaleString()}</div><div className="text-xs text-neutral-500">Workforce</div></div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-sm font-semibold text-critical-600 uppercase tracking-wider mb-3">Challenge</h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-success-600 uppercase tracking-wider mb-3">Solution</h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {cs.results.map(r => (
                      <div key={r.metric} className="bg-canvas rounded-lg p-4 border border-neutral-100 text-center">
                        <div className="text-xs text-neutral-500 mb-2">{r.metric}</div>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="text-sm text-neutral-400 line-through">{r.before}</span>
                          <ArrowRight size={12} className="text-neutral-300" />
                          <span className="text-lg font-bold text-primary-800">{r.after}</span>
                        </div>
                        <Badge variant="success" size="sm">{r.change}</Badge>
                      </div>
                    ))}
                  </div>
                  <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                    <p className="text-base italic text-neutral-700 mb-2">"{cs.quote}"</p>
                    <p className="text-sm font-semibold text-primary-800">— {cs.quotePerson}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="py-20 bg-white text-center">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4">Ready to be our next success story?</h2>
          <p className="text-neutral-500 text-lg mb-8 max-w-lg mx-auto">See how Presenti can transform your facility operations.</p>
          <Link to="/contact"><Button variant="primary" size="xl">Get Started</Button></Link>
        </div>
      </section>
    </div>
  );
}
