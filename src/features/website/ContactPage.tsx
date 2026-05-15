import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', locations: '', message: '', inquiry: 'demo' });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); alert('Thank you! Our team will reach out within 24 hours.'); };
  const update = (key: string, val: string) => setFormData(p => ({...p, [key]: val}));

  return (
    <div className="pt-[72px]">
      <section className="py-20 bg-gradient-to-br from-canvas via-[#EDF5F0] to-teal-50">
        <div className="max-w-[1280px] mx-auto px-6 text-center max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}><Badge variant="primary" size="lg" className="mb-4">Contact</Badge></motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight mb-6">Let's <span className="text-primary-600">Talk</span></motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-neutral-600">Whether you need a demo, a custom proposal, or have questions — our enterprise solutions team is ready to help.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-[1fr_380px] gap-12">
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6">Request a Demo</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div><label className="block text-sm font-medium mb-1.5">Full Name *</label><input type="text" required value={formData.name} onChange={e => update('name', e.target.value)} placeholder="John Doe" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15" /></div>
                <div><label className="block text-sm font-medium mb-1.5">Work Email *</label><input type="email" required value={formData.email} onChange={e => update('email', e.target.value)} placeholder="you@company.com" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div><label className="block text-sm font-medium mb-1.5">Company *</label><input type="text" required value={formData.company} onChange={e => update('company', e.target.value)} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15" /></div>
                <div><label className="block text-sm font-medium mb-1.5">Phone</label><input type="tel" value={formData.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1.5">Locations</label><select value={formData.locations} onChange={e => update('locations', e.target.value)} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none bg-white focus:border-primary-600"><option value="">Select</option><option>1-5</option><option>6-20</option><option>21-50</option><option>50-100</option><option>100+</option></select></div>
              <div><label className="block text-sm font-medium mb-1.5">Message</label><textarea rows={4} value={formData.message} onChange={e => update('message', e.target.value)} placeholder="Tell us about your needs..." className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15 resize-vertical" /></div>
              <Button type="submit" variant="primary" size="lg" className="w-full">Submit Request</Button>
            </form>
          </Card>
          <div className="space-y-5">
            <Card className="p-6"><h3 className="font-semibold mb-4">Corporate Office</h3><div className="space-y-3 text-sm text-neutral-600"><div className="flex gap-3"><MapPin size={16} className="text-primary-600 shrink-0 mt-0.5" /><span>91 Springboard, Sector 44<br/>Gurugram, Haryana 122003</span></div><div className="flex gap-3"><Phone size={16} className="text-primary-600 shrink-0" /><span>+91 124 456 7890</span></div><div className="flex gap-3"><Mail size={16} className="text-primary-600 shrink-0" /><span>enterprise@presenti.in</span></div><div className="flex gap-3"><Clock size={16} className="text-primary-600 shrink-0" /><span>Mon-Fri: 9 AM - 6 PM IST</span></div></div></Card>
            <Card className="p-6"><h3 className="font-semibold mb-3">Regional Offices</h3><div className="space-y-2 text-sm text-neutral-600"><div><span className="font-medium text-neutral-800">Mumbai</span> — BKC</div><div><span className="font-medium text-neutral-800">Bangalore</span> — Koramangala</div><div><span className="font-medium text-neutral-800">Hyderabad</span> — HITEC City</div><div><span className="font-medium text-neutral-800">Chennai</span> — OMR</div><div><span className="font-medium text-neutral-800">Pune</span> — Hinjewadi</div></div></Card>
            <Card className="p-6 bg-primary-50 border-primary-100"><h3 className="font-semibold mb-2">Enterprise Support</h3><p className="text-sm text-neutral-600 mb-2">24/7 support for Enterprise clients.</p><p className="text-sm font-semibold text-primary-800">1800-123-PRESENTI</p></Card>
          </div>
        </div>
      </section>
    </div>
  );
}
