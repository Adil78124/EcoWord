import type { Metadata } from "next";
import { Inter, Manrope, Geist } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "EcoWorld Kazakhstan",
  description:
    "EcoWorld объединяет людей, волонтёров и инициативы для решения экологических проблем и сохранения природы Казахстана.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={cn("light", "font-sans", geist.variable)}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} min-h-screen overflow-x-hidden bg-background text-on-surface`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
