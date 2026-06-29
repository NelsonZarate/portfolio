"use client";

import { motion } from "framer-motion";
import { technologies, featuredTech } from "@/data/tech-stack";

export function FeaturedStack() {
  const featured = technologies.filter((t) => featuredTech.includes(t.name));

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-2">My Core Stack</h2>
      <p className="text-sm text-muted-foreground mb-8">A combinação principal que uso nos meus projetos.</p>
      <div className="flex flex-wrap gap-4">
        {featured.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm"
            >
              <Icon className="w-6 h-6 text-primary" />
              <span className="font-medium text-sm">{tech.name}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
