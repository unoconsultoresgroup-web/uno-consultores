import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { LangProvider } from "./lib/i18n";
import CookieConsent from "./components/CookieConsent";
import GtmConsent from "./components/GtmConsent";
import Chatbot from "./components/Chatbot";
import { LANG_COOKIE, type Lang } from "./lib/detect-locale";

const SITE_URL = "https://unoconsultores.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Uno · Talento y tecnología en una sola firma",
    template: "%s · Uno Consultores",
  },
  description:
    "Uno Consultores — Firma integral de capital humano: tecnología, selección, desarrollo organizacional, legal y psicología. Tu socio estratégico de transformación.",
  keywords: [
    "capital humano",
    "recursos humanos",
    "selección de personal",
    "desarrollo organizacional",
    "psicología laboral",
    "legal laboral",
    "tecnología RRHH",
    "Córdoba",
    "Argentina",
  ],
  authors: [{ name: "Uno Consultores" }],
  alternates: { canonical: "/" },
  verification: {
    google: "yL1ismbxfrr0gZmKnN1oVdSMzUj1BktO-sI4gAB1DVA",
  },
  icons: {
    icon: "/logo-sin-fondo-ezgif.com-crop.png",
    shortcut: "/logo-sin-fondo-ezgif.com-crop.png",
    apple: "/logo-sin-fondo-ezgif.com-crop.png",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Uno Consultores",
    title: "Uno Consultores · Talento y tecnología en una sola firma",
    description:
      "Firma integral de capital humano: tecnología, selección, desarrollo organizacional, legal y psicología. Tu socio estratégico de transformación.",
    images: [
      {
        url: "/hero.jpg",
        width: 1100,
        height: 733,
        alt: "Uno Consultores · Talento y tecnología en una sola firma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uno Consultores · Talento y tecnología en una sola firma",
    description:
      "Firma integral de capital humano: tecnología, selección, desarrollo organizacional, legal y psicología.",
    images: ["/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Uno Consultores",
  description:
    "Firma integral de capital humano: tecnología, selección, desarrollo organizacional, legal y psicología.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-sin-fondo.png`,
  image: `${SITE_URL}/hero.jpg`,
  email: "unoconsultoresgroup@gmail.com",
  telephone: "+541176661157",
  sameAs: ["https://www.linkedin.com/company/mr-consultores"],
  areaServed: "AR",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AR",
  },
  knowsAbout: [
    "Recursos Humanos",
    "Desarrollo Organizacional",
    "Psicología Laboral",
    "Legal Laboral",
    "Tecnología y Automatización",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieLang = (await cookies()).get(LANG_COOKIE)?.value;
  const initialLang: Lang = cookieLang === "en" ? "en" : "es";

  return (
    <html lang={initialLang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LangProvider initialLang={initialLang}>
          {children}
          <CookieConsent />
          <GtmConsent />
          <Chatbot />
        </LangProvider>
      </body>
    </html>
  );
}
