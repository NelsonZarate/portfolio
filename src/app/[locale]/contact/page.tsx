import type { Metadata } from "next";
import { Contact } from "@/components/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "pt" ? "Contacto" : "Contact",
    description:
      locale === "pt"
        ? "Entre em contacto com Nelson Zarate para oportunidades de trabalho, colaborações ou projetos freelance."
        : "Get in touch with Nelson Zarate for job opportunities, collaborations, or freelance projects.",
    alternates: {
      canonical: `https://nelsonzarate.dev/${locale}/contact`,
      languages: {
        en: "https://nelsonzarate.dev/en/contact",
        pt: "https://nelsonzarate.dev/pt/contact",
      },
    },
  };
}

export default function ContactPage() {
  return <Contact />;
}
