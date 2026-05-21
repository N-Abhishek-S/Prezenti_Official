export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const faqsData: FaqGroup[] = [
  {
    title: 'General',
    items: [
      {
        question: 'What services does Prezenti provide?',
        answer: 'Prezenti provides managed staffing support for housekeeping, office assistance, facility supervision, and reception roles.',
      },
      {
        question: 'Which areas do you serve?',
        answer: 'Prezenti currently focuses on Pune service zones, including Baner, Hinjewadi, Wakad, Balewadi, Kharadi, Viman Nagar, and nearby commercial areas.',
      },
      {
        question: 'How fast can staff be deployed?',
        answer: 'Deployment timelines depend on role, location, shift preference, and verification needs. The team confirms availability after reviewing your inquiry.',
      },
    ],
  },
  {
    title: 'Staffing',
    items: [
      {
        question: 'Full-time vs half-time difference?',
        answer: 'Full-time support covers an 8-hour daily slot. Half-time support covers a 4-hour daily slot for lighter or focused operational needs.',
      },
      {
        question: 'Can I request replacement staff?',
        answer: 'Yes. Replacement support can be discussed with the operations team based on the package, role, and site requirements.',
      },
      {
        question: 'Are staff verified?',
        answer: 'Prezenti works with verified staffing processes and role-specific screening before deployment.',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        question: 'How do I contact support?',
        answer: 'Use the Talk to Expert form. Your inquiry is sent to the Prezenti team so they can call back with the right context.',
      },
      {
        question: 'Can I request callback?',
        answer: 'Yes. Choose Request Callback in the inquiry type dropdown while submitting the Talk to Expert form.',
      },
    ],
  },
  {
    title: 'Billing',
    items: [
      {
        question: 'How pricing works?',
        answer: 'Pricing is shared after understanding the selected role, slot, service area, start date, and site-specific expectations.',
      },
      {
        question: 'Any hidden charges?',
        answer: 'The team explains package inclusions, exclusions, and any applicable additional charges before confirmation.',
      },
    ],
  },
];

export default faqsData;
