"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4"
    >
      <motion.h1
        className="text-4xl sm:text-6xl font-bold"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        Olá, eu sou <span className="text-primary">Seu Nome</span>
      </motion.h1>

      <motion.p
        className="mt-4 max-w-xl text-lg text-muted-foreground"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        Desenvolvedor Full Stack especializado em React &amp; Next.js
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <Button render={<a href="#projetos" />} size="lg">
          Ver Projetos
        </Button>
        <Button render={<a href="#contato" />} variant="outline" size="lg">
          Contato
        </Button>
      </motion.div>
    </section>
  );
}
