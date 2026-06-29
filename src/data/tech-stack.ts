import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss3,
  SiDjango, SiPython, SiNodedotjs, SiExpress, SiFastapi,
  SiPostgresql, SiMysql, SiMongodb,
  SiGit, SiGithub, SiDocker, SiVercel, SiPostman, SiFigma, SiVisualstudiocode,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type TechLevel = "Core" | "Advanced" | "Learning" | "Tools";
export type TechCategory = "Frontend" | "Backend" | "Databases" | "Tools & Deployment";

export interface Tech {
  name: string;
  category: TechCategory;
  description: string;
  icon: IconType;
  level: TechLevel;
}

export const technologies: Tech[] = [
  // Frontend
  { name: "React", category: "Frontend", description: "Biblioteca para criar interfaces dinâmicas e componentizadas.", icon: SiReact, level: "Core" },
  { name: "Next.js", category: "Frontend", description: "Framework React com SSR, routing e otimizações.", icon: SiNextdotjs, level: "Core" },
  { name: "TypeScript", category: "Frontend", description: "JavaScript tipado para código mais seguro e escalável.", icon: SiTypescript, level: "Core" },
  { name: "JavaScript", category: "Frontend", description: "Linguagem base da web para lógica e interatividade.", icon: SiJavascript, level: "Advanced" },
  { name: "Tailwind CSS", category: "Frontend", description: "Framework utility-first para estilização rápida.", icon: SiTailwindcss, level: "Core" },
  { name: "HTML5", category: "Frontend", description: "Estrutura semântica de páginas web.", icon: SiHtml5, level: "Advanced" },
  { name: "CSS3", category: "Frontend", description: "Estilização avançada com animations e grid.", icon: SiCss3, level: "Advanced" },
  // Backend
  { name: "Django", category: "Backend", description: "Framework Python robusto para backends rápidos.", icon: SiDjango, level: "Core" },
  { name: "Python", category: "Backend", description: "Linguagem versátil para backend e automação.", icon: SiPython, level: "Core" },
  { name: "Node.js", category: "Backend", description: "Runtime JavaScript para servidores escaláveis.", icon: SiNodedotjs, level: "Advanced" },
  { name: "REST API", category: "Backend", description: "Arquitetura para comunicação entre serviços.", icon: SiNodedotjs, level: "Advanced" },
  { name: "FastAPI", category: "Backend", description: "Framework Python moderno e rápido para APIs.", icon: SiFastapi, level: "Core" },
  // Databases
  { name: "PostgreSQL", category: "Databases", description: "Base de dados relacional poderosa e extensível.", icon: SiPostgresql, level: "Core" },
  { name: "MySQL", category: "Databases", description: "Base de dados relacional popular e confiável.", icon: SiMysql, level: "Advanced" },
  { name: "MongoDB", category: "Databases", description: "Base de dados NoSQL orientada a documentos.", icon: SiMongodb, level: "Advanced" },
  { name: "SQL", category: "Databases", description: "Linguagem para consultas e gestão de dados.", icon: SiPostgresql, level: "Advanced" },
  // Tools & Deployment
  { name: "Git", category: "Tools & Deployment", description: "Controlo de versões distribuído.", icon: SiGit, level: "Tools" },
  { name: "GitHub", category: "Tools & Deployment", description: "Plataforma para colaboração e CI/CD.", icon: SiGithub, level: "Tools" },
  { name: "Docker", category: "Tools & Deployment", description: "Containerização para ambientes consistentes.", icon: SiDocker, level: "Tools" },
  { name: "Vercel", category: "Tools & Deployment", description: "Deploy instantâneo para apps Next.js.", icon: SiVercel, level: "Tools" },
  { name: "Figma", category: "Tools & Deployment", description: "Design de interfaces e prototipagem.", icon: SiFigma, level: "Tools" },
  { name: "VS Code", category: "Tools & Deployment", description: "Editor de código leve e extensível.", icon: SiVisualstudiocode, level: "Tools" },
];

export const featuredTech = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Django", "FastAPI", "PostgreSQL", "Vercel"];

export const categories: TechCategory[] = ["Frontend", "Backend", "Databases", "Tools & Deployment"];
