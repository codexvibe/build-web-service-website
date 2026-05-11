import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, IBM_Plex_Sans_Arabic, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { createClient } from "@/utils/supabase/server";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const ibmPlexArabic = IBM_Plex_Sans_Arabic({ 
  subsets: ["arabic"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic" 
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://build-web-service-website.vercel.app'),
  verification: {
    google: "tDci3rmROB-uxHjgeMrBauYgkM36MnEITANB3RURH7s",
  },
  title: {
    default: "Création Site Web Algérie | Agence Web ProServices Alger",
    template: "%s | ProServices Algérie"
  },
  description: "Expert en création de sites web en Algérie. Sites vitrines, e-commerce & SEO à Alger. Boostez votre visibilité avec ProServices. Devis gratuit !",
  keywords: ["création site web Algérie", "site e-commerce Algérie", "développeur web Algérie", "agence web Alger", "SEO Algérie", "digital marketing DZ"],
  authors: [{ name: "ProServices" }],
  robots: "index, follow",
  openGraph: {
    title: "ProServices | Agence Web Algérie",
    description: "Création de sites web professionnels et e-commerce en Algérie. Performance et design premium.",
    url: 'https://proservices.dz',
    siteName: 'ProServices Algérie',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ProServices Algérie - Agence Web'
      },
    ],
    locale: 'fr_DZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProServices | Agence Web Algérie',
    description: 'Expert en création de sites web et SEO en Algérie.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ProServices",
  "image": "https://proservices.dz/logo.png",
  "url": "https://proservices.dz",
  "telephone": "+213555555555",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Centre Ville",
    "addressLocality": "Alger",
    "addressCountry": "DZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.7525,
    "longitude": 3.0420
  },
  "areaServed": {
    "@type": "Country",
    "name": "Algeria"
  },
  "service": [
    {
      "@type": "Service",
      "name": "Création site web vitrine",
      "description": "Conception de sites web professionnels pour entreprises en Algérie."
    },
    {
      "@type": "Service",
      "name": "Développement E-commerce",
      "description": "Création de boutiques en ligne avec paiement et gestion de stock."
    }
  ]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let brandLight = "#3b82f6"; // default light mode color (blue)
  let brandDark = "#ffffff";  // default dark mode color (white)

  let allSettings: any[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase.from('agency_settings').select('*');
    
    if (data) {
      allSettings = data;
      const lightSetting = data.find(s => s.key === 'brand_color_light');
      const darkSetting = data.find(s => s.key === 'brand_color_dark');
      
      if (lightSetting?.value) brandLight = lightSetting.value;
      if (darkSetting?.value) brandDark = darkSetting.value;
    }
  } catch (error) {
    console.error("Failed to fetch settings", error);
  }

  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning style={{ '--brand-light': brandLight, '--brand-dark': brandDark } as React.CSSProperties}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme') || 'dark';
              document.documentElement.classList.add(theme);
              var lang = localStorage.getItem('language') || 'fr';
              document.documentElement.lang = lang;
              document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            } catch (e) {}
          })();
        ` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} ${outfit.variable} ${ibmPlexArabic.variable} antialiased`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Header dbSettings={allSettings} />
            {children}
            <Footer dbSettings={allSettings} />
          </ThemeProvider>
        </LanguageProvider>

        <WhatsAppButton />
      </body>
    </html>
  );
}
