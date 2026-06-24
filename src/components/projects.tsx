"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play, X } from "lucide-react";
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
  video: string;
}

const projects: Project[] = [
  {
    title: "E-commerce App",
    description: "Loja online completa com carrinho, pagamentos e painel admin.",
    techs: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    github: "https://github.com/seu-usuario/ecommerce",
    demo: "https://ecommerce-demo.vercel.app",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Task Manager",
    description: "App de gestão de tarefas com drag-and-drop e autenticação.",
    techs: ["React", "Node.js", "MongoDB", "Tailwind"],
    github: "https://github.com/seu-usuario/task-manager",
    demo: "https://tasks-demo.vercel.app",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Chat Realtime",
    description: "Chat em tempo real com WebSockets e notificações push.",
    techs: ["Next.js", "Socket.io", "Redis", "PostgreSQL"],
    github: "https://github.com/seu-usuario/chat-app",
    demo: "https://chat-demo.vercel.app",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

function VideoModal({
  video,
  title,
  onClose,
}: {
  video: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 w-[90vw] max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-20 bg-black/50 text-white hover:bg-black/70"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <iframe
          src={video + "?autoplay=1"}
          title={title}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [activeVideo, setActiveVideo] = useState<{ video: string; title: string } | null>(null);

  return (
    <>
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
                  {/* Video thumbnail */}
                  <button
                    onClick={() => setActiveVideo({ video: project.video, title: project.title })}
                    className="relative group overflow-hidden rounded-t-lg aspect-video bg-muted"
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="rounded-full bg-white/90 p-3"
                      >
                        <Play className="h-6 w-6 text-black fill-black" />
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <Play className="h-8 w-8" />
                    </div>
                  </button>

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
                      nativeButton={false}
                      variant="outline"
                      size="sm"
                    >
                      GitHub
                    </Button>
                    <Button
                      render={<a href={project.demo} target="_blank" rel="noopener noreferrer" />}
                      nativeButton={false}
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

      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            video={activeVideo.video}
            title={activeVideo.title}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
