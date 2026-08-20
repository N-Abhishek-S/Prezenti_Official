import { useState } from 'react';
import { Phone, Mail, MessageCircle, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { SEO_CONSTANTS } from '../../seo/constants';
import { sendExpertInquiry } from '../../services/inquiryApi';

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await sendExpertInquiry({
        fullName: formData.name,
        companyName: formData.company || 'Not Provided',
        mobileNumber: formData.phone,
        email: formData.email,
        services: [formData.service || 'General Inquiry'],
        additionalRequirement: formData.message || 'No additional message',
        location: 'Not Provided',
        requiredStartDate: new Date().toISOString().split('T')[0],
        categories: ['General']
      });
      
      toast.success('Your message has been sent successfully. We will get back to you shortly.');
      setFormData({ name: '', company: '', phone: '', email: '', service: '', message: '' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-6">
              Get in Touch with Prezenti
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Ready to elevate your facility management or looking for reliable staffing solutions? Contact us today to discuss your requirements.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#7CB342]/10 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-[#7CB342]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Call Us Now</p>
                  <a href={`tel:${SEO_CONSTANTS.PHONE.replace(/\s+/g, '')}`} className="text-xl font-bold text-[#1F2937] hover:text-[#7CB342] transition-colors">
                    {SEO_CONSTANTS.PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#7CB342]/10 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-[#7CB342]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email Us</p>
                  <a href={`mailto:${SEO_CONSTANTS.CONTACT_EMAIL}`} className="text-xl font-bold text-[#1F2937] hover:text-[#7CB342] transition-colors">
                    {SEO_CONSTANTS.CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={SEO_CONSTANTS.WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] text-white font-medium px-6 py-3 rounded-xl hover:bg-[#1DA851] transition-colors w-fit shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-[#1F2937] mb-6">Request a Quote</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CB342] focus:border-[#7CB342] outline-none transition-shadow" placeholder="Your Name" required />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" id="company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CB342] focus:border-[#7CB342] outline-none transition-shadow" placeholder="Your Company" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CB342] focus:border-[#7CB342] outline-none transition-shadow" placeholder="Your Phone" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CB342] focus:border-[#7CB342] outline-none transition-shadow" placeholder="Your Email" required />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Required</label>
                <select id="service" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CB342] focus:border-[#7CB342] outline-none transition-shadow bg-white" required>
                  <option value="">Select a Service</option>
                  <option value="housekeeping">Housekeeping Staff</option>
                  <option value="office-assistant">Office Assistants</option>
                  <option value="receptionist">Receptionists</option>
                  <option value="supervisor">Facility Supervisors</option>
                  <option value="pantry">Pantry Staff</option>
                  <option value="facility-management">Complete Facility Management</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CB342] focus:border-[#7CB342] outline-none transition-shadow resize-none" placeholder="Tell us about your requirements..."></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-[#7CB342] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#689f36] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending Request...' : 'Request Staffing Solution'}
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
