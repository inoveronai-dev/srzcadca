import type { Metadata } from "next";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import { AlertBar } from "@/components/AlertBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content/site";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.shortOrg}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Miestna organizácia Slovenského rybárskeho zväzu v Čadci – povolenia, revíry, novinky a kontakty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`${barlow.variable} ${sourceSans.variable}`}>
      <body
        style={
          {
            "--font-display": "var(--font-barlow), 'Barlow Condensed', sans-serif",
            "--font-body": "var(--font-source), 'Source Sans 3', sans-serif",
          } as React.CSSProperties
        }
      >
        <AlertBar />
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
