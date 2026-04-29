"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useTranslation } from "@/components/LanguageProvider";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  if (pathname.startsWith('/admin')) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 z-50">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 bg-brand opacity-20 blur-md rounded-full"></div>
            <div className="relative w-full h-full bg-surface border border-brand/30 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-brand font-display font-bold text-lg">P</span>
            </div>
          </div>
          <span className="text-xl font-display font-bold text-text tracking-tight">
            Pro<span className="text-brand">Services</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <div className="flex items-center gap-6 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[13px] font-bold tracking-wider uppercase transition-colors hover:text-brand ${
                  pathname === link.href ? "text-brand" : "text-text-sub"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 border-l border-border pl-5">
            {["fr", "en", "ar"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as any)}
                className={`text-[10px] font-bold uppercase w-8 h-8 rounded-lg border transition-all ${
                  language === lang 
                    ? "bg-brand border-brand text-white shadow-sm" 
                    : "border-border text-text-sub hover:border-brand/40"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-text-sub hover:text-brand transition-all shadow-sm"
          >
            {mounted && theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>

          <Link href="/order" className="btn-brand py-2 px-5 text-[12px] uppercase tracking-widest">
            {t("nav.quote")}
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-text p-2 z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`fixed inset-0 bg-bg/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 w-full max-w-xs">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-2xl font-display font-bold uppercase tracking-[0.2em] transition-colors hover:text-brand ${
                pathname === link.href ? "text-brand" : "text-text"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/order"
            className="btn-brand mt-4 text-sm px-10 py-4 w-full justify-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("nav.quote")}
          </Link>

          {/* Mobile Theme & Lang */}
          <div className="flex flex-col items-center gap-8 mt-12 pt-8 border-t border-border w-full">
            <div className="flex gap-4">
              {["fr", "en", "ar"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-xs font-bold uppercase w-12 h-12 rounded-xl border transition-all ${
                    language === lang 
                      ? "bg-brand border-brand text-white shadow-md" 
                      : "border-border text-text hover:border-brand/50"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-4 text-text font-bold uppercase tracking-widest text-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-text hover:text-brand transition-all shadow-sm">
                {mounted && theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                )}
              </div>
              {theme === "dark" ? t("theme.light") : t("theme.dark")}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
