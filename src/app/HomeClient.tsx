"use client";

import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { useTranslation } from "@/components/LanguageProvider";
import { getServicesData } from "@/lib/data";

export default function HomeClient() {
  const { t, language } = useTranslation();
  const services = getServicesData(t);

  const testimonials = [
    {
      name: t("testimonials.t1.name"),
      role: t("testimonials.t1.role"),
      content: t("testimonials.t1.content"),
    },
    {
      name: t("testimonials.t2.name"),
      role: t("testimonials.t2.role"),
      content: t("testimonials.t2.content"),
    },
    {
      name: t("testimonials.t3.name"),
      role: t("testimonials.t3.role"),
      content: t("testimonials.t3.content"),
    },
  ];

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
            Agence de création de sites web professionnels en Algérie
          </h1>
          
          <p className="max-w-2xl mx-auto text-text-sub text-lg md:text-xl mb-12 leading-relaxed font-sans animate-fade-up-delay-2">
            Bienvenue chez <strong>ProServices</strong>, votre partenaire de confiance pour la <strong>création de site web en Algérie</strong>. Basée à <strong>Alger</strong>, notre agence accompagne les entreprises dans leur transformation digitale.
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
      <section id="services" className="section relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="badge mb-6">{t("services.badge")}</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-6">
                Pourquoi choisir ProServices pour votre projet digital à Alger ?
              </h2>
              <p className="text-text-sub text-lg font-sans leading-relaxed">
            Nous sommes experts en <strong>développement web</strong> et <strong>création de sites e-commerce en Algérie</strong>. Découvrez nos solutions adaptées à chaque besoin business.
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

      {/* --- TESTIMONIALS --- */}
      <section className="section relative bg-surface/30">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-text">{t("testimonials.title")}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, i) => (
              <div key={i} className="card p-8 flex flex-col">
                <div className="flex gap-1 text-emerald-500 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  ))}
                </div>
                <p className="text-text-sub font-sans leading-relaxed mb-8 grow italic">"{test.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-display font-bold">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-text font-bold font-display">{test.name}</h4>
                    <span className="text-[10px] text-brand uppercase tracking-wider font-bold">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SEO Content Section */}
          <div className="mt-24 max-w-4xl mx-auto prose prose-invert">
            <h3 className="text-2xl font-display font-bold text-text mb-6">Solutions web sur mesure pour entreprises algériennes</h3>
            <p className="text-text-sub leading-relaxed mb-8">
              Que vous soyez une PME ou une grande entreprise, nous concevons des sites vitrines élégants et des boutiques <strong>e-commerce en Algérie</strong> optimisées pour la conversion. Notre équipe de <strong>développeurs web à Alger</strong> met un point d'honneur à créer des expériences utilisateurs uniques, alliant design moderne et rapidité de chargement.
            </p>
            <h3 className="text-2xl font-display font-bold text-text mb-6">Expertise en E-commerce et SEO local</h3>
            <p className="text-text-sub leading-relaxed">
              En plus du développement, nous intégrons une stratégie de <strong>référencement SEO</strong> dès la conception pour garantir votre visibilité sur Google. Faites le choix de l'excellence digitale et propulsez votre business en ligne avec ProServices.
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
