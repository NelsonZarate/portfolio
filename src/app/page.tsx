import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects/projects-section";
import { Contact } from "@/components/contact";
import { HorizontalScroll } from "@/components/layout/horizontal-scroll";

export default function Home() {
  return (
    <HorizontalScroll sectionIds={["home", "projetos", "contato"]}>
      <Hero />
      <Projects />
      <Contact />
    </HorizontalScroll>
  );
}
