"use client";

import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";

export default function ServicesPage() {
  const { t, language } = useTranslation();

  const allServices = [
    {
      title: t("services.vitrine.title"),
      description: t("services.vitrine.desc"),
      price: language === 'ar' ? "من 15,000 دج" : "Dès 15 000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
    },
    {
      title: t("services.ecommerce.title"),
      description: t("services.ecommerce.desc"),
      price: language === 'ar' ? "من 45,000 دج" : "Dès 45 000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    },
    {
      title: t("services.apps.title"),
      description: t("services.apps.desc"),
      price: language === 'ar' ? "حسب الطلب" : "Sur Devis",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>,
    },
    {
      title: t("services.seo.title"),
      description: t("services.seo.desc"),
      price: language === 'ar' ? "من 10,000 دج" : "Dès 10 000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    },
  ];

  const pricingPacks = [
    {
      name: t("services.pack_basic"),
      price: "15,000 DA",
      features: language === 'ar' 
        ? ["من 1 إلى 3 صفحات", "تصميم عصري", "نسخة للهاتف"]
        : ["1 à 3 pages", "Design moderne", "Version mobile"],
      tag: language === 'ar' ? "تصميم" : "CRÉATION"
    },
    {
      name: t("services.pack_standard"),
      price: "25,000 DA",
      features: language === 'ar'
        ? ["حتى 5 صفحات", "تصميم احترافي", "SEO أساسي"]
        : ["Jusqu'à 5 pages", "Design professionnel", "SEO de base"],
      tag: "PROFESSIONAL",
      popular: true
    },
    {
      name: t("services.pack_premium"),
      price: "45,000 DA",
      features: language === 'ar'
        ? ["موقع تجارة إلكترونية", "إضافة منتجات", "تصميم متقدم"]
        : ["Site e-commerce", "Ajout de produits", "Design avancé"],
      tag: "E-COMMERCE"
    }
  ];

  const popularText = {
    fr: "Populaire",
    en: "Popular",
    ar: "الأكثر طلباً"
  }[language as 'fr' | 'en' | 'ar'];

  return (
    <div className="pt-32 pb-20 md:pt-48 md:pb-32 bg-bg min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="badge mb-6">{t("services.badge")}</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-6 leading-tight">
            {t("services.title")}
          </h1>
          <p className="text-text-sub text-lg font-sans leading-relaxed">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        {/* Pricing Packs Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-6">
              {t("services.pricing_title")}
            </h2>
            <p className="text-text-sub text-lg max-w-2xl mx-auto">
              {t("services.pricing_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPacks.map((pack, idx) => (
              <div 
                key={idx} 
                className={`card p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                  pack.popular ? 'border-brand ring-1 ring-brand/50 shadow-xl shadow-brand/10' : 'border-border'
                }`}
              >
                {pack.popular && (
                  <div className="absolute top-0 right-0 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    {popularText}
                  </div>
                )}
                <span className="text-xs font-bold text-brand uppercase tracking-widest mb-4">{pack.tag}</span>
                <h3 className="text-2xl font-display font-bold text-text mb-2">{pack.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-text">{pack.price}</span>
                </div>
                <ul className="space-y-4 mb-10 grow">
                  {pack.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-text-sub font-sans text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/order" className={pack.popular ? "btn-brand w-full" : "btn-ghost border border-border w-full"}>
                  {t("services.cta_order")}
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
