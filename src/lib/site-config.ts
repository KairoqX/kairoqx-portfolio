/**
 * site-config.ts
 * -----------------------------------------------------------------------
 * Single source of truth for personal/content data used across the site.
 * Edit THIS file to update your info everywhere (nav, hero, footer, SEO,
 * command palette, etc). Keeping content out of components makes them
 * reusable and keeps copy changes low-risk.
 * -----------------------------------------------------------------------
 */

export const siteConfig = {
  name: "KairoqX",
  handle: "kairoqx",
  githubUsername: "AakashThunderz",
  role: "Student Developer",
  tagline: "AI & ML Learner",
  url: "https://kairoqx-portfolio.vercel.app", // TODO: replace with your real production domain
  description:
    "KairoqX — a student developer learning AI, Machine Learning, LLMs and full-stack development. Building projects while learning, one line of code at a time.",
  location: "Uttar Pradesh, India",
  email: "kairoqx@proton.me", // TODO: replace with your real email
  keywords: [
    "KairoqX",
    "Aakash",
    "AI developer",
    "Machine Learning student",
    "LLM projects",
    "Python developer",
    "Open source",
    "Portfolio",
  ],
} as const;

export const roles = [
  "AI & ML Learner.",
  "Curious Developer.",
  "Open-Source Enthusiast.",
  "Creative Editor.",
];

export const socialLinks = [
  {
    icon: "github",
    label: "GitHub",
    href: `https://github.com/${siteConfig.githubUsername}`,
  },
  { icon: "x", label: "X (Twitter)", href: "https://x.com/kairoqx" },
  {
    icon: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/_kairoqx_/",
  },
  { icon: "mail", label: "Email", href: `mailto:${siteConfig.email}` },
] as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Journey" },
  { href: "#terminal", label: "Terminal" },
  { href: "#certificates", label: "Certificates" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
] as const;

export const aboutChips = [
  { icon: "brain", label: "AI & Machine Learning" },
  { icon: "cpu", label: "LLMs" },
  { icon: "code", label: "Python" },
  { icon: "gitBranch", label: "Open Source" },
  { icon: "layers", label: "Full Stack Learning" },
  { icon: "penTool", label: "Editor" },
] as const;

export const aboutStats = [
  { value: 3, label: "projects built" },
  { value: 9, label: "techs exploring" },
  { value: 240, label: "GitHub commits" },
] as const;

export const skillCategories = [
  {
    title: "Programming",
    icon: "code",
    skills: [
      { name: "Python", level: 78 },
      { name: "JavaScript", level: 62 },
      { name: "HTML", level: 70 },
      { name: "C", level: 65 },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: "brain",
    skills: [
      { name: "PyTorch", level: 55 },
      { name: "TensorFlow", level: 45 },
      { name: "Transformers", level: 50 },
      { name: "LLMs / Prompting", level: 65 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "terminal",
    skills: [
      { name: "Git", level: 70 },
      { name: "Linux", level: 58 },
      { name: "Docker", level: 42 },
      { name: "VS Code", level: 85 },
    ],
  },
] as const;

export const certificates = [
  {
    title: "CS50P",
    org: "Edx · Harvard University",
    icon: "award",
  },
  {
    title: "Let's build GPT: from scratch",
    org: "Youtube · Andrej Karpathy",
    icon: "brain",
  },
  {
    title: "Neural Networks: Zero to Hero",
    org: "Youtube · Andrej Karpathy",
    icon: "cpu",
  },
  { title: "Python for Beginners", org: "Youtube · CodeWithHarry", icon: "terminal" },
  { title: "Docker Foundations", org: "freeCodeCamp", icon: "layers" },
  { title: "Git and Github Tutorial For Beginners", org: "Youtube · CodeWithHarr", icon: "git" },
] as const;

export const timeline = [
  {
    year: "2024",
    title: "Started learning to code",
    desc: "Picked up Python fundamentals — variables, loops, and a lot of trial and error.",
  },
  {
    year: "2025",
    title: "Discovered AI & Machine Learning",
    desc: "Took my first ML course, trained my first model, and got hooked on how it all works.",
  },
  {
    year: "2026",
    title: "Started exploring LLMs",
    desc: "Began experimenting with prompt engineering and built my first LLM-powered chat app.",
  },
  {
    year: "2026",
    title: "Built my first GPT from scratch",
    desc: "Wrote a small nanoGPT-style model in plain PyTorch to understand transformers from the ground up.",
  },
  {
    year: "Now",
    title: "Still learning, still building",
    desc: "Continuing to explore AI, ML and open source — one curious project at a time.",
  },
] as const;

/**
 * Fallback projects — used only if the live GitHub API call fails
 * (rate limit, offline, etc). Keeps the Projects section from ever
 * rendering empty. See src/lib/github.ts.
 */
export const fallbackProjects = [
  {
    name: "MahiruAI",
    description:
      "An anime-inspired AI assistant with voice commands, automation, memory and intelligent conversations.",
    html_url: `https://github.com/${siteConfig.githubUsername}/MahiruAI`,
    homepage: null,
    stargazers_count: 2,
    language: "Python",
    topics: ["python", "ai-assistant", "automation"],
    pushed_at: new Date().toISOString(),
    size: 1200,
  },
  {
    name: "micro-gpt",
    description:
      "A small GPT language model built from scratch in plain PyTorch, trained CPU-only on a subset of the UltraChat dataset.",
    html_url: `https://github.com/${siteConfig.githubUsername}/micro-gpt`,
    homepage: null,
    stargazers_count: 0,
    language: "Python",
    topics: ["pytorch", "gpt", "nanogpt"],
    pushed_at: new Date().toISOString(),
    size: 800,
  },
  {
    name: "ARIS",
    description:
      "A JARVIS-inspired AI assistant with voice commands, automation, memory and intelligent conversations.",
    html_url: `https://github.com/${siteConfig.githubUsername}/ARIS`,
    homepage: null,
    stargazers_count: 0,
    language: "Python",
    topics: ["python", "ai-assistant"],
    pushed_at: new Date().toISOString(),
    size: 600,
  },
] satisfies FallbackProject[];

export type FallbackProject = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  size: number;
};
