export const PROFILE = {
  name: "Piyush Priyadarshi",
  role: "Software Engineer · Frontend Developer · Product-minded UI Engineer",
  email: "piyush130504@gmail.com",
  github: "https://github.com/piyush130504-wq",
  linkedin: "https://www.linkedin.com/in/piyush-priyadarshi-449251328/",
  intro:
    "I'm Piyush — a software engineer focused on building thoughtful interfaces, scalable applications, and AI-powered products.",
};

export const PROJECTS = [
  {
    id: "rodic-ai",
    index: "01",
    title: "AI-Powered Startup Idea Screening Platform",
    org: "Rodic Consultants",
    tech: ["React", "Vercel Serverless Functions", "MongoDB", "Gemini API"],
    links: {
      live: "https://rodic-ai-checker.vercel.app/",
      github: "https://github.com/piyush130504-wq",
    },
    description:
      "An AI-driven platform that evaluates early-stage startup proposals against structured screening criteria — turning a manual, subjective review process into a consistent, database-backed workflow.",
    problem:
      "Startup proposals arrived as unstructured documents and were screened manually, making evaluations slow, inconsistent, and hard to revisit later.",
    approach:
      "Built a React platform backed by Vercel serverless functions and MongoDB, with the Gemini API generating structured evaluations across market viability, risk, and scalability for every submission.",
    decisions: [
      "Structured screening workflows so every proposal is evaluated against the same criteria.",
      "MongoDB as the system of record for submissions and evaluation history.",
      "Serverless functions so AI evaluation cost scales with usage, not idle time.",
    ],
    challenges:
      "Production deployment and debugging — resolving API integration issues and deployment configurations to keep the platform reliable outside local development.",
    stages: ["Intake", "AI Screening", "Report"],
  },
  {
    id: "reep",
    index: "02",
    title: "Rodic Engineering Excellence Program (REEP)",
    org: "Rodic Consultants",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: {
      live: "https://rodic-engineering-excellence-progra.vercel.app/",
      github: "https://github.com/piyush130504-wq",
    },
    description:
      "An immersive, interactive website for Rodic's Engineering Excellence Program — built around scroll-based canvas animation and a digital twin visualization.",
    problem:
      "The program needed a web experience that could communicate large-scale engineering work in an engaging way, rather than a static brochure site.",
    approach:
      "Implemented the full frontend in Next.js and TypeScript with Tailwind CSS and Framer Motion, including a scroll-driven canvas animation that renders a digital twin visualization.",
    decisions: [
      "Scroll-based canvas animation ties the digital twin directly to the narrative.",
      "Componentized responsive layout keeps complex visuals performant across breakpoints.",
      "Framer Motion for choreography — purposeful interaction, never decoration.",
    ],
    challenges:
      "Translating a sophisticated digital-twin concept into a production React implementation that stayed smooth and responsive on real devices.",
    stages: ["Story", "Canvas", "Digital Twin"],
  },
  {
    id: "crop-yield",
    index: "03",
    title: "Crop Yield Prediction",
    org: "Machine Learning",
    tech: ["Python", "XGBoost", "LSTM", "TensorFlow Lite", "SHAP"],
    links: {
      github: "https://github.com/piyush130504-wq/Cropred",
    },
    description:
      "A machine learning system that predicts crop yield and explains its own predictions — pairing predictive analytics with model interpretability.",
    problem:
      "Yield forecasting is only useful when it can be trusted — a prediction without an explanation can't inform a decision.",
    approach:
      "Combined XGBoost and LSTM models for yield prediction, used SHAP for feature attribution, and packaged the models with TensorFlow Lite for on-device inference.",
    decisions: [
      "SHAP-based interpretability so every prediction ships with its drivers.",
      "TensorFlow Lite export makes the model deployable beyond the notebook.",
      "A pipeline that cleanly separates training from inference.",
    ],
    challenges:
      "Making a complex ensemble interpretable — reconciling XGBoost and LSTM outputs into a single, explainable prediction.",
    stages: ["Train", "Attribute", "Deploy"],
  },
];

export const CASE_STUDIES = [
  {
    num: "01",
    route: "/work/crm",
    title: "SaaS CRM Dashboard",
    summary:
      "A full CRM product concept for a fictional B2B SaaS company — collapsible sidebar navigation, revenue analytics, a deals pipeline, customer activity and a sortable data table. Everything is interactive.",
    features: ["Collapsible sidebar", "Revenue analytics", "Deals pipeline", "Sortable data table"],
    tags: ["Product Design", "Dark UI", "Data Visualisation"],
  },
  {
    num: "02",
    route: "/work/design-system",
    title: "Design System Architecture",
    summary:
      "A dedicated design-system showcase — typography and colour tokens, spacing and radius scales, and a full component library documented in every state from default to error.",
    features: ["Design tokens", "Component states", "Typography scale", "Dark & light"],
    tags: ["Design Systems", "Tokens", "Documentation"],
  },
  {
    num: "03",
    route: "/work/analytics",
    title: "Complex Data Analytics Dashboard",
    summary:
      "A high-density analytics interface that turns dense information into a readable experience — time-series comparison, advanced filters, sortable and expandable tables, and a working export control.",
    features: ["Time-series comparison", "Advanced filters", "Expandable rows", "CSV export"],
    tags: ["Data Density", "Accessibility", "Interaction Design"],
  },
];

export const TIMELINE = [
  {
    role: "Software & AI Engineering Intern",
    company: "Rodic Consultants",
    details:
      "Developed React/FastAPI-based platforms and AI-driven evaluation tools — including an AI-powered startup idea screening platform — working with MongoDB, APIs, deployment configurations, and production debugging.",
  },
  {
    role: "Data Centre Engineering Intern",
    company: "Beltron",
    details:
      "Worked with virtual machine provisioning, backup systems, and enterprise IT infrastructure.",
  },
  {
    role: "Marketing Assistant",
    company: "Befoodie.io",
    details:
      "Worked on online advertising, sales data analysis, and promotional strategies.",
  },
  {
    role: "General Secretary",
    company: "IEEE Student Branch",
    details:
      "General Secretary of the IEEE Student Branch — leading the branch's technical activities and community initiatives.",
  },
];

export const SKILLS = [
  {
    title: "Frontend Engineering",
    icon: "layout",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend Engineering",
    icon: "server",
    items: ["Node.js", "Express.js", "Python", "FastAPI", "REST APIs"],
  },
  {
    title: "AI & Machine Learning",
    icon: "brain",
    items: ["Gemini API", "OpenAI API", "XGBoost", "LSTM", "TensorFlow Lite", "SHAP"],
  },
  {
    title: "Database & Infrastructure",
    icon: "database",
    items: ["MongoDB", "SQL", "AWS S3", "Vercel", "Git", "GitHub"],
  },
];
