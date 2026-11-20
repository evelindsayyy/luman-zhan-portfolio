// Who I am, in the words the whole site uses: the left column, the About tab,
// SEO and the AI assistant's knowledge base all read from here.

export const profile = {
  name: "Luman (Grace) Zhan",
  displayName: "Grace Zhan",
  firstName: "Luman",
  preferredName: "Grace",
  lastName: "Zhan",
  role: "AI/ML Engineer · Duke CS, ML/AI track",
  headline: "AI/ML engineer building and evaluating LLM agents",
  /** The resume's summary, as one line. */
  summary:
    "I build and evaluate LLM agents, owning AI features end to end: from building the LLM application to proving it works and improving the underlying model.",
  status: "Open to Summer 2027 internships",
  target: "Looking for Summer 2027 AI/ML engineering internships, with backend engineering as a strong second lane.",
  location: "Durham, NC",
  email: "zhanluman0612@gmail.com",
  links: {
    github: "https://github.com/evelindsayyy",
    linkedin: "https://www.linkedin.com/in/luman-z-22198a2a2/",
  },
  photo: {
    portrait: "/images/profile.jpg",
    square: "/images/profile-square.jpg",
    alt: "Portrait of Grace Zhan",
  },
  about: [
    "I’m **Luman (Grace) Zhan**, a Computer Science student at Duke on the Machine Learning & AI track, with a minor in English. I build and evaluate **LLM agents**, and I like owning a feature end to end: building the application, proving it works, and improving the model underneath.",
    "I came to AI from backend and full-stack work, so I care about contracts, data provenance and environments as much as models. I’m aiming at **AI/ML infrastructure and evaluation**, with backend engineering as a strong second lane.",
  ],
  howIWork:
    "The gap between “it should work” and “what actually happened” only closes when you measure the layer the abstraction hides.",
  education: [
    {
      school: "Duke University",
      gpa: "GPA 3.88 / 4.00",
      degree: "B.S. Computer Science",
      focus: "Machine Learning & AI concentration · minor in English",
      when: "Aug 2025 – May 2028 (expected) · Durham, NC",
      courses: ["Data Structures and Algorithms", "Probability", "Computer Systems", "Modeling", "Machine Learning", "Game Design"],
    },
    {
      school: "University of Michigan",
      gpa: "GPA 4.00 / 4.00",
      degree: "Computer Engineering",
      focus: "Transferred to Duke after one year",
      when: "Aug 2024 – May 2025 · Ann Arbor, MI",
      courses: [
        "Applied Linear Algebra",
        "Discrete Mathematics",
        "Honors Multivariable and Vector Calculus",
        "Statistics and Data Analysis",
      ],
    },
  ],
  skills: [
    { label: "Languages", items: ["Python", "SQL", "Java", "JavaScript", "Go", "C++"] },
    {
      label: "Eval & analysis",
      items: ["scikit-learn", "statsmodels (Cohen’s / Fleiss’ κ)", "Bradley-Terry (choix)", "pandas", "Qualtrics"],
    },
    {
      label: "Data, serving & infra",
      items: ["Snowflake", "PostgreSQL", "SQLite", "Slurm", "Docker", "AWS (Bedrock, IAM, SSM, Lambda, S3)", "GCP"],
    },
    {
      label: "Agents & tooling",
      items: ["Strands Agents", "Bedrock AgentCore", "MCP", "LangChain", "RAG", "LLM-as-judge", "NL-to-SQL", "Pydantic"],
    },
  ],
  resume: {
    pdf: "/resume.pdf",
    preview: "/resume-preview.png",
    updated: "Nov 2026",
  },
} as const
