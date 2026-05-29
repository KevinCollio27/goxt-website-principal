import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Script from "next/script";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GOxT — Tecnología para operaciones que escalan",
    template: "%s | GOxT",
  },
  description:
    "CRM, logística e inteligencia de negocio para empresas chilenas. Gestiona clientes, flota y operaciones desde un solo lugar. Implementación en días, no meses.",
  keywords: ["CRM", "TMS", "logística", "software operacional", "Chile", "GOxT", "transportes", "gestión comercial"],
  authors: [{ name: "GOxT SpA" }],
  creator: "GOxT SpA",
  metadataBase: new URL("https://goxt.io"),
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://goxt.io",
    siteName: "GOxT",
    title: "GOxT — Tecnología para operaciones que escalan",
    description:
      "CRM, logística e inteligencia de negocio para empresas chilenas. Menos caos, más control.",
    images: [
      {
        url: "/assets/logo_goxt_blanco.png",
        width: 1200,
        height: 630,
        alt: "GOxT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GOxT — Tecnología para operaciones que escalan",
    description: "CRM, logística e inteligencia de negocio para empresas chilenas.",
    images: ["/assets/logo_goxt_blanco.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GOxT",
  url: "https://goxt.io",
  logo: "https://goxt.io/assets/logo_goxt_blanco.png",
  description: "CRM, logística e inteligencia de negocio para empresas de Latinoamérica.",
  email: "contacto@goxt.io",
  areaServed: ["Chile", "Latinoamérica"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Script
          src="https://api-crm.goxt.io/api/widget/embed.js"
          data-api-key="wk_0ac4fed868da91973c3916dfa0f4a7c4d3a9ead19b97772a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
