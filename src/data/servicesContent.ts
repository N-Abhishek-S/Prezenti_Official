export interface ContentSection {
  title: string;
  paragraphs: string[];
  listItems?: string[];
}

export interface ServiceData {
  id: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  sections: ContentSection[];
  faqs: { question: string; answer: string }[];
  relatedServices: { name: string; slug: string }[];
}

const generateLongContent = (serviceName: string) => [
  {
    title: `Comprehensive ${serviceName} Overview`,
    paragraphs: [
      `Welcome to our industry-leading ${serviceName} solutions, designed specifically for modern enterprises looking to streamline their operations, maintain impeccable standards, and foster a productive environment. In today's fast-paced corporate world, having reliable, well-trained, and dedicated support staff is not just a luxury but a fundamental necessity. Our ${serviceName} go above and beyond the standard offerings, providing a seamless integration of personnel into your daily workflow. We understand that every facility has unique requirements, which is why we take a highly customized approach to staffing and management. By partnering with us, you gain access to a carefully vetted pool of professionals who are trained to handle the specific challenges of your industry, whether you operate a bustling IT park, a sensitive healthcare facility, or a high-end corporate office.`,
      `The core of our ${serviceName} philosophy revolves around proactive management and continuous improvement. We do not just deploy staff; we actively monitor their performance, provide ongoing training, and ensure they are equipped with the latest tools and techniques to perform their duties efficiently. This commitment to excellence ensures that your facility remains in top condition, reflecting the professionalism and values of your brand. Furthermore, our robust supervisory framework guarantees that any issues are addressed promptly before they can impact your operations. This means less downtime, higher satisfaction among your employees and visitors, and a significant return on your investment in our services.`,
      `Compliance and safety are also at the forefront of our ${serviceName}. We adhere strictly to all local and national regulations concerning labor, health, and safety standards. Our staff undergo rigorous background checks, regular health screenings, and comprehensive training on safety protocols. This meticulous attention to detail minimizes risks and liabilities for your organization, allowing you to operate with complete peace of mind. By entrusting your ${serviceName} to us, you are not just outsourcing a task; you are gaining a strategic partner dedicated to maintaining the integrity and excellence of your physical assets.`
    ],
    listItems: [
      "Rigorous background verification and continuous training programs.",
      "Customized service plans tailored to your specific facility needs.",
      "Strict adherence to compliance, health, and safety regulations.",
      "Dedicated supervisory teams for proactive management and issue resolution.",
      "Use of modern tools and techniques for maximum efficiency."
    ]
  },
  {
    title: `Why Choose Our ${serviceName} for Your Business?`,
    paragraphs: [
      `Choosing the right provider for ${serviceName} is a critical decision that can significantly impact the day-to-day operations of your business. Our commitment to quality, transparency, and reliability sets us apart in a crowded marketplace. We recognize that the individuals we deploy are often the face of your organization to visitors and employees alike. Therefore, we invest heavily in soft skills training, ensuring our staff are courteous, professional, and capable of handling complex situations with grace and efficiency. This focus on interpersonal skills, combined with technical proficiency, ensures a superior service experience that aligns with your corporate culture.`,
      `Another key differentiator of our ${serviceName} is our integration of technology into workforce management. We utilize advanced tracking and reporting systems that provide you with real-time visibility into attendance, task completion, and performance metrics. This data-driven approach allows for complete transparency and accountability. You will always know who is on-site, what tasks have been completed, and how resources are being allocated. Furthermore, this data enables us to continuously optimize our deployment strategies, identifying areas for efficiency gains and cost savings without compromising on quality.`,
      `Scalability is another crucial aspect of our offerings. Whether you are a small start-up experiencing rapid growth or a large multinational corporation managing multiple locations, our ${serviceName} can scale seamlessly to meet your evolving needs. We maintain a robust pipeline of trained professionals, allowing us to quickly deploy additional staff or adjust service levels as required. This flexibility ensures that you are never over-resourced or under-staffed, providing a highly efficient and cost-effective solution to your facility management challenges.`
    ]
  },
  {
    title: `The Impact of Professional ${serviceName} on Your Bottom Line`,
    paragraphs: [
      `Investing in high-quality ${serviceName} is not merely an operational expense; it is a strategic investment that yields tangible returns. A well-managed facility directly contributes to employee productivity, satisfaction, and retention. When employees work in a clean, safe, and well-supported environment, their morale improves, absenteeism decreases, and overall output increases. Our services are designed to create these optimal working conditions, removing the daily friction of facility management from your team's shoulders so they can focus entirely on their core responsibilities and driving your business forward.`,
      `Moreover, professional ${serviceName} play a vital role in protecting and preserving your physical assets. Regular maintenance, proper handling of equipment, and immediate attention to wear and tear extend the lifespan of your infrastructure, saving you significant capital expenditure in the long run. Our trained staff know how to care for various surfaces, systems, and environments, preventing costly damage and ensuring that your facility retains its value and functionality over time. This preventative approach to facility management is a cornerstone of our service delivery model.`,
      `Finally, the brand perception generated by a pristine and well-managed facility cannot be overstated. First impressions matter immensely when clients, partners, or prospective employees visit your premises. Our ${serviceName} ensure that every interaction with your facility reflects the high standards of your organization. From the cleanliness of the reception area to the professionalism of the support staff, every detail is meticulously managed to project an image of competence, reliability, and success. This enhanced brand image can directly influence business outcomes, making our services an integral part of your overall corporate strategy.`
    ],
    listItems: [
      "Increased employee productivity through a well-maintained environment.",
      "Reduction in long-term maintenance costs via preventative care.",
      "Enhanced brand image and professional perception for visitors.",
      "Optimized resource allocation allowing your team to focus on core tasks.",
      "Measurable return on investment through improved operational efficiency."
    ]
  },
  {
    title: `Our Methodology and Approach to ${serviceName}`,
    paragraphs: [
      `Our approach to delivering exceptional ${serviceName} begins with a comprehensive audit of your current facility operations. We take the time to understand your unique challenges, operational bottlenecks, and specific goals. This deep dive allows us to develop a customized service level agreement (SLA) that outlines clear expectations, key performance indicators (KPIs), and detailed standard operating procedures (SOPs). By establishing this robust framework upfront, we ensure complete alignment between our service delivery and your strategic objectives, eliminating ambiguity and setting the stage for a successful partnership.`,
      `Once the SLA is established, our rigorous deployment phase begins. We don't just send warm bodies; we select candidates whose skills and temperaments match your organizational culture. These individuals then undergo site-specific training, familiarizing themselves with your facility's layout, emergency protocols, and specific operational nuances. During the initial transition period, our supervisory team is heavily involved on-site to ensure a smooth handover and to immediately address any teething issues. This meticulous onboarding process is critical to establishing a strong foundation for long-term success.`,
      `The final pillar of our methodology is continuous quality assurance. Our ${serviceName} are subject to regular, unannounced audits by our quality control team. We also conduct periodic review meetings with your stakeholders to discuss performance against KPIs, gather feedback, and identify areas for further optimization. This commitment to an iterative, feedback-driven process ensures that our services do not just meet expectations on day one, but continue to evolve and improve over the lifetime of our partnership. We believe that true excellence in facility management is a continuous journey, not a destination.`
    ]
  },
  {
    title: `Future-Proofing Your Operations with our ${serviceName}`,
    paragraphs: [
      `As the nature of work and the workplace continues to evolve, so too must the approach to facility management. Our ${serviceName} are designed to be forward-looking, anticipating future trends and adapting to changing requirements. For instance, the rise of hybrid work models necessitates a more flexible and dynamic approach to staffing and resource allocation. We utilize data analytics to understand usage patterns within your facility, allowing us to optimize staffing levels in real-time, reducing waste and maximizing efficiency. This agile approach ensures that your facility operations remain aligned with your evolving business models.`,
      `Sustainability is another critical focus area for our future-ready ${serviceName}. We are committed to minimizing the environmental impact of our operations. This includes the use of eco-friendly cleaning agents, the implementation of waste reduction and recycling programs, and the optimization of energy consumption where possible. By partnering with us, you are not only ensuring a high-functioning facility but also contributing to your organization's broader corporate social responsibility (CSR) goals. We believe that professional facility management and environmental stewardship must go hand in hand.`,
      `In conclusion, our ${serviceName} represent a comprehensive, technology-driven, and highly customized solution for modern enterprises. We bring a level of professionalism, transparency, and strategic alignment that transforms facility management from a reactive chore into a proactive business enabler. Whether you need a complete overhaul of your facility operations or targeted support in specific areas, our team has the expertise, the resources, and the dedication to deliver exceptional results. Contact us today to learn more about how we can partner with you to elevate your facility operations to new heights.`
    ]
  }
];

export const servicesData: Record<string, ServiceData> = {
  'housekeeping-services': {
    id: 'housekeeping',
    slug: 'housekeeping-services',
    seoTitle: 'Professional Housekeeping Services | Prezenti',
    seoDescription: 'Expert housekeeping services for corporate offices, IT parks, and enterprises. Get highly trained, verified housekeeping staff for a pristine environment.',
    h1: 'Enterprise Housekeeping Services',
    sections: generateLongContent('Housekeeping Services'),
    faqs: [
      { question: 'What is included in your housekeeping services?', answer: 'Our housekeeping services cover comprehensive daily cleaning, deep cleaning, restroom sanitation, floor care, waste management, and pantry maintenance tailored to corporate environments.' },
      { question: 'Are your housekeeping staff background-verified?', answer: 'Yes, 100% of our housekeeping personnel undergo strict police verification, background checks, and health screenings before deployment.' },
      { question: 'Do you provide cleaning materials and equipment?', answer: 'Yes, we provide an end-to-end solution including eco-friendly cleaning chemicals, modern mechanized equipment, and all necessary consumables.' },
      { question: 'Can you scale the housekeeping team based on our needs?', answer: 'Absolutely. We offer flexible staffing models allowing you to scale up or down based on your occupancy and operational requirements.' }
    ],
    relatedServices: [
      { name: 'Security Services', slug: 'security-services' },
      { name: 'Pantry Staff Services', slug: 'pantry-staff-services' },
      { name: 'Facility Management', slug: 'facility-management-services' }
    ]
  },
  'security-services': {
    id: 'security',
    slug: 'security-services',
    seoTitle: 'Top Corporate Security Services & Guards | Prezenti',
    seoDescription: 'Hire highly trained, professional security guards and security management personnel for your corporate office, IT park, or enterprise facility.',
    h1: 'Professional Corporate Security Services',
    sections: generateLongContent('Security Services'),
    faqs: [
      { question: 'What type of security personnel do you provide?', answer: 'We provide unarmed guards, armed guards, security supervisors, CCTV operators, and specialized corporate security officers.' },
      { question: 'Are your security guards trained for emergencies?', answer: 'Yes, our guards receive rigorous training in fire safety, emergency evacuation, first aid, and crowd control.' },
      { question: 'Do you offer 24/7 security coverage?', answer: 'Yes, we provide round-the-clock security services with highly managed shift rotations and dedicated night supervisors.' },
      { question: 'How do you monitor security guard performance?', answer: 'We use digital attendance, real-time patrol tracking systems, and surprise site audits by our area managers.' }
    ],
    relatedServices: [
      { name: 'Receptionist Staffing', slug: 'receptionist-staffing-services' },
      { name: 'Facility Management', slug: 'facility-management-services' },
      { name: 'Property Management', slug: 'property-management-services' }
    ]
  },
  'receptionist-staffing-services': {
    id: 'receptionist',
    slug: 'receptionist-staffing-services',
    seoTitle: 'Professional Receptionist Staffing Services | Prezenti',
    seoDescription: 'Enhance your front desk with professional, articulate, and highly trained receptionist staffing services from Prezenti. Perfect for corporate offices.',
    h1: 'Professional Receptionist Staffing Solutions',
    sections: generateLongContent('Receptionist Staffing Services'),
    faqs: [
      { question: 'What skills do your receptionists possess?', answer: 'Our receptionists are trained in visitor management, EPABX handling, corporate communication, mailroom management, and front-desk administration.' },
      { question: 'Can you provide bilingual receptionists?', answer: 'Yes, depending on your location and requirement, we can provide receptionists fluent in English and local languages.' },
      { question: 'What happens if a receptionist takes leave?', answer: 'We ensure zero downtime by providing immediate relievers or trained backups to cover any planned or unplanned absences.' },
      { question: 'Do you provide temporary receptionist staffing?', answer: 'Yes, we cater to both long-term contracts and temporary staffing needs for events or interim coverage.' }
    ],
    relatedServices: [
      { name: 'Office Boy Services', slug: 'office-boy-services' },
      { name: 'Security Services', slug: 'security-services' },
      { name: 'Facility Management', slug: 'facility-management-services' }
    ]
  },
  'office-boy-services': {
    id: 'office-boy',
    slug: 'office-boy-services',
    seoTitle: 'Reliable Office Boy Services & Support Staff | Prezenti',
    seoDescription: 'Hire verified and trained office boys, peons, and support staff to keep your corporate office running smoothly. Trusted by top enterprises.',
    h1: 'Reliable Office Boy & Support Staff Services',
    sections: generateLongContent('Office Boy Services'),
    faqs: [
      { question: 'What duties do office boys perform?', answer: 'Duties include file movement, serving tea/coffee, document photocopying, bank runs, managing stationary, and assisting with general office administration.' },
      { question: 'Are your office boys verified?', answer: 'Yes, strict background checks, including address and police verification, are mandatory for all support staff.' },
      { question: 'Do they wear uniforms?', answer: 'Yes, all our office boys are provided with professional, clean uniforms and ID cards to maintain corporate decorum.' },
      { question: 'Can we hire office boys for multiple shifts?', answer: 'Yes, we provide support staff across various shifts depending on your office operational hours.' }
    ],
    relatedServices: [
      { name: 'Pantry Staff Services', slug: 'pantry-staff-services' },
      { name: 'Receptionist Staffing', slug: 'receptionist-staffing-services' },
      { name: 'Housekeeping Services', slug: 'housekeeping-services' }
    ]
  },
  'pantry-staff-services': {
    id: 'pantry',
    slug: 'pantry-staff-services',
    seoTitle: 'Corporate Pantry Staff & Cafeteria Management | Prezenti',
    seoDescription: 'Professional pantry staff services for corporate offices. Trained in hygiene, F&B service, and cafeteria management.',
    h1: 'Corporate Pantry Staff Services',
    sections: generateLongContent('Pantry Staff Services'),
    faqs: [
      { question: 'Are pantry staff trained in food hygiene?', answer: 'Yes, our pantry staff undergo specific training in food safety, personal hygiene, and proper F&B service etiquette.' },
      { question: 'What tasks do pantry staff handle?', answer: 'They manage tea/coffee vending machines, serve beverages to employees and guests, maintain cafeteria cleanliness, and manage pantry inventory.' },
      { question: 'Do you manage executive dining rooms?', answer: 'Yes, we provide specialized, highly trained stewards for executive dining and boardroom service.' },
      { question: 'Do you provide the pantry consumables?', answer: 'We offer flexible models. We can provide just the manpower, or an end-to-end solution including tea, coffee, and pantry consumables.' }
    ],
    relatedServices: [
      { name: 'Office Boy Services', slug: 'office-boy-services' },
      { name: 'Housekeeping Services', slug: 'housekeeping-services' },
      { name: 'Facility Management', slug: 'facility-management-services' }
    ]
  },
  'facility-management-services': {
    id: 'facility-management',
    slug: 'facility-management-services',
    seoTitle: 'Integrated Facility Management Services | Prezenti',
    seoDescription: 'End-to-end integrated facility management services for corporate parks, hospitals, and enterprises. Maintenance, soft services, and operations.',
    h1: 'Integrated Facility Management Services',
    sections: generateLongContent('Facility Management Services'),
    faqs: [
      { question: 'What does Integrated Facility Management (IFM) include?', answer: 'IFM includes soft services (housekeeping, security), hard services (MEP maintenance, HVAC), and specialized services (pest control, landscaping) under a single contract.' },
      { question: 'How do you ensure service quality across multiple locations?', answer: 'We utilize a centralized tech-platform for ticketing, audits, and SLA tracking, overseen by a dedicated Key Account Manager.' },
      { question: 'Can you manage technical and MEP maintenance?', answer: 'Yes, we provide trained technicians, electricians, and plumbers for comprehensive preventative and reactive maintenance.' },
      { question: 'Is your facility management tech-enabled?', answer: 'Yes, we deploy proprietary software for visitor management, helpdesk ticketing, and asset management.' }
    ],
    relatedServices: [
      { name: 'Property Management', slug: 'property-management-services' },
      { name: 'Housekeeping Services', slug: 'housekeeping-services' },
      { name: 'Security Services', slug: 'security-services' }
    ]
  },
  'property-management-services': {
    id: 'property-management',
    slug: 'property-management-services',
    seoTitle: 'Commercial Property Management Services | Prezenti',
    seoDescription: 'Comprehensive property management services for commercial real estate, IT parks, and residential complexes. Maximize asset value.',
    h1: 'Commercial Property Management Services',
    sections: generateLongContent('Property Management Services'),
    faqs: [
      { question: 'How is property management different from facility management?', answer: 'Property management focuses on the commercial lifecycle of the real estate, including tenant relations, lease administration, and asset value enhancement, alongside physical upkeep.' },
      { question: 'Do you handle vendor management for the property?', answer: 'Yes, we manage all third-party vendors (elevators, fire safety, AMC contracts) to ensure seamless operations.' },
      { question: 'Can you help reduce operational costs for the property?', answer: 'Absolutely. Through energy audits, preventative maintenance, and optimized staffing, we significantly reduce OPEX.' },
      { question: 'Do you manage tenant complaints and helpdesk?', answer: 'Yes, we run a centralized 24/7 helpdesk to address and resolve all tenant queries and maintenance requests swiftly.' }
    ],
    relatedServices: [
      { name: 'Facility Management', slug: 'facility-management-services' },
      { name: 'Security Services', slug: 'security-services' },
      { name: 'Housekeeping Services', slug: 'housekeeping-services' }
    ]
  }
};
