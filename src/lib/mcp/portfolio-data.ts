// Shared, public portfolio data used by MCP tools.
// Everything here is already visible on the published site.

export const PROFILE = {
  name: "Sunil Devra",
  title: "AI/ML Engineer & Full-Stack Developer",
  tagline:
    "Building AI-powered solutions for real Indian problems — from agriculture to elderly care.",
  location: "Jaipur, Rajasthan, India",
  education: [
    { degree: "B.Tech AI & ML", institution: "NIAT Jaipur" },
    {
      degree: "B.Tech CSE (coursework)",
      institution: "Vivekananda Global University, Jaipur",
    },
  ],
  admissionYear: 2025,
  about:
    "Full-Stack Developer and AI/ML engineer focused on shipping products that solve tangible problems for Indian users. Work sits at the intersection of competitive programming (C++, Python), modern web/mobile development, and generative AI.",
};

export const CONTACT_LINKS = {
  linkedin: "https://www.linkedin.com/in/sunil-devra-6471b7355",
  github: "https://github.com/sunildevra754-cell",
  email: "sunildevra26@gmail.com",
  resume:
    "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/Sunil_Devra_Resume_2026.pdf",
};

export const SKILL_GROUPS = [
  {
    label: "languages",
    items: ["C++", "Python", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    label: "frameworks_and_tools",
    items: [
      "React",
      "React Native / Expo",
      "Firebase",
      "MongoDB",
      "REST APIs",
      "Bootstrap",
      "Git / GitHub",
      "VS Code",
    ],
  },
  {
    label: "ai_ml",
    items: [
      "Google AI Studio",
      "Generative AI",
      "Prompt Engineering",
      "ML Fundamentals",
    ],
  },
  { label: "rapid_prototyping", items: ["Lovable", "Base44"] },
];

export const EXPERIENCE = [
  {
    role: "Full-Stack AI Developer",
    org: "Personal Projects & Hackathons",
    period: "2025 — Present",
    points: [
      "Built and deployed Smart Farmer One Touch, live at smart-farmer-connect.base44.app",
      "Solved 100+ competitive programming problems in C++ and Python",
      "Participated in the National Cloud Innovation Challenge by 3SVK, Hyderabad (Phase 2: Idea Submission)",
    ],
  },
  {
    role: "MERN Stack Intern",
    org: "Webstack Academy",
    period: "June 2026 — July 2026",
    points: [
      "Completed a 4-week online internship in full-stack web development (MERN stack)",
      'Built "Food Genie" — an AI food ordering app — as the capstone project',
    ],
  },
  {
    role: "Frontend Web Developer Intern",
    org: "YuvaIntern (NSDC / Henry Harvin Education)",
    period: "Jul 2026 (Remote)",
    points: [
      "Converted a design wireframe into a responsive web page using semantic HTML and CSS",
      "Added JavaScript interactivity and built a single-page application (SPA) simulation across 5 weekly tasks",
      "Improved site performance and accessibility following web best practices",
    ],
  },
  {
    role: "AI & Data Science Intern",
    org: "Data Alcott Systems",
    period: "Jul 2026 – Aug 2026 (Remote)",
    points: [
      "Built NLP/ML systems in Python, including an AI Career Guidance Assistant (intent classification with NLTK, spaCy, Scikit-learn) and an AI Resume Reviewer that scores skills, experience and education",
      "Developed an AI Project Topic Recommender using TF-IDF and cosine similarity",
      "Built an AI-powered Registration Assistant chatbot for course registration and eligibility checks",
      "Delivered GitHub repositories, demo videos, project reports and technical blog posts",
    ],
  },
];

export const FEATURED_PROJECT = {
  name: "Smart Farmer One Touch",
  tagline: "AI-powered agriculture platform",
  url: "https://smart-farmer-connect.base44.app",
  description:
    "An AI-powered application solving major problems Indian farmers face — crop disease detection, mandi price tracking, weather updates, fertilizer budgeting, profit prediction, and government scheme info, all in one app.",
  builtWith: [
    "Firebase",
    "Google AI Studio",
    "HTML/CSS/JS",
    "REST APIs",
    "Base44",
  ],
  features: [
    "Kissan Feed",
    "Mandi Prices",
    "Crop Doctor",
    "Spray Advisor",
    "Fertilizer Budget",
    "Profit Predictor",
    "Action Plan",
    "Village Intel",
    "Live Location",
    "Drone",
    "IoT Dashboard",
    "Schemes",
    "AI Assistant",
  ],
};

export const CERTIFICATIONS = [
  {
    title: "Oracle Certified Foundations Associate — Agentic AI",
    issuer: "Oracle",
    date: "2026",
    image:
      "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/Oracle_Foundations_Associate_AgenticAI.png",
  },
  {
    title: "Oracle Certified Professional — OCI 2025 Generative AI",
    issuer: "Oracle",
    date: "Oct 2025 · valid till Oct 2027",
    image:
      "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/Oracle_Professional_OCI_GenerativeAI.png",
  },
  {
    title: "Google AI Essentials Specialization",
    issuer: "Google · Coursera",
    date: "May 2026",
    image:
      "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/Google_AI_Essentials_Coursera.png",
    verify: "https://coursera.org/verify/specialization/MYT68495ZW80",
  },
  {
    title: "Google Prompting Essentials Specialization",
    issuer: "Google · Coursera",
    date: "May 2026",
    image:
      "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/Google_Prompting_Essentials_Coursera.png",
    verify: "https://coursera.org/verify/specialization/WCWDI0H8XY7T",
  },
  {
    title: "MERN Stack Internship Completion",
    issuer: "Webstack Academy",
    date: "July 2026",
    image:
      "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/WSA_MERN_Internship_Completion.png",
  },
  {
    title: "Certificate of Completion — Frontend Web Developer Intern",
    issuer: "YuvaIntern (NSDC)",
    date: "Jul 2026",
    image: "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/YuvaIntern_Completion_Certificate.png",
  },
  {
    title: "Certificate of Experience — Frontend Web Developer Intern",
    issuer: "YuvaIntern (Henry Harvin)",
    date: "Aug 2026",
    image: "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/YuvaIntern_Experience_Certificate.png",
  },
  {
    title: "National Level Project Exhibition 2026 — Certificate of Participation",
    issuer: "Vivekananda Global University, Jaipur",
    date: "2026",
    image: "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/VGU_National_Project_Exhibition_2026.png",
  },
  {
    title:
      "Certificate of Excellence — National Cloud Innovation Challenge",
    issuer: "3SVK, Hyderabad",
    date: "April 2026",
    image:
      "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/3SVK_National_Cloud_Innovation_Challenge.png",
  },
  {
    title: "Certificate of Completion — Data Alcott Systems",
    issuer: "Data Alcott Systems",
    date: "Aug 2026",
    image:
      "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/Data_Alcott_Completion_Certificate.png",
  },
  {
    title: "AI/ML for Geodata Analytics",
    issuer: "IIRS, ISRO",
    date: "Aug 2026",
    image:
      "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/ISRO_AIML_Geodata_Certificate.png",
  },
];
