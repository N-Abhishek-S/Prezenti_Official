import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { contactDetails } from '../websiteData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const initialFormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  locations: '',
  message: '',
};

export function ContactSection() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('');

  const update = (key: keyof typeof initialFormData, value: string) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Thank you! Our team will reach out within 24 hours.');
    setFormData(initialFormData);
  };

  return (
    <motion.section
      id="contact"
      className="bg-white py-14 sm:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div variants={fadeUp} className="mx-auto mb-12 max-w-[760px] text-center">
          <Badge variant="primary" size="lg" className="mb-3">
            Contact
          </Badge>
          <h2 className="mb-4 text-2xl font-semibold sm:text-[30px]">Let's Talk</h2>
          <p className="text-base leading-relaxed text-neutral-500 sm:text-lg">
            Whether you need a demo, a custom proposal, or have questions - our enterprise solutions team is ready to help.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <form onSubmit={handleSubmit} className="rounded-[24px] border border-neutral-200 bg-canvas p-5 shadow-[0_30px_90px_rgba(10,42,34,0.07)] sm:rounded-[28px] sm:p-8">
            <h3 className="mb-6 text-xl font-semibold">Request a Demo</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Full Name *
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) => update('name', event.target.value)}
                  placeholder="John Doe"
                  className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
                />
              </label>
              <label className="block text-sm font-medium">
                Work Email *
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => update('email', event.target.value)}
                  placeholder="you@company.com"
                  className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
                />
              </label>
              <label className="block text-sm font-medium">
                Company *
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(event) => update('company', event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
                />
              </label>
              <label className="block text-sm font-medium">
                Phone
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
                />
              </label>
            </div>
            <label className="mt-5 block text-sm font-medium">
              Locations
              <select
                value={formData.locations}
                onChange={(event) => update('locations', event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
              >
                <option value="">Select</option>
                <option>1-5</option>
                <option>6-20</option>
                <option>21-50</option>
                <option>50-100</option>
                <option>100+</option>
              </select>
            </label>
            <label className="mt-5 block text-sm font-medium">
              Message
              <textarea
                rows={4}
                value={formData.message}
                onChange={(event) => update('message', event.target.value)}
                placeholder="Tell us about your needs..."
                className="mt-1.5 w-full resize-y rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
              />
            </label>
            <Button type="submit" variant="primary" size="lg" className="mt-6 w-full">
              Submit Request
            </Button>
            {status && <p className="mt-4 text-sm font-medium text-primary-800">{status}</p>}
          </form>

          <div className="space-y-5">
            <div className="rounded-[20px] border border-neutral-200 bg-white p-6 shadow-card">
              <h3 className="mb-4 font-semibold">Corporate Office</h3>
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary-600" />
                  <span>{contactDetails.office.split('\n').map((line) => <span key={line} className="block">{line}</span>)}</span>
                </div>
                <div className="flex gap-3">
                  <Phone size={16} className="shrink-0 text-primary-600" />
                  <span>{contactDetails.phone}</span>
                </div>
                <div className="flex gap-3">
                  <Mail size={16} className="shrink-0 text-primary-600" />
                  <span>{contactDetails.email}</span>
                </div>
                <div className="flex gap-3">
                  <Clock size={16} className="shrink-0 text-primary-600" />
                  <span>{contactDetails.hours}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-primary-100 bg-primary-50 p-6">
              <h3 className="mb-2 font-semibold">Enterprise Support</h3>
              <p className="mb-2 text-sm text-neutral-600">24/7 support for Enterprise clients.</p>
              <p className="text-sm font-semibold text-primary-800">{contactDetails.support}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
