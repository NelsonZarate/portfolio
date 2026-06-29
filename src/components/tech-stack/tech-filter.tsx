"use client";

import type { TechCategory } from "@/data/tech-stack";

interface Props {
  active: string;
  onChange: (cat: string) => void;
}

const filters = ["All", "Frontend", "Backend", "Databases", "Tools & Deployment"];

export function TechFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            active === f
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
