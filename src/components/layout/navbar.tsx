"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const links = [
  { id: "home", label: "Home" },
  { id: "projetos", label: "Projects" },
  { id: "contato", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function handleNav(id: string) {
    if (pathname === "/") {
      // On homepage: dispatch event to HorizontalScroll
      window.dispatchEvent(new CustomEvent("navigate-section", { detail: id }));
    } else {
      // On other pages: navigate to homepage then trigger section
      router.push("/");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("navigate-section", { detail: id }));
      }, 300);
    }
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-background/60 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button onClick={() => handleNav("home")} className="text-xl font-bold text-foreground">
          NZ
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => { handleNav(link.id); setOpen(false); }}
                    className="text-left text-lg text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
