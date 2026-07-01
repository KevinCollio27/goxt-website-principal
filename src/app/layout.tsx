import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Script from "next/script";
import { defaultOgImages } from "@/lib/metadata";

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
    images: defaultOgImages,
  },
  twitter: {
    card: "summary_large_image",
    title: "GOxT — Tecnología para operaciones que escalan",
    description: "CRM, logística e inteligencia de negocio para empresas chilenas.",
    images: ["/assets/favicon-source.png"],
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
  logo: "https://goxt.io/assets/favicon-source.png",
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
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
          }}
        />
      </body>
    </html>
  );
}
