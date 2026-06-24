"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  techs: string[];
  github: string;
  demo: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "E-commerce App",
    description: "Loja online completa com carrinho, pagamentos e painel admin.",
    techs: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    github: "https://github.com/seu-usuario/ecommerce",
    demo: "https://ecommerce-demo.vercel.app",
    image: "/placeholder-project.png",
  },
  {
    title: "Task Manager",
    description: "App de gestão de tarefas com drag-and-drop e autenticação.",
    techs: ["React", "Node.js", "MongoDB", "Tailwind"],
    github: "https://github.com/seu-usuario/task-manager",
    demo: "https://tasks-demo.vercel.app",
    image: "/placeholder-project.png",
  },
  {
    title: "Chat Realtime",
    description: "Chat em tempo real com WebSockets e notificações push.",
    techs: ["Next.js", "Socket.io", "Redis", "PostgreSQL"],
    github: "https://github.com/seu-usuario/chat-app",
    demo: "https://chat-demo.vercel.app",
    image: "/placeholder-project.png",
  },
];

export function Projects() {
  return (
    <section id="projetos" className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12">Projetos</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </CardContent>
                <CardFooter className="mt-auto gap-2">
                  <Button
                    render={<a href={project.github} target="_blank" rel="noopener noreferrer" />}
                    variant="outline"
                    size="sm"
                  >
                    GitHub
                  </Button>
                  <Button
                    render={<a href={project.demo} target="_blank" rel="noopener noreferrer" />}
                    size="sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
