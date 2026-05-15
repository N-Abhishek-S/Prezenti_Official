import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { FileCheck, CheckCircle } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const frameworks = [
  { icon: '📋', title: 'POSH Compliance', desc: 'Full POSH compliance with ICC setup, training records, and complaint management workflows.', badge: 'Active' },
  { icon: '⚖️', title: 'Labour Law Compliance', desc: 'EPF, ESI, minimum wages, bonus, gratuity, and statutory register management.', badge: 'Active' },
  { icon: '🔒', title: 'Data Security (SOC 2)', desc: 'SOC 2 Type II compliant data handling, encryption at rest and in transit.', badge: 'Certified' },
  { icon: '✅', title: 'ISO 9001:2015', desc: 'Certified quality management system with documented processes and continuous improvement.', badge: 'Certified' },
  { icon: '🛡️', title: 'GDPR Readiness', desc: 'Data processing agreements, consent management, and right-to-erasure workflows.', badge: 'Ready' },
  { icon: '📊', title: 'NABH Standards', desc: 'Healthcare facility management aligned with NABH infection control and biomedical protocols.', badge: 'Aligned' },
];

const vaultFeatures = [
  'Centralized document repository for all compliance documents',
  'Auto-expiry alerts with 30, 15, and 7-day advance notifications',
  'Document version control with complete audit trail',
  'Category-wise organization (Labour, Safety, Environmental, etc.)',
  'Bulk upload and download capabilities',
  'Role-based access control for sensitive documents',
  'Timestamped audit logs for every access and modification',
  'Search and filter across thousands of documents',
];

export function CompliancePage() {
  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-gradient-to-br from-canvas via-[#EDF5F0] to-teal-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp}><Badge variant="primary" size="lg" className="mb-4">Compliance</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-6">
              Compliance-First<br /><span className="text-primary-600">Operations</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-neutral-600 leading-relaxed">
              Every process is audit-ready. Every document is tracked. Every regulation is met. Zero compliance gaps.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <motion.section className="py-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <Badge variant="primary" size="lg" className="mb-3">Frameworks</Badge>
            <h2 className="text-3xl font-semibold">Regulatory Compliance Coverage</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {frameworks.map(fw => (
              <Card key={fw.title} className="p-6 text-center">
                <div className="text-4xl mb-4">{fw.icon}</div>
                <Badge variant="success" className="mb-3">{fw.badge}</Badge>
                <h4 className="text-base font-semibold mb-2">{fw.title}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">{fw.desc}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="teal" size="lg" className="mb-4">Compliance Vault</Badge>
              <h2 className="text-3xl font-semibold mb-4">Your Digital Compliance Repository</h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                A centralized, searchable, audit-ready document vault that tracks every compliance document across all your sites with automated expiry alerts.
              </p>
              <div className="space-y-3">
                {vaultFeatures.map(f => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-primary-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-6">
              <div className="bg-canvas rounded-lg p-4 border border-neutral-100 space-y-3">
                {[
                  { name: 'EPF Registration.pdf', status: '✅ Valid', exp: 'Dec 2026' },
                  { name: 'ESI Certificate.pdf', status: '⚠️ Expiring', exp: 'Jun 2026' },
                  { name: 'Trade License.pdf', status: '✅ Valid', exp: 'Mar 2027' },
                  { name: 'Fire Safety NOC.pdf', status: '❌ Expired', exp: 'Apr 2026' },
                  { name: 'POSH Policy.pdf', status: '✅ Valid', exp: 'Jan 2027' },
                ].map(doc => (
                  <div key={doc.name} className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
                    <div className="flex items-center gap-3">
                      <FileCheck size={16} className="text-neutral-400" />
                      <span className="text-sm font-medium">{doc.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs">{doc.status}</div>
                      <div className="text-[10px] text-neutral-400">Exp: {doc.exp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4">Stay audit-ready, always.</h2>
          <p className="text-neutral-500 text-lg mb-8 max-w-lg mx-auto">See how Presenti's compliance management eliminates regulatory risks.</p>
          <Link to="/contact"><Button variant="primary" size="xl">Schedule Compliance Demo</Button></Link>
        </div>
      </section>
    </div>
  );
}
