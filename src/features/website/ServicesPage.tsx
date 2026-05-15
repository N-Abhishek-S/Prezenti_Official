import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const services = [
  {
    icon: '🧹', title: 'Housekeeping & Facility Cleaning', desc: 'Professional cleaning services for corporate offices, IT parks, hospitals, and industrial facilities.',
    features: ['Daily, weekly, and deep cleaning schedules', 'Digital quality audit checklists', 'Trained and background-verified staff', 'Real-time supervisor monitoring', 'Specialized medical & cleanroom cleaning'],
  },
  {
    icon: '🛡️', title: 'Security Services', desc: 'Trained security personnel with technology-enabled monitoring and incident management.',
    features: ['GPS-tracked security patrols', 'Incident reporting & escalation', 'Access control management', 'CCTV monitoring coordination', 'Emergency response protocols'],
  },
  {
    icon: '☕', title: 'Pantry & Cafeteria', desc: 'Managed pantry and cafeteria services with hygiene compliance and inventory management.',
    features: ['Menu planning & nutrition tracking', 'FSSAI compliance management', 'Inventory & procurement automation', 'Hygiene audit schedules', 'Feedback & satisfaction tracking'],
  },
  {
    icon: '⚡', title: 'Electrical & HVAC', desc: 'Preventive and corrective electrical maintenance with certified technicians.',
    features: ['Scheduled preventive maintenance', 'Emergency breakdown response', 'Energy audit & optimization', 'HVAC system management', 'Compliance with electrical safety standards'],
  },
  {
    icon: '🔧', title: 'Plumbing & Civil', desc: 'Comprehensive plumbing and civil maintenance with rapid response SLAs.',
    features: ['Leak detection & repair', 'Water tank cleaning & testing', 'Civil structural maintenance', 'Waterproofing solutions', 'SLA-backed response times'],
  },
  {
    icon: '🐛', title: 'Pest Control', desc: 'Scheduled and emergency pest management with compliance documentation.',
    features: ['Integrated pest management (IPM)', 'HACCP-compliant processes', 'Fumigation & termite control', 'Compliance certificates', 'Recurring schedule management'],
  },
  {
    icon: '🌿', title: 'Landscaping & Horticulture', desc: 'Professional grounds maintenance and landscape management for corporate campuses.',
    features: ['Garden & lawn maintenance', 'Indoor plant management', 'Irrigation system maintenance', 'Seasonal planting programs', 'Waste composting solutions'],
  },
  {
    icon: '🏗️', title: 'Mechanical & AMC', desc: 'Annual maintenance contracts for DG sets, lifts, fire systems, and building infrastructure.',
    features: ['DG set maintenance', 'Lift & escalator servicing', 'Fire safety system AMC', 'UPS & power backup maintenance', 'Preventive maintenance scheduling'],
  },
];

export function ServicesPage() {
  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-gradient-to-br from-canvas via-[#EDF5F0] to-teal-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp}><Badge variant="primary" size="lg" className="mb-4">Services</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-6">
              Enterprise Facility<br /><span className="text-primary-600">Service Excellence</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-neutral-600 leading-relaxed mb-8">
              Technology-backed managed services with SLA guarantees, compliance frameworks, and real-time operational visibility.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <motion.section className="py-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="space-y-8">
            {services.map((svc, idx) => (
              <motion.div key={svc.title} variants={fadeUp}>
                <Card className={`p-8 ${idx % 2 === 0 ? '' : 'bg-neutral-50/50'}`}>
                  <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-start">
                    <div>
                      <div className="text-4xl mb-4">{svc.icon}</div>
                      <h3 className="text-xl font-semibold mb-3">{svc.title}</h3>
                      <p className="text-neutral-500 leading-relaxed mb-4">{svc.desc}</p>
                      <Link to="/contact">
                        <Button variant="outline" size="sm">Learn More <ArrowRight size={14} /></Button>
                      </Link>
                    </div>
                    <div className="bg-canvas rounded-lg p-6 border border-neutral-100">
                      <h4 className="text-sm font-semibold text-neutral-700 mb-4 uppercase tracking-wider">Key Capabilities</h4>
                      <div className="space-y-3">
                        {svc.features.map(f => (
                          <div key={f} className="flex items-start gap-3">
                            <CheckCircle size={16} className="text-primary-600 shrink-0 mt-0.5" />
                            <span className="text-sm text-neutral-600">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Need a customized service package?</h2>
          <p className="text-neutral-500 text-lg mb-8 max-w-lg mx-auto">Every enterprise is different. Let us design a tailored facility management solution for your organization.</p>
          <Link to="/contact"><Button variant="primary" size="xl">Get a Custom Proposal</Button></Link>
        </div>
      </section>
    </div>
  );
}
