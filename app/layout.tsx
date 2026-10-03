import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.errejotabar.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: "%s | Errejota Bar"
  },
  description: site.description,
  keywords: [
    "Errejota Bar",
    "bar em Jaraguá do Sul",
    "restaurante em Jaraguá do Sul",
    "pagode Jaraguá do Sul",
    "samba Jaraguá do Sul",
    "música ao vivo Jaraguá do Sul",
    "reserva de mesa Jaraguá do Sul",
    "bar carioca Jaraguá do Sul"
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
