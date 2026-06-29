"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import Link from "next/link";

interface FloatingProjectCardProps {
  project: Project;
  style: { x: number; y: number; rotate: number; scale: number };
}

export function FloatingProjectCard({ project, style }: FloatingProjectCardProps) {
  return (
    <motion.div
      className="absolute pointer-events-auto"
      style={{ left: style.x, top: style.y }}
      animate={{
        y: [0, -8, 0],
        rotate: [style.rotate, style.rotate + 1, style.rotate],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Link
        href={`projects/${project.slug}?demo=true`}
        aria-label={`View project: ${project.title}`}
        className="block group focus-visible:outline-2 focus-visible:outline-primary rounded-lg"
      >
        <div
          className="w-44 rounded-lg overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm opacity-40 group-hover:opacity-100 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300"
          style={{ transform: `scale(${style.scale})` }}
        >
          {/* Browser top bar */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted/80 border-b border-border/30">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="ml-2 text-[9px] text-muted-foreground truncate">{project.title}</span>
          </div>
          {/* Screenshot area */}
          <div className="h-24 bg-muted/40 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
