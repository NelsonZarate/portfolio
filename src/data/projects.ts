export interface Project {
  title: string;
  slug: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Decozy",
    slug: "decozy-ai-interior-design",
    category: "Artificial Intelligence & Web Development",
    description: "Uma plataforma inovadora de design de interiores impulsionada por IA que transforma fotos de espaços em tempo real. Através de agentes autónomos, a Decozy gera visualizações realistas de remodelações e identifica automaticamente mobiliário real correspondente no e-commerce, unindo inspiração visual e compras integradas.",
    tech: [
      "CrewAI",
      "Groq",
      "OpenAI",
      "FastAPI",
      "Python",
      "Docker",
      "Next.js",
      "GSAP",
      "PostgreSQL",
      "Google OAuth 2.0"
    ],
    image: "/projects/Decozy.png",
    demoUrl: "http://localhost:3000",
    githubUrl: "https://github.com/nelson/decozy"
  },
  {
    title: "Out Of The Box",
    slug: "out-of-the-box",
    category: "Full Stack",
    description: " O Out Of The Box é um evento anual que celebra a criatividade e o talento dos formandos da ETIC_Algarve, reunindo exposições palestras, workshops, projeções de vídeo, concertos e muito mais.",
    tech: ["DJango", "Vite", "Python", "Docker"],
    image: "/projects/Out-Of-The-Box.png",
    demoUrl: "https://outofthebox.eticalgarve.com/",
    githubUrl: "https://github.com/Huniity/out-of-the-box/",
  },
  {
    title: "Task Manager",
    slug: "task-manager",
    category: "Web App",
    description: "Task management app with drag-and-drop and authentication.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    image: "/projects/tasks.jpg",
    demoUrl: "https://tasks-demo.vercel.app",
    githubUrl: "https://github.com/NelsonZarate/task-manager",
  },
  {
    title: "Chat Realtime",
    slug: "chat-realtime",
    category: "Full Stack",
    description: "Real-time chat with WebSockets and push notifications.",
    tech: ["Next.js", "Socket.io", "Redis", "PostgreSQL"],
    image: "/projects/chat.jpg",
    demoUrl: "https://chat-demo.vercel.app",
    githubUrl: "https://github.com/NelsonZarate/chat-app",
  },
  {
    title: "Portfolio V1",
    slug: "portfolio-v1",
    category: "Web Design",
    description: "My first portfolio website with animations.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/projects/portfolio.jpg",
    demoUrl: "https://portfolio-v1.vercel.app",
  },
];
