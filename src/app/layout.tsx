import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nelsonzarate.dev"),
  title: {
    default: "Nelson Zarate | Full Stack Developer",
    template: "%s | Nelson Zarate",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, Python, and Django. Building scalable web applications with great user experiences.",
  keywords: [
    "Nelson Zarate",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Python",
    "Django",
    "TypeScript",
    "Web Developer",
    "Portfolio",
    "Frontend",
    "Backend",
  ],
  authors: [{ name: "Nelson Zarate", url: "https://nelsonzarate.dev" }],
  creator: "Nelson Zarate",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    alternateLocale: "en_US",
    url: "https://nelsonzarate.dev",
    siteName: "Nelson Zarate | Portfolio",
    title: "Nelson Zarate | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Python, and Django. Building scalable web applications with great user experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nelson Zarate - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nelson Zarate | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Python, and Django.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nelsonzarate.dev",
    languages: {
      "en": "https://nelsonzarate.dev/en",
      "pt": "https://nelsonzarate.dev/pt",
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const { locale } = await params;
  const lang = locale || "en";

  return (
    <html lang={lang} suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="h-screen">
        {children}
      </body>
    </html>
  );
}
