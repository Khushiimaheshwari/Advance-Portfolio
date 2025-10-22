interface ExperienceType {
  org: string;
  role: string;
  period: string;
  bullets: string[];
}

const EXPERIENCE: ExperienceType[] = [
  {
    org: "Consort Digital",
    role: "Software Engineer Intern",
    period: "October 2025 - Present",
    bullets: [
      "Tech Stack: HTML, CSS, Javascript, React.js, Node.js, Electron and MySQL.",
      "Developed a cross-platform desktop application using Electron, converting the company’s existing web-based Dispatcher application into a full-featured desktop solution with support for Windows, macOS, and Linux.",
      "Improved application accessibility and performance by reducing browser dependency, achieving a 35% boost."
    ],
  },
  {
    org: "Sunstone",
    role: "Tech Intern",
    period: "August 2025 - September 2025",
    bullets: [
      "Tech Stack: PHP, HTML, CSS, SCSS, JavaScript and AI.",
      "Coordinated a topic-wise framework for Sunstone LMS with a scalable structure and Sunstone FORMA, OCR and AI Grading , reducing workload by 55%.",
      "Enhanced Sunstone Moodle frontend layout and transitioned CodeRunner to Virtual Programming Lab (VPL).",
    ],
  },
];

export default EXPERIENCE;
export type { ExperienceType };