"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { FloatingProjectCard } from "./floating-project-card";

interface CardPosition {
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

export function FloatingProjectBackground() {
  const [positions, setPositions] = useState<CardPosition[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    // Generate positions spread across viewport
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cards = projects.map((_, i) => ({
      x: (w * 0.1) + (i % 3) * (w * 0.3) + Math.random() * 80,
      y: (h * 0.1) + Math.floor(i / 3) * (h * 0.4) + Math.random() * 60,
      rotate: (Math.random() - 0.5) * 8,
      scale: 0.8 + Math.random() * 0.3,
    }));
    setPositions(cards);
  }, []);

  if (reducedMotion || positions.length === 0) return null;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {projects.map((project, i) => (
        <FloatingProjectCard
          key={project.slug}
          project={project}
          style={positions[i]}
        />
      ))}
    </div>
  );
}
