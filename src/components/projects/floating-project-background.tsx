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
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Hide entirely on very small screens (< 480px)
    if (w < 480) {
      setVisibleCount(0);
      return;
    }

    // Reduce card count on mobile (< 640px): show max 3 cards
    const count = w < 640 ? Math.min(projects.length, 3) : projects.length;
    setVisibleCount(count);

    const cards = projects.slice(0, count).map((_, i) => ({
      x: (w * 0.1) + (i % (w < 640 ? 2 : 3)) * (w * (w < 640 ? 0.4 : 0.3)) + Math.random() * (w < 640 ? 40 : 80),
      y: (h * 0.1) + Math.floor(i / (w < 640 ? 2 : 3)) * (h * 0.4) + Math.random() * (w < 640 ? 30 : 60),
      rotate: (Math.random() - 0.5) * 8,
      scale: w < 640 ? 0.6 + Math.random() * 0.2 : 0.8 + Math.random() * 0.3,
    }));
    setPositions(cards);
  }, []);

  if (reducedMotion || visibleCount === 0 || positions.length === 0) return null;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {projects.slice(0, visibleCount).map((project, i) => (
        <FloatingProjectCard
          key={project.slug}
          project={project}
          style={positions[i]}
        />
      ))}
    </div>
  );
}
