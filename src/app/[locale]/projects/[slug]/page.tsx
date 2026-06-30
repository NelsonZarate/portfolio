import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectContent from "./project-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `https://nelsonzarate.dev/${locale}/projects/${slug}`,
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
    alternates: {
      canonical: `https://nelsonzarate.dev/${locale}/projects/${slug}`,
      languages: {
        en: `https://nelsonzarate.dev/en/projects/${slug}`,
        pt: `https://nelsonzarate.dev/pt/projects/${slug}`,
      },
    },
  };
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ProjectContent params={params} />;
}
