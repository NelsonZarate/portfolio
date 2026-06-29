"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("navigate-section", { detail: "projetos" }));
    }, 300);
  }, [router]);

  return null;
}
