import { Building2, Landmark, Stethoscope, GraduationCap, Home, Factory } from 'lucide-react';

const industries = [
  { name: 'Corporate Offices', icon: Building2 },
  { name: 'Commercial Buildings', icon: Landmark },
  { name: 'Hospitals', icon: Stethoscope },
  { name: 'Educational Institutions', icon: GraduationCap },
  { name: 'Residential Societies', icon: Home },
  { name: 'Industrial Facilities', icon: Factory },
];

export function IndustriesWeServe() {
  return (
    <section className="py-20 bg-[#1F2937] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Industries We Serve
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Providing specialized facility management and staffing solutions tailored to the unique requirements of diverse sectors.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Icon className="w-12 h-12 text-[#7CB342] mb-4" />
                <h3 className="text-lg font-medium text-center">{industry.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
