import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import WhatsAppButton from "@/components/WhatsAppButton";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const ibmPlexArabic = IBM_Plex_Sans_Arabic({ 
  subsets: ["arabic"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic" 
});

export const metadata: Metadata = {
  title: "ProServices | Agence Création de Sites Web & Digital",
  description: "Agence digitale en Algérie spécialisée dans la création de sites web vitrines, e-commerce et applications sur mesure. Design premium et performance.",
  keywords: ["création site web", "agence digitale alger", "développement web", "ecommerce algerie", "seo algerie"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
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
      </head>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} ${ibmPlexArabic.variable} antialiased`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </LanguageProvider>

        <WhatsAppButton />
      </body>
    </html>
  );
}
