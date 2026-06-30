import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { NetworkBackground } from "@/components/layout/network-background";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { StructuredData } from "./structured-data";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "pt")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <StructuredData />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Skip to content
        </a>
        <NetworkBackground />
        <Navbar />
        <main id="main-content">{children}</main>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
