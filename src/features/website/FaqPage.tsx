import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const categories = ['All', 'Platform', 'Services', 'Compliance', 'Pricing', 'Technical', 'Security'];

const faqs = [
  { q: 'What makes Presenti different from other facility management companies?', a: 'Presenti combines managed facility services with an enterprise SaaS platform. Unlike traditional vendors, we provide real-time operational dashboards, SLA tracking, compliance management, and workforce monitoring — all integrated into one platform. Think of it as getting a premium service provider and a technology platform in one.', cat: 'Platform' },
  { q: 'How does the attendance tracking work?', a: 'Our workforce app uses GPS-verified check-in/check-out with geofencing. Every attendance record includes location coordinates, timestamp, and photo verification. Supervisors and clients can see real-time attendance status across all branches through the dashboard.', cat: 'Platform' },
  { q: 'What services do you provide?', a: 'We provide comprehensive facility management including housekeeping, security services, pantry management, electrical maintenance, plumbing, pest control, landscaping, HVAC maintenance, and AMC management. All services come with SLA guarantees and digital tracking.', cat: 'Services' },
  { q: 'How do you handle compliance?', a: 'Our Compliance Vault is a centralized digital repository for all regulatory documents — EPF, ESI, POSH, trade licenses, fire safety NOCs, and more. It includes auto-expiry alerts, version control, audit trails, and role-based access control. Every document is timestamped and traceable.', cat: 'Compliance' },
  { q: 'What is your pricing model?', a: 'We offer custom pricing based on your number of locations, workforce size, and service requirements. Our plans include Professional, Enterprise, and Enterprise Plus tiers. Contact our sales team for a detailed proposal tailored to your organization.', cat: 'Pricing' },
  { q: 'Can you integrate with our existing systems?', a: 'Yes. Presenti offers RESTful APIs, webhook integrations, and supports SSO via Azure AD, LDAP, and SAML. We can integrate with your HRMS, ERP, accounting software, and building management systems.', cat: 'Technical' },
  { q: 'What is the SLA for your services?', a: 'SLAs are customized per client and service type. Typical commitments include 2-hour response time for critical tickets, 24-hour resolution for standard issues, 99.5%+ workforce attendance, and 95%+ quality audit scores. All SLAs are tracked in real-time through the dashboard.', cat: 'Services' },
  { q: 'How is data security handled?', a: 'We are SOC 2 Type II compliant with end-to-end encryption (AES-256 at rest, TLS 1.3 in transit). Data is hosted on AWS with multi-region redundancy. We support role-based access control, audit logs, and comply with GDPR requirements.', cat: 'Security' },
  { q: 'What kind of reports can I generate?', a: 'The platform includes pre-built reports for attendance, SLA compliance, ticket analytics, workforce performance, branch benchmarking, financial summaries, and compliance status. All reports are exportable to PDF, Excel, and CSV formats.', cat: 'Platform' },
  { q: 'How long does onboarding take?', a: 'Typical onboarding takes 2-4 weeks depending on the number of locations and services. This includes discovery, workforce deployment, platform setup, training, and go-live support. We assign a dedicated Customer Success Manager for every client.', cat: 'Services' },
  { q: 'Do you support multi-location enterprises?', a: 'Absolutely. The platform is designed for multi-location operations with branch-level dashboards, performance benchmarking, centralized compliance management, and location-specific configurations. We currently manage 500+ sites across 15+ cities.', cat: 'Platform' },
  { q: 'What happens if there\'s a service issue?', a: 'Our structured escalation matrix ensures issues are addressed promptly. Critical tickets auto-escalate through predefined levels. Clients can track escalation status in real-time. Our support team is available 24/7 for Enterprise and Enterprise Plus clients.', cat: 'Services' },
];

export function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.cat === activeCategory;
    const matchesSearch = !searchQuery || faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-gradient-to-br from-canvas via-[#EDF5F0] to-teal-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp}><Badge variant="primary" size="lg" className="mb-4">FAQ</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-6">Frequently Asked Questions</motion.h1>
            <motion.div variants={fadeUp} className="relative max-w-xl mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-base border border-neutral-200 rounded-xl bg-white outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer border-none ${
                  activeCategory === cat ? 'bg-primary-800 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filtered.map((faq, idx) => (
              <div key={idx} className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors cursor-pointer border-none bg-transparent"
                >
                  <span className="font-medium text-sm pr-4">{faq.q}</span>
                  <ChevronDown size={16} className={`shrink-0 text-neutral-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === idx && (
                  <div className="px-5 pb-4 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-400 text-lg mb-4">No matching questions found.</p>
              <Link to="/contact"><Button variant="outline" size="sm">Ask Us Directly</Button></Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-3">Still have questions?</h2>
          <p className="text-neutral-500 mb-6">Our team is ready to help you with any queries about our platform or services.</p>
          <Link to="/contact"><Button variant="primary" size="lg">Contact Us</Button></Link>
        </div>
      </section>
    </div>
  );
}
