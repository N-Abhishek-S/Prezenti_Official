import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Ticket, Users, BarChart3, Shield, FileText,
  Bell, Calendar, TrendingUp, Globe, Smartphone, Zap,
  CheckCircle, ArrowRight
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const modules = [
  { icon: LayoutDashboard, title: 'Operations Dashboard', desc: 'Real-time KPIs, ticket trends, attendance heatmaps, and SLA compliance across all locations in a single view.', color: 'bg-primary-50 text-primary-800' },
  { icon: Ticket, title: 'Ticket Management', desc: 'Create, assign, track, and resolve facility service requests with priority levels and SLA timers.', color: 'bg-warning-50 text-warning-600' },
  { icon: Users, title: 'Workforce Management', desc: 'GPS-verified attendance, shift planning, skill-based allocation, and supervisor performance tracking.', color: 'bg-teal-50 text-teal-700' },
  { icon: BarChart3, title: 'SLA Governance', desc: 'Define, monitor, and enforce SLAs with automated breach alerts, penalty tracking, and monthly reports.', color: 'bg-info-50 text-info-600' },
  { icon: Shield, title: 'Compliance Vault', desc: 'Centralized document repository with auto-expiry alerts, audit trails, and regulatory compliance tracking.', color: 'bg-success-50 text-success-600' },
  { icon: FileText, title: 'Invoice & Billing', desc: 'Automated invoice generation, approval workflows, payment tracking, and financial reconciliation.', color: 'bg-critical-50 text-critical-600' },
  { icon: Bell, title: 'Escalation Engine', desc: 'Multi-level escalation matrix with automated notifications, SLA-based triggers, and resolution tracking.', color: 'bg-warning-50 text-warning-600' },
  { icon: Calendar, title: 'AMC Scheduling', desc: 'Annual maintenance contract management with scheduled inspections, renewal reminders, and service history.', color: 'bg-primary-50 text-primary-800' },
  { icon: TrendingUp, title: 'Analytics & Reports', desc: 'Customizable reports, exportable dashboards, trend analysis, and executive-ready presentation data.', color: 'bg-teal-50 text-teal-700' },
  { icon: Globe, title: 'Branch Management', desc: 'Multi-location management with site-level configurations, service mapping, and performance benchmarking.', color: 'bg-info-50 text-info-600' },
  { icon: Smartphone, title: 'Mobile Workforce App', desc: 'Field staff companion app with GPS check-in, task checklists, incident reporting, and proof uploads.', color: 'bg-success-50 text-success-600' },
  { icon: Zap, title: 'Approvals Workflow', desc: 'Multi-stage approval workflows for invoices, leave requests, incident reports, and service changes.', color: 'bg-critical-50 text-critical-600' },
];

const capabilities = [
  'Role-based access control (RBAC)',
  'Multi-tenant architecture',
  'RESTful API integrations',
  'Real-time notifications',
  'Audit trail on all actions',
  'Data encryption at rest & transit',
  'Custom report builder',
  'White-label capability',
  'SSO / LDAP / Azure AD',
  'Export to PDF, Excel, CSV',
  'Webhooks & event triggers',
  '99.9% uptime SLA',
];

export function PlatformPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-canvas via-[#EDF5F0] to-teal-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp}>
              <Badge variant="primary" size="lg" className="mb-4">Platform</Badge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-6">
              The Enterprise Facility<br /><span className="text-primary-600">Operating System</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-neutral-600 leading-relaxed mb-8">
              A unified platform that brings together workforce management, compliance tracking, SLA governance, and operational intelligence into one powerful dashboard.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-4 justify-center">
              <Link to="/contact"><Button variant="primary" size="xl">Request a Demo</Button></Link>
              <Link to="/pricing"><Button variant="outline" size="xl">View Plans</Button></Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modules Grid */}
      <motion.section className="py-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="primary" size="lg" className="mb-3">Modules</Badge>
            <h2 className="text-3xl font-semibold mb-4">Everything You Need. One Platform.</h2>
            <p className="text-neutral-500 text-lg">12 integrated modules designed for enterprise facility operations.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map(m => (
              <Card key={m.title} interactive className="p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${m.color}`}>
                  <m.icon size={22} />
                </div>
                <h3 className="text-base font-semibold mb-2">{m.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{m.desc}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="teal" size="lg" className="mb-3">Live Preview</Badge>
            <h2 className="text-3xl font-semibold mb-4">Built for How You Work</h2>
            <p className="text-neutral-500 text-lg">Desktop-first, with responsive design for supervisors on the go.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden bg-canvas p-6">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-critical-500" />
              <div className="w-3 h-3 rounded-full bg-warning-500" />
              <div className="w-3 h-3 rounded-full bg-success-500" />
            </div>
            <div className="grid grid-cols-[220px_1fr] gap-4 min-h-[400px]">
              <div className="bg-primary-800 rounded-lg p-4 text-white/80 text-xs space-y-2">
                {['Dashboard', 'Tickets', 'Attendance', 'SLA', 'Compliance', 'Invoices', 'Reports'].map(item => (
                  <div key={item} className={`px-3 py-2 rounded-md ${item === 'Dashboard' ? 'bg-white/15 text-white' : 'hover:bg-white/5'}`}>{item}</div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Active Sites', val: '247', change: '+12%' },
                    { label: 'Open Tickets', val: '38', change: '-8%' },
                    { label: 'Attendance', val: '94.2%', change: '+2.1%' },
                    { label: 'SLA Score', val: '98.4%', change: '+1.8%' },
                  ].map(k => (
                    <div key={k.label} className="bg-white rounded-lg border border-neutral-200 p-3">
                      <div className="text-[10px] text-neutral-400">{k.label}</div>
                      <div className="text-xl font-bold">{k.val}</div>
                      <div className="text-[10px] text-success-600">{k.change}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg border border-neutral-200 p-4 h-48 flex items-end gap-1">
                  {[45, 62, 38, 75, 55, 80, 68, 90, 72, 85, 95, 78].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: 'linear-gradient(to top, #6ABD7E, #2E864C)' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="primary" size="lg" className="mb-3">Capabilities</Badge>
            <h2 className="text-3xl font-semibold mb-4">Enterprise-Grade Infrastructure</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {capabilities.map(cap => (
              <div key={cap} className="flex items-center gap-3 p-4 rounded-lg bg-white border border-neutral-200 hover:border-primary-200 hover:shadow-sm transition-all">
                <CheckCircle size={18} className="text-primary-600 shrink-0" />
                <span className="text-sm font-medium text-neutral-700">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to see it in action?</h2>
          <p className="text-neutral-500 text-lg mb-8 max-w-lg mx-auto">Schedule a personalized demo and see how Presenti transforms your facility operations.</p>
          <Link to="/contact"><Button variant="primary" size="xl">Schedule Demo <ArrowRight size={16} /></Button></Link>
        </div>
      </section>
    </div>
  );
}
