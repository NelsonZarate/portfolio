import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects/projects-section";
import { Contact } from "@/components/contact";
import { HorizontalScroll } from "@/components/layout/horizontal-scroll";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "pt"
        ? "Nelson Zarate | Desenvolvedor Full Stack"
        : "Nelson Zarate | Full Stack Developer",
    description:
      locale === "pt"
        ? "Portfólio de Nelson Zarate — Desenvolvedor Full Stack especializado em React, Next.js, Python e Django."
        : "Nelson Zarate's portfolio — Full Stack Developer specializing in React, Next.js, Python, and Django.",
    alternates: {
      canonical: `https://nelsonzarate.dev/${locale}`,
      languages: {
        en: "https://nelsonzarate.dev/en",
        pt: "https://nelsonzarate.dev/pt",
      },
    },
  };
}

export default function Home() {
  return (
    <HorizontalScroll sectionIds={["home", "projetos", "contato"]}>
      <Hero />
      <Projects />
      <Contact />
    </HorizontalScroll>
  );
}
