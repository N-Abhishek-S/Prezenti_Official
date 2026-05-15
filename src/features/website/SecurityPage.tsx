import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Shield, Lock, Server, Eye, Key, Database } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const pillars = [
  { icon: Lock, title: 'Encryption', desc: 'AES-256 encryption at rest, TLS 1.3 in transit. All data encrypted end-to-end.', color: 'bg-primary-50 text-primary-800' },
  { icon: Server, title: 'Infrastructure', desc: 'Hosted on AWS with multi-AZ redundancy, auto-scaling, and 99.99% uptime.', color: 'bg-teal-50 text-teal-700' },
  { icon: Eye, title: 'Access Control', desc: 'Role-based access, MFA enforcement, session management, and IP whitelisting.', color: 'bg-info-50 text-info-600' },
  { icon: Key, title: 'Authentication', desc: 'SSO via Azure AD, LDAP, SAML 2.0, and OAuth 2.0. JWT-based API authentication.', color: 'bg-warning-50 text-warning-600' },
  { icon: Database, title: 'Data Protection', desc: 'Automated backups, point-in-time recovery, data retention policies, and GDPR compliance.', color: 'bg-success-50 text-success-600' },
  { icon: Shield, title: 'Audit & Monitoring', desc: 'Complete audit trails, real-time threat monitoring, vulnerability scanning, and penetration testing.', color: 'bg-critical-50 text-critical-600' },
];

const certifications = [
  { name: 'SOC 2 Type II', status: 'Certified', desc: 'Annual audit by independent assessors' },
  { name: 'ISO 27001', status: 'In Progress', desc: 'Information security management' },
  { name: 'GDPR', status: 'Compliant', desc: 'EU data protection regulation' },
  { name: 'ISO 9001:2015', status: 'Certified', desc: 'Quality management system' },
];

export function SecurityPage() {
  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-gradient-to-br from-canvas via-[#EDF5F0] to-teal-50">
        <div className="max-w-[1280px] mx-auto px-6 text-center max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}><Badge variant="primary" size="lg" className="mb-4">Security</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-6">Enterprise-Grade<br/><span className="text-primary-600">Security</span></motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-neutral-600">Your data is protected by industry-leading security practices, encryption, and compliance frameworks.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14"><h2 className="text-3xl font-semibold">Security Pillars</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map(p => (
              <Card key={p.title} className="p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${p.color}`}><p.icon size={22} /></div>
                <h4 className="text-base font-semibold mb-2">{p.title}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-14"><Badge variant="primary" size="lg" className="mb-3">Certifications</Badge><h2 className="text-3xl font-semibold">Compliance & Certifications</h2></div>
          <div className="space-y-4">
            {certifications.map(c => (
              <Card key={c.name} className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Shield size={20} className="text-primary-600" />
                  <div><h4 className="font-semibold">{c.name}</h4><p className="text-sm text-neutral-500">{c.desc}</p></div>
                </div>
                <Badge variant={c.status === 'Certified' || c.status === 'Compliant' ? 'success' : 'warning'}>{c.status}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4">Security questions?</h2>
          <p className="text-neutral-500 text-lg mb-8">Our security team is available to address your concerns and provide documentation.</p>
          <Link to="/contact"><Button variant="primary" size="xl">Contact Security Team</Button></Link>
        </div>
      </section>
    </div>
  );
}
