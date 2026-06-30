"use client";

import { motion } from "framer-motion";

export function TechStackHero() {
  return (
    <section className="relative pt-20 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6 text-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl space-y-2 sm:space-y-4"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Tech Stack</h1>
        <p className="text-sm sm:text-lg text-muted-foreground">
          As tecnologias que uso para criar aplicações modernas, rápidas e escaláveis.
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg mx-auto">
          Frontend com React & Next.js, backend com Django & Node.js, bases de dados SQL e NoSQL, e ferramentas modernas de deployment.
        </p>
      </motion.div>
    </section>
  );
}
