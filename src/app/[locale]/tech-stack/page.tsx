"use client";

import { useState } from "react";
import { technologies, categories } from "@/data/tech-stack";
import { TechStackHero } from "@/components/tech-stack/tech-stack-hero";
import { TechCategorySection } from "@/components/tech-stack/tech-category-section";
import { TechCard } from "@/components/tech-stack/tech-card";
import { FeaturedStack } from "@/components/tech-stack/featured-stack";
import { HorizontalScroll } from "@/components/layout/horizontal-scroll";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categoryDescriptions: Record<string, string> = {
  Frontend: "Interfaces rápidas, responsivas e acessíveis.",
  Backend: "APIs robustas, seguras e escaláveis.",
  Databases: "Armazenamento e gestão eficiente de dados.",
  "Tools & Deployment": "Ferramentas que aceleram o desenvolvimento e deployment.",
};

export default function TechStackPage() {
  return (
    <HorizontalScroll>
      {/* Section 1: Hero + Featured Stack */}
      <div className="w-screen h-screen flex flex-col items-center justify-center px-6">
        <TechStackHero />
        <div className="max-w-6xl w-full px-6">
          <FeaturedStack />
        </div>
      </div>

      {/* Section 2-5: Each category */}
      {categories.map((cat) => (
        <div key={cat} className="w-screen h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl w-full">
            <TechCategorySection
              title={cat}
              description={categoryDescriptions[cat]}
              techs={technologies.filter((t) => t.category === cat)}
            />
          </div>
        </div>
      ))}

      {/* Section 6: CTA */}
      <div className="w-screen h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Queres ver estas tecnologias em ação?</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Explora os meus projetos e vê como aplico esta stack em soluções reais.</p>
          <Button render={<Link href="/" />} nativeButton={false} size="lg" onClick={() => setTimeout(() => window.dispatchEvent(new CustomEvent("navigate-section", { detail: "projetos" })), 300)}>
            Ver Projetos
          </Button>
        </div>
      </div>
    </HorizontalScroll>
  );
}
