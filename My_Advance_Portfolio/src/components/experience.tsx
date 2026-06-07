interface ExperienceType {
  org: string;
  role: string;
  period: string;
  bullets: string[];
}

const EXPERIENCE: ExperienceType[] = [
  {
    org: "Smaac Net Solutions",
    role: "Junior Software Developer Intern",
    period: "February 2026 - Present",
    bullets: [
      "Migrated legacy ERP modules into a modern web application, improving UI responsiveness, maintainability, and workflow efficiency across business operations.",
      "Built reusable frontend components and optimized API integration patterns, reducing redundant network calls and improving dashboard performance and user experience.",
      "Worked on role-based ERP workflows, dynamic data rendering, and backend API integrations to streamline client facing operational modules."
    ],
  },
  {
    org: "Consort Digital",
    role: "Software Engineer Trainee",
    period: "October 2025 - January 2026",
    bullets: [
      "Developed registration and CMS modules using React.js, Node.js, Express.js, and MySQL, improving validation workflows and reducing registration-related issues.",
      "Optimized database queries and integrated caching strategies, improving server response consistency and reducing API response latency by 35%.",
    ],
  },
  {
    org: "Sunstone",
    role: "Tech Intern",
    period: "August 2025 - September 2025",
    bullets: [
      "Contributed to LMS workflow optimization and AI-assisted evaluation features, including OCR-based processing and structured content organization.",
      "Assisted in improving academic evaluation workflows, helping reduce manual grading efforts through AI-based automation features.",
    ],
  },
];

export default EXPERIENCE;
export type { ExperienceType };