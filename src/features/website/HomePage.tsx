import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { HeroSection } from '../../components/hero/HeroSection';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── SERVICE DATA ─── */
const services = [
  { icon: '🧹', title: 'Housekeeping', desc: 'Professional cleaning with quality audits and digital checklists.' },
  { icon: '🛡️', title: 'Security', desc: 'Trained security personnel with GPS tracking and incident reporting.' },
  { icon: '☕', title: 'Pantry', desc: 'Managed pantry services with inventory tracking and hygiene standards.' },
  { icon: '⚡', title: 'Electrical', desc: 'Preventive and corrective electrical maintenance with AMC support.' },
  { icon: '🔧', title: 'Plumbing', desc: 'Comprehensive plumbing services with rapid response SLAs.' },
  { icon: '🐛', title: 'Pest Control', desc: 'Scheduled and emergency pest management with compliance certificates.' },
  { icon: '📋', title: 'AMC Services', desc: 'Annual maintenance contracts with scheduled inspections and reporting.' },
  { icon: '📊', title: 'Compliance', desc: 'End-to-end statutory compliance management and document vault.' },
];

const industries = [
  { icon: '🏢', title: 'Corporate Offices', desc: 'Multi-floor facility management for enterprise HQs.', bg: 'bg-primary-50', color: 'text-primary-800' },
  { icon: '💻', title: 'IT Parks & GCCs', desc: '24/7 operations for technology campuses.', bg: 'bg-teal-50', color: 'text-teal-700' },
  { icon: '🏥', title: 'Hospitals', desc: 'Infection control and biomedical compliance.', bg: 'bg-info-50', color: 'text-info-600' },
  { icon: '🏭', title: 'Manufacturing', desc: 'Industrial hygiene and safety compliance.', bg: 'bg-warning-50', color: 'text-warning-600' },
  { icon: '🎓', title: 'Education', desc: 'Campus facility operations and safety.', bg: 'bg-success-50', color: 'text-success-600' },
  { icon: '🏬', title: 'Retail Chains', desc: 'Multi-location standardized operations.', bg: 'bg-critical-50', color: 'text-critical-600' },
];

const metrics = [
  { value: '200+', label: 'Enterprise Clients' },
  { value: '98.4%', label: 'Avg. SLA Compliance' },
  { value: '15,000+', label: 'Workforce Managed' },
  { value: '500+', label: 'Sites Operational' },
];

const steps = [
  { num: 1, title: 'Discovery & Assessment', desc: 'We audit your facility needs, compliance gaps, and service requirements.' },
  { num: 2, title: 'Custom Deployment', desc: 'Tailored workforce deployment with SLA frameworks and KPI definitions.' },
  { num: 3, title: 'Platform Activation', desc: 'Go live with dashboards, attendance tracking, and compliance monitoring.' },
  { num: 4, title: 'Continuous Optimization', desc: 'Ongoing reviews, analytics-driven improvements, and SLA refinements.' },
];

const testimonials = [
  { quote: 'Presenti transformed our facility operations across 45 sites. SLA compliance went from 82% to 98% in just three months.', name: 'Rajesh Kumar', role: 'VP Operations, TechCorp India', initials: 'RK', bg: 'bg-primary-100 text-primary-800' },
  { quote: 'The compliance vault alone saved us hundreds of hours during our annual audit. Everything is tracked, timestamped, and accessible.', name: 'Sunita Patel', role: 'Director Facilities, MedLife Hospitals', initials: 'SP', bg: 'bg-teal-100 text-teal-700' },
  { quote: 'Real-time attendance and GPS verification gave us visibility we never had before. Supervisor accountability improved dramatically.', name: 'Anil Mehta', role: 'CFO, BuildMax Properties', initials: 'AM', bg: 'bg-info-100 text-info-600' },
];
export function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      {/* ═══ TRUST STRIP ═══ */}
      <motion.section
        className="py-10 bg-white border-y border-neutral-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger}
      >
     
      </motion.section>

      {/* ═══ PROBLEM vs SOLUTION ═══ */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center max-w-180 mx-auto mb-12">
            <Badge variant="primary" size="lg" className="mb-3">Why Presenti</Badge>
            <h2 className="text-[30px] font-semibold mb-4">Traditional hiring → Prezenti hiringy</h2>
            <p className="text-lg text-neutral-500 leading-relaxed">
Reliable Support Staff. Ready On Demand            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-8">
         
            <div className="p-8 rounded-xl bg-success-50 border border-success-100">
              <h3 className="text-[22px] font-semibold mb-5 flex items-center gap-3">
                <span className="text-2xl">✅</span> With Prezenti
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  'From local referrals to instant staffing.',
'From manual hiring chaos to smart deployment.',
'Old-school recruitment. New-age staffing.',
'From watchman references to app-based workforce access.',
'From searching endlessly to staffing instantly.',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-700 leading-relaxed">
                    <span className="text-success-500 shrink-0 mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ SERVICES ═══ */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center max-w-180 mx-auto mb-12">
            <Badge variant="primary" size="lg" className="mb-3">Services</Badge>
            <h2 className="text-[30px] font-semibold mb-4">Enterprise-Grade Facility Services</h2>
            <p className="text-lg text-neutral-500 leading-relaxed">
              Comprehensive managed services backed by technology, SLA guarantees, and compliance frameworks.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(svc => (
              <Card key={svc.title} interactive className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-800 flex items-center justify-center mx-auto mb-4 text-2xl">
                  {svc.icon}
                </div>
                <h4 className="text-base font-semibold mb-2">{svc.title}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">{svc.desc}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ INDUSTRIES ═══ */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center max-w-180 mx-auto mb-12">
            <Badge variant="primary" size="lg" className="mb-3">Industries</Badge>
            <h2 className="text-[30px] font-semibold mb-4">Built for Enterprise Verticals</h2>
            <p className="text-lg text-neutral-500 leading-relaxed">
              Tailored solutions for the unique compliance and operational needs of each industry.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map(ind => (
              <Card key={ind.title} interactive className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-[22px] shrink-0 ${ind.bg} ${ind.color}`}>
                  {ind.icon}
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-1">{ind.title}</h4>
                  <p className="text-sm text-neutral-500">{ind.desc}</p>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ METRICS ═══ */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <Badge variant="primary" size="lg" className="mb-3">Impact</Badge>
            <h2 className="text-[30px] font-semibold">Proven Enterprise Results</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map(m => (
              <div key={m.label} className="text-center p-6">
                <div className="text-5xl font-bold text-primary-800 mb-2">{m.value}</div>
                <div className="text-sm text-neutral-500 font-medium">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ PROCESS ═══ */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <Badge variant="primary" size="lg" className="mb-3">How It Works</Badge>
            <h2 className="text-[30px] font-semibold">From Onboarding to Operational Excellence</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-15 right-15 h-0.5 bg-linear-to-r from-primary-200 to-teal-200" />
            {steps.map(step => (
              <div key={step.num} className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-primary-800 text-white flex items-center justify-center text-lg font-bold mx-auto mb-5 relative z-10">
                  {step.num}
                </div>
                <h4 className="text-base font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-neutral-500">{step.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ TESTIMONIALS ═══ */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <Badge variant="primary" size="lg" className="mb-3">Testimonials</Badge>
            <h2 className="text-[30px] font-semibold">What Enterprise Leaders Say</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <Card key={t.name} className="p-8">
                <p className="text-lg text-neutral-700 leading-relaxed italic mb-6 pl-6 border-l-[3px] border-primary-400">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${t.bg}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-neutral-500">{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ CTA ═══ */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            className="relative bg-linear-to-br from-primary-900 via-primary-700 to-primary-600 rounded-2xl px-12 py-16 text-center text-white overflow-hidden"
          >
            <div className="absolute -top-1/2 right-[-20%] w-125 h-125 rounded-full bg-white/3" />
            <div className="absolute bottom-[-30%] left-[-10%] w-100 h-100 rounded-full bg-teal-500/10" />
            <h2 className="text-4xl font-bold mb-4 relative z-10">
              Ready to Transform Your<br />Facility Operations?
            </h2>
            <p className="text-lg opacity-85 mb-8 max-w-150 mx-auto relative z-10">
              Join 200+ enterprises who trust Presenti to power their facility management with technology, compliance, and operational excellence.
            </p>
            <div className="flex gap-4 justify-center relative z-10">
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="xl"
                  className="bg-white text-primary-800 border-white hover:bg-neutral-100 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Schedule a Demo
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  View Plans
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
