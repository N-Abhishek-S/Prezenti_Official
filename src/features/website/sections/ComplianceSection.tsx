import { CheckCircle, ShieldCheck, FileCheck, Award } from 'lucide-react';
import { Container } from '../../../components/ui/Container';

export function ComplianceSection() {
  const compliances = [
    {
      title: 'PF & ESIC Considerations',
      description: 'PF and ESIC requirements can be considered when defining the workforce structure and responsibilities for an engagement.',
      icon: <CheckCircle className="w-6 h-6 text-brand-accent" />
    },
    {
      title: 'Personnel Requirements',
      description: 'Personnel screening and verification requirements can be defined according to the needs and responsibilities of each engagement.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />
    },
    {
      title: 'Labour Law Considerations',
      description: 'Applicable wage and labour-law requirements can be considered when structuring workforce responsibilities for an engagement.',
      icon: <FileCheck className="w-6 h-6 text-brand-accent" />
    },
    {
      title: 'Service Process Planning',
      description: 'Site-specific service procedures and operating expectations can be defined as part of the engagement.',
      icon: <Award className="w-6 h-6 text-brand-accent" />
    }
  ];

  return (
    <section className="py-16 bg-brand-dark text-white border-y border-brand-accent/20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Compliance & Operational Framework</h2>
          <p className="text-brand-light/80 max-w-2xl mx-auto">
            From workforce administration to personnel requirements, engagements can be structured around clear operational frameworks tailored to each site.
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
