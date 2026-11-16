// Who I am, in the words the whole site uses: hero, contact, footer, SEO and
// the AI assistant's knowledge base all read from here.

export const profile = {
  name: "Luman (Grace) Zhan",
  firstName: "Luman",
  preferredName: "Grace",
  lastName: "Zhan",
  headline: "AI/ML engineer building and evaluating LLM systems",
  thesis:
    "I build LLM systems, then measure whether they actually work. The gap between “it should work” and “what actually happened” only closes when you instrument the messy layer an abstraction hides.",
  target: "Looking for Summer 2027 AI/ML and software engineering internships.",
  location: "Durham, NC",
  email: "zhanluman0612@gmail.com",
  links: {
    github: "https://github.com/evelindsayyy",
    linkedin: "https://www.linkedin.com/in/luman-z-22198a2a2/",
  },
  photo: {
    portrait: "/images/profile.jpg",
    square: "/images/profile-square.jpg",
    alt: "Portrait of Luman (Grace) Zhan",
  },
  education: [
    {
      school: "Duke University",
      degree: "B.S. in Computer Science, Machine Learning & AI concentration; minor in English",
      dates: "Aug 2025 – expected May 2028",
      detail: "GPA 3.88/4.00",
    },
    {
      school: "University of Michigan, Ann Arbor",
      degree: "Undergraduate coursework: applied linear algebra, discrete mathematics, honors multivariable calculus, statistics",
      dates: "Aug 2024 – May 2025",
      detail: "GPA 4.00/4.00",
    },
  ],
} as const
