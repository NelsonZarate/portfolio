"use client";

import type { Tech } from "@/data/tech-stack";
import { TechCard } from "./tech-card";

interface Props {
  title: string;
  description: string;
  techs: Tech[];
}

export function TechCategorySection({ title, description, techs }: Props) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {techs.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  );
}
