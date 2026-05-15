import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Award } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const leadership = [
  { name: 'Arjun Mehta', role: 'Founder & CEO', initials: 'AM', bg: 'bg-primary-100 text-primary-800', bio: '15+ years in enterprise operations and facility management.' },
  { name: 'Priya Sharma', role: 'CTO', initials: 'PS', bg: 'bg-teal-100 text-teal-700', bio: 'Ex-Infosys, building enterprise SaaS platforms for 12 years.' },
  { name: 'Vikram Singh', role: 'COO', initials: 'VS', bg: 'bg-info-100 text-info-600', bio: 'Operations excellence leader with 18 years of experience.' },
  { name: 'Sunita Reddy', role: 'VP - Client Success', initials: 'SR', bg: 'bg-success-100 text-success-600', bio: 'Driving 98%+ client retention across enterprise accounts.' },
  { name: 'Rajesh Patel', role: 'VP - Compliance', initials: 'RP', bg: 'bg-warning-100 text-warning-600', bio: 'Regulatory compliance expert with deep domain expertise.' },
  { name: 'Kavita Nair', role: 'Head of Design', initials: 'KN', bg: 'bg-critical-100 text-critical-600', bio: 'Creating intuitive enterprise UX for complex workflows.' },
];

const values = [
  { icon: Target, title: 'Operational Excellence', desc: 'We relentlessly pursue the highest standards in every service delivery, every day.' },
  { icon: Eye, title: 'Transparency', desc: 'Real-time visibility into operations. No hidden processes, no information gaps.' },
  { icon: Heart, title: 'People First', desc: 'Our workforce is our strength. We invest in training, safety, and well-being.' },
  { icon: Award, title: 'Compliance Integrity', desc: 'Every regulation met. Every document tracked. Every audit passed.' },
];

const stats = [
  { value: '200+', label: 'Enterprise Clients' },
  { value: '15,000+', label: 'Workforce Managed' },
  { value: '500+', label: 'Sites Operational' },
  { value: '15+', label: 'Cities Across India' },
  { value: '98.4%', label: 'Avg. SLA Compliance' },
  { value: '4.8/5', label: 'Client Satisfaction' },
];

export function AboutPage() {
  return (
    <div className="pt-18">
      <section className="py-20 bg-linear-to-br from-canvas via-[#EDF5F0] to-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp}><Badge variant="primary" size="lg" className="mb-4">About Us</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-6">
              Redefining Enterprise<br /><span className="text-primary-600">Facility Management</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-neutral-600 leading-relaxed">
              Presenti is India's leading enterprise facility management platform, combining managed services with intelligent technology to deliver operational excellence at scale.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <Card className="p-8 border-l-4 border-l-primary-600">
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-neutral-600 leading-relaxed">To empower enterprises with technology-driven facility management that ensures compliance, operational transparency, and service excellence across every location.</p>
          </Card>
          <Card className="p-8 border-l-4 border-l-teal-500">
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-neutral-600 leading-relaxed">To become the operating system for enterprise facilities in India — where every building, every service, and every worker is connected through one intelligent platform.</p>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map(s => (
              <div key={s.label} className="text-center p-4">
                <div className="text-3xl font-bold text-primary-800 mb-1">{s.value}</div>
                <div className="text-xs text-neutral-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="primary" size="lg" className="mb-3">Our Values</Badge>
            <h2 className="text-3xl font-semibold">What Drives Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(v => (
              <Card key={v.title} className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-800 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} />
                </div>
                <h4 className="text-base font-semibold mb-2">{v.title}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="primary" size="lg" className="mb-3">Leadership</Badge>
            <h2 className="text-3xl font-semibold">Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {leadership.map(person => (
              <Card key={person.name} className="p-6 flex items-start gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-semibold text-lg shrink-0 ${person.bg}`}>
                  {person.initials}
                </div>
                <div>
                  <h4 className="font-semibold">{person.name}</h4>
                  <p className="text-sm text-primary-600 font-medium mb-2">{person.role}</p>
                  <p className="text-sm text-neutral-500">{person.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4">Join the Presenti Team</h2>
          <p className="text-neutral-500 text-lg mb-8 max-w-lg mx-auto">We're building the future of facility management. Come build it with us.</p>
          <Link to="/contact"><Button variant="primary" size="xl">View Open Positions</Button></Link>
        </div>
      </section>
    </div>
  );
}
