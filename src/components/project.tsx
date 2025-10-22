interface ProjectType {
  title: string;
  desc: string;
  stack: string[];
  details: string[];
  links: { code: string; demo: string };
}

const PROJECTS: ProjectType[] = [
  {
    title: "Lab360° - All-in-One Lab Management Platform",
    desc: "Comprehensive university lab and asset management platform with QR/Barcode tracking, AI-driven analytics, and role-based dashboards for Admins, Lab Technicians, and Faculty.",
    stack: ["Next.js", "NextAuth.js", "MongoDB"],
    details: [
      "Designed a unified full-stack system to manage laboratories, PCs, and institutional assets across departments.",
      "Developed role-based dashboards (Admin, Technician, Faculty) with secure authentication and email credential distribution.",
      "Implemented QR/Barcode tracking, subject-wise experiment management, lab timetable scheduling, and predictive maintenance insights using AI.",
      "Built interactive analytics dashboards with usage trends, depreciation tracking, and department-wise reports for compliance.",
    ],
    links: {
      code: "https://github.com/Khushiimaheshwari/Smart-Inventory-and-Resource-Management-System",
      demo: "#",
    },
  },
  {
    title: " HealingNeuro - A Depression Monitoring System",
    desc: "AI-Powered Web Application & Chrome Extension, a full-stack project integrating ML/DL models, REST APIs, authentication, and real-time AI activity suggestions with OpenAI & DeepSeek R1.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "Flask", "SQLite", "Gen AI"],
    details: [
      "Developed responsive web app & Chrome extension with 91% predictive accuracy using ML/DL models.",
      "Engineered REST APIs, JWT, OAuth for authentication, session management & DOM manipulation.",
      "Implemented real-time AI-based activity suggestions powered by OpenAI & DeepSeek R1 APIs.",
    ],
    links: {
      code: "https://github.com/Khushiimaheshwari/HealingNeuro--A-Depression-Monitoring-System",
      demo: "https://drive.google.com/drive/folders/1kOwLR07KjO3qswaVTdNuXEVv1hpmGV_n?usp=drive_link",
    },
  },
  {
    title: "Fluentia - Find Your Flow",
    desc: "Modern communication platform with real-time messaging, video calls, and community-driven features built for scalability and engagement.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Stream API", "WebRTC"],
    details: [
      "Developed real-time messaging & high-quality video calling with MERN stack & Stream API.",
      "Implemented secure data handling & scalable architecture supporting group calls.",
      "Integrated AI chat partners & gamification features to boost user engagement."
    ],
    links: { code: "https://github.com/Khushiimaheshwari/Fluentia", demo: "#" },
  },
  {
    title: "TrendÉclat - E-Commerce Platform",
    desc: "Full-stack multi-vendor e-commerce application with secure authentication, vendor, admin and user dashboards, and integrated payments for a seamless shopping experience.",
    stack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "JWT",
      "OAuth",
      "Stripe API",
    ],
    details: [
      "Built full-stack e-commerce platform with MERN stack featuring multi-vendor support.",
      "Implemented secure authentication with JWT & OAuth; role-based access for Customers, Vendors, and Admins.",
      "Developed vendor dashboards for product/order management and admin panel for global order/user/vendor control.",
      "Integrated Stripe payment gateway with order tracking, shipping estimation & delivery status.",
    ],
    links: { code: "https://github.com/Khushiimaheshwari/Trend-clat", demo: "#" },
  },
  {
    title: "BlogNest - A Mega Blog Application",
    desc: "Modern blogging platform with advanced React ecosystem, Appwrite backend, and optimized state management.",
    stack: ["React.js", "Tailwind CSS", "React Router", "Context API", "Redux Toolkit", "Appwrite"],
    details: [
      "Built fully responsive UI with React.js, Tailwind CSS, and React Router for seamless navigation.",
      "Enhanced state management using Context API & Redux Toolkit, improving code efficiency by 15%.",
      "Implemented Appwrite backend with CRUD operations, JWT authentication, post likes & user-specific content management.",
    ],
    links: {
      code: "https://github.com/Khushiimaheshwari/BlogNest",
      demo: "https://blog-nest-flax.vercel.app/",
    },
  },
];


export default PROJECTS;

