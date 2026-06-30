import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE_URL = "https://nelsonzarate.dev";
const locales = ["en", "pt"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/tech-stack", "/about", "/contact"];

  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${page}`])
        ),
      },
    }))
  );

  const projectEntries = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/projects/${project.slug}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...projectEntries];
}
