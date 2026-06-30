import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "pt" ? "Sobre Mim" : "About Me",
    description:
      locale === "pt"
        ? "Saiba mais sobre Nelson Zarate — Desenvolvedor Full Stack especializado em React, Next.js, Python e Django."
        : "Learn more about Nelson Zarate — Full Stack Developer specializing in React, Next.js, Python, and Django.",
    alternates: {
      canonical: `https://nelsonzarate.dev/${locale}/about`,
      languages: {
        en: "https://nelsonzarate.dev/en/about",
        pt: "https://nelsonzarate.dev/pt/about",
      },
    },
  };
}

export default function AboutPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="text-lg text-muted-foreground">
          Full Stack Developer specializing in React, Next.js, and Python/Django.
          Passionate about building scalable web applications with great user experiences.
        </p>
      </div>
    </section>
  );
}
