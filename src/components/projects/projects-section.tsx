"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import Link from "next/link";

interface CardPath {
  keyframes: { x: number[]; y: number[] };
  rotate: number;
  duration: number;
}

function generatePath(w: number, h: number): CardPath {
  const points = 4;
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i < points; i++) {
    xs.push(Math.random() * (w - 300));
    ys.push(60 + Math.random() * (h - 280));
  }
  xs.push(xs[0]);
  ys.push(ys[0]);
  return {
    keyframes: { x: xs, y: ys },
    rotate: (Math.random() - 0.5) * 4,
    duration: 50 + Math.random() * 20,
  };
}

export function Projects() {
  const [paths, setPaths] = useState<CardPath[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const w = window.innerWidth;
    const h = window.innerHeight;
    setPaths(projects.map(() => generatePath(w, h)));
  }, []);

  // Auto-expand a random card every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setExpandedIndex((prev) => {
        let next: number;
        do {
          next = Math.floor(Math.random() * projects.length);
        } while (next === prev && projects.length > 1);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Collapse after 4s
  useEffect(() => {
    if (expandedIndex === null) return;
    const t = setTimeout(() => setExpandedIndex(null), 4000);
    return () => clearTimeout(t);
  }, [expandedIndex]);

  if (paths.length === 0) return null;

  return (
    <section id="projetos" className="relative w-full h-full overflow-hidden">
      <h2 className="absolute top-8 left-1/2 pt-10  -translate-x-1/2 text-3xl font-bold z-10">Projects</h2>
      {projects.map((project, i) => {
        const isOpen = expandedIndex === i || hoveredIndex === i;
        const path = paths[i];
        return (
          <motion.div
            key={project.slug}
            className="absolute z-[1]"
            animate={{
              x: path.keyframes.x,
              y: path.keyframes.y,
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ zIndex: isOpen ? 20 : 1 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="block focus-visible:outline-2 focus-visible:outline-primary rounded-lg"
              aria-label={`View project: ${project.title}`}
            >
              <motion.div
                className="rounded-lg overflow-hidden border border-border/60 bg-card/90 backdrop-blur-sm shadow-lg cursor-pointer"
                animate={{
                  width: isOpen ? 380 : 240,
                  rotate: path.rotate,
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Browser bar */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/80 border-b border-border/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-[11px] text-muted-foreground truncate">{project.title}</span>
                </div>
                {/* Image */}
                <div className="overflow-hidden" style={{ height: isOpen ? 180 : 130 }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
                {/* Expanded content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 py-3 space-y-2"
                    >
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <Badge key={t} variant="outline" className="text-[10px] px-2 py-0.5">{t}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-3 pt-1">
                        {project.githubUrl && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Code className="w-3.5 h-3.5" /> Code
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <ExternalLink className="w-3.5 h-3.5" /> Demo
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </section>
  );
}
