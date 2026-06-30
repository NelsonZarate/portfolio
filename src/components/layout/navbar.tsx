"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";

const linkDefs: { id: string; labelKey: string; href?: string }[] = [
  { id: "home", labelKey: "home" },
  { id: "projetos", labelKey: "projects" },
  { id: "tech-stack", labelKey: "techStack", href: "/tech-stack" },
  { id: "contato", labelKey: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  const links = linkDefs.map((l) => ({ ...l, label: t(l.labelKey) }));

  // Listen for section changes from HorizontalScroll
  useEffect(() => {
    function onSectionChange(e: Event) {
      setActiveSection((e as CustomEvent).detail);
    }
    window.addEventListener("section-changed", onSectionChange);
    return () => window.removeEventListener("section-changed", onSectionChange);
  }, []);

  function isActive(link: typeof links[number]): boolean {
    if (link.href) {
      return pathname.includes(link.href);
    }
    const isHome = /^\/[a-z]{2}\/?$/.test(pathname);
    return isHome && activeSection === link.id;
  }

  function handleNav(link: typeof links[number]) {
    if (isActive(link)) return; // Don't navigate if already active

    if (link.href) {
      router.push(link.href);
      return;
    }
    const isHome = pathname.match(/^\/[a-z]{2}\/?$/);
    if (isHome) {
      window.dispatchEvent(new CustomEvent("navigate-section", { detail: link.id }));
    } else {
      router.push("/");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("navigate-section", { detail: link.id }));
      }, 300);
    }
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-background/60 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button onClick={() => handleNav(links[0])} className="text-xl font-bold text-foreground" aria-label="Nelson Zarate - Home">
          NZ
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link)}
                disabled={active}
                aria-current={active ? "page" : undefined}
                className={`relative text-sm pb-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm ${
                  active
                    ? "text-foreground cursor-default"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open navigation menu" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64" aria-label="Navigation menu">
              <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile navigation">
                {links.map((link) => {
                  const active = isActive(link);
                  return (
                    <button
                      key={link.id}
                      onClick={() => { if (!active) { handleNav(link); setOpen(false); } }}
                      disabled={active}
                      aria-current={active ? "page" : undefined}
                      className={`text-left text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm ${
                        active
                          ? "text-foreground font-semibold border-l-2 border-primary pl-3 cursor-default"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
