import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import WhatsAppButton from "@/components/WhatsAppButton";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "ProServices | Agence Création de Sites Web & Digital",
  description: "Agence digitale en Algérie spécialisée dans la création de sites web vitrines, e-commerce et applications sur mesure. Design premium et performance.",
  keywords: ["création site web", "agence digitale alger", "développement web", "ecommerce algerie", "seo algerie"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} antialiased`}>
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
