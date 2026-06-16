import { Briefcase, UserCheck, Shield, Users, Coffee, Building } from 'lucide-react';

const services = [
  {
    title: 'Housekeeping Staff',
    description: 'Professional and trained housekeeping staff to maintain pristine cleanliness and hygiene in your premises.',
    icon: Building
  },
  {
    title: 'Office Assistants',
    description: 'Reliable office boys and assistants for document handling, pantry duties, and daily administrative support.',
    icon: Briefcase
  },
  {
    title: 'Receptionists',
    description: 'Courteous and professional front desk executives to manage visitors, calls, and initial inquiries.',
    icon: UserCheck
  },
  {
    title: 'Facility Supervisors',
    description: 'Experienced supervisors to oversee facility operations, coordinate staff, and ensure quality standards.',
    icon: Users
  },
  {
    title: 'Security Personnel',
    description: 'Vigilant security guards trained in access control, surveillance, and emergency response.',
    icon: Shield
  },
  {
    title: 'Pantry Staff',
    description: 'Skilled pantry staff for beverage service, cafeteria management, and maintaining pantry hygiene.',
    icon: Coffee
  }
];

export function ServiceCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
            Our Staffing Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive facility management and manpower solutions for every business need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="flex flex-col bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 bg-[#7CB342]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#7CB342] transition-colors">
                  <Icon className="w-7 h-7 text-[#7CB342] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-[#1F2937] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {service.description}
                </p>
                <button className="text-[#2E7D32] font-medium flex items-center hover:text-[#7CB342] transition-colors w-fit">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
