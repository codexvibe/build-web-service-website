"use client";

import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { useTranslation } from "@/components/LanguageProvider";
import { getServicesData } from "@/lib/data";

export default function HomeClient() {
  const { t, language } = useTranslation();
  const services = getServicesData(t);



  return (
    <div className="flex flex-col">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-bg">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-brand animate-glow"></span>
            <span className="text-xs font-bold text-text-sub tracking-[0.15em] uppercase">{t("hero.badge")}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold text-text mb-8 leading-[1.1] tracking-tight animate-fade-up-delay">
            {t("hero.title")}
          </h1>
          
          <p className="max-w-2xl mx-auto text-text-sub text-lg md:text-xl mb-12 leading-relaxed font-sans animate-fade-up-delay-2">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up-delay-2">
            <Link href="/order" className="btn-brand w-full sm:w-auto justify-center">
              {t("hero.cta_quote")}
            </Link>
            <Link href="/services" className="btn-ghost w-full sm:w-auto justify-center">
              {t("hero.cta_services")}
            </Link>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-12 border-y border-border bg-surface/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border rtl:divide-x-reverse">
            {[
              { val: "100+", label: t("stats.projects") },
              { val: "100%", label: t("stats.quality") },
              { val: "<24h", label: t("stats.response") },
              { val: "DZ", label: t("stats.country") },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <span className="block text-4xl font-display font-bold text-text mb-1">{stat.val}</span>
                <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="badge mb-6">{t("services.badge")}</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-6">
                {t("services.title")}
              </h2>
              <p className="text-text-sub text-lg font-sans leading-relaxed">
                {t("services.subtitle")}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={index} 
                {...service} 
                price={service.price[language as keyof typeof service.price]} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 bg-surface/30 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-invert text-center">
            <h3 className="text-2xl font-display font-bold text-text mb-6">{t("order.trust_quality")}</h3>
            <p className="text-text-sub leading-relaxed mb-8">
              {t("order.trust_quality_desc")}
            </p>
            <h3 className="text-2xl font-display font-bold text-text mb-6">{t("order.trust_rapid")}</h3>
            <p className="text-text-sub leading-relaxed">
              {t("order.trust_rapid_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-brand/5"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-text mb-8">
            {t("cta.title")}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link href="/order" className="btn-brand">
              {t("hero.cta_quote")}
            </Link>
            <a href="https://wa.me/213555555555" className="btn-ghost bg-surface">
              {t("cta.whatsapp")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
