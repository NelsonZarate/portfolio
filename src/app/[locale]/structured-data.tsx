export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nelson Zarate",
    jobTitle: "Full Stack Developer",
    url: "https://nelsonzarate.dev",
    sameAs: [
      "https://github.com/NelsonZarate",
      "https://linkedin.com/in/nelsonzarate",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "Django",
      "FastAPI",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Git",
    ],
    description:
      "Full Stack Developer specializing in React, Next.js, Python, and Django. Building scalable web applications with great user experiences.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
