"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale() {
    const newLocale = locale === "pt" ? "en" : "pt";
    // Replace the locale prefix in the pathname
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      className="px-2 py-1 text-xs font-medium rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
      aria-label="Switch language"
    >
      {locale === "pt" ? "EN" : "PT"}
    </button>
  );
}
