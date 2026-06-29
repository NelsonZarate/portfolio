"use client";

import { motion } from "framer-motion";
import type { Tech } from "@/data/tech-stack";

const levelColors: Record<string, string> = {
  Core: "text-primary",
  Advanced: "text-blue-400",
  Learning: "text-yellow-400",
  Tools: "text-muted-foreground",
};

export function TechCard({ tech }: { tech: Tech }) {
  const Icon = tech.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, borderColor: "var(--primary)" }}
      className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-5 space-y-3 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-center justify-between">
        <Icon className="w-8 h-8 text-foreground" />
        <span className={`text-[11px] font-medium ${levelColors[tech.level]}`}>{tech.level}</span>
      </div>
      <h3 className="font-semibold">{tech.name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
    </motion.div>
  );
}
