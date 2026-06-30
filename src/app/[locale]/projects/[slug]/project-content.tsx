"use client";

import { use, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectModal } from "@/components/projects/project-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Play, Code } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProjectContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const project = projects.find((p) => p.slug === slug);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (searchParams?.get("demo") === "true") {
      setModalOpen(true);
    }
  }, [searchParams]);

  if (!project) notFound();

  return (
    <div className="min-h-screen pt-15 px-6 overflow-y-auto">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-8">
          <Badge variant="secondary">{project.category}</Badge>
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.description}</p>
        </div>

        {/* Tech */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <Badge key={t} variant="outline">{t}</Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Button onClick={() => setModalOpen(true)} className="gap-2">
            <Play className="w-4 h-4" />
            View Demo
          </Button>
          <Button
            render={<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
            variant="outline"
            className="gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Open Full Website
          </Button>
          {project.githubUrl && (
            <Button
              render={<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              variant="outline"
              className="gap-2"
            >
              <Code className="w-4 h-4" />
              View Code
            </Button>
          )}
        </div>

        {/* Screenshot */}
        <div className="rounded-xl overflow-hidden border border-border bg-muted/30 aspect-video">
          <img
            src={project.image}
            onClick={() => setModalOpen(true)}
            alt={`Screenshot of ${project.title}`}
            className="w-full h-full object-cover cursor-pointer"
          />
        </div>
      </div>

      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={project.title}
        demoUrl={project.demoUrl}
      />
    </div>
  );
}
