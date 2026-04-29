import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "ProServices | Agence Création de Sites Web & Digital",
  description: "Agence digitale en Algérie spécialisée dans la création de sites web vitrines, e-commerce et applications sur mesure. Design premium et performance.",
  keywords: ["création site web", "agence digitale alger", "développement web", "ecommerce algerie", "seo algerie"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} antialiased`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/213555555555"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nous contacter sur WhatsApp"
          className="hover:scale-110 transition-transform duration-200 ease-out flex items-center justify-center rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.4)]"
          style={{
            position: "fixed",
            bottom: "1.75rem",
            right: "1.75rem",
            zIndex: 999,
            background: "#25D366",
            color: "#fff",
            width: "56px",
            height: "56px",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </a>
      </body>
    </html>
  );
}
