import { CheckCircle, ShieldCheck, FileCheck, Award } from 'lucide-react';
import { Container } from '../../../components/ui/Container';

export function ComplianceSection() {
  const compliances = [
    {
      title: '100% PF & ESIC Compliant',
      description: 'Full adherence to EPF and ESIC regulations, ensuring secure and legal employment for all our staff.',
      icon: <CheckCircle className="w-6 h-6 text-brand-accent" />
    },
    {
      title: 'Background Verification',
      description: 'Rigorous 5-step police and address verification process before any deployment.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />
    },
    {
      title: 'Labour Law Adherence',
      description: 'Strict compliance with minimum wage, gratuity, and all local Maharashtra state labour laws.',
      icon: <FileCheck className="w-6 h-6 text-brand-accent" />
    },
    {
      title: 'ISO & SOP Driven',
      description: 'Operations managed through documented Standard Operating Procedures and SLAs.',
      icon: <Award className="w-6 h-6 text-brand-accent" />
    }
  ];

  return (
    <section className="py-16 bg-brand-dark text-white border-y border-brand-accent/20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Compliance & Security</h2>
          <p className="text-brand-light/80 max-w-2xl mx-auto">
            We assume 100% of the compliance liability. From payroll to background checks, your facility is protected by rigorous legal and operational frameworks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {compliances.map((item, idx) => (
            <div key={idx} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-brand-accent/50 transition-colors">
              <div className="mb-4 bg-brand-light/10 w-12 h-12 rounded-lg flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-brand-light/70 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
