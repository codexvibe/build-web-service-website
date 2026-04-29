"use client";

import OrderForm from "@/components/OrderForm";
import { useTranslation } from "@/components/LanguageProvider";

export default function OrderPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-32 bg-bg min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-brand to-transparent opacity-30"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="badge mb-6 animate-fade-up">{t("order.badge")}</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-6 animate-fade-up-delay leading-tight">
              {t("order.title")}
            </h1>
            <p className="text-text-sub text-lg leading-relaxed max-w-2xl mx-auto font-sans animate-fade-up-delay-2">
              {t("order.subtitle")}
            </p>
          </div>
          
          <div className="animate-fade-up-delay-2">
            <OrderForm />
          </div>
          
          {/* Trust indicators */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up-delay-2">
            <div className="card p-6 text-center bg-surface border-border shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-brand mx-auto mb-4 border border-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <h3 className="text-text font-display font-bold mb-2">{t("order.trust_rapid")}</h3>
              <p className="text-muted font-sans text-sm">{t("order.trust_rapid_desc")}</p>
            </div>
            
            <div className="card p-6 text-center bg-surface border-border shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-brand mx-auto mb-4 border border-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h3 className="text-text font-display font-bold mb-2">{t("order.trust_secure")}</h3>
              <p className="text-muted font-sans text-sm">{t("order.trust_secure_desc")}</p>
            </div>
            
            <div className="card p-6 text-center bg-surface border-border shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-brand mx-auto mb-4 border border-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="text-text font-display font-bold mb-2">{t("order.trust_quality")}</h3>
              <p className="text-muted font-sans text-sm">{t("order.trust_quality_desc")}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
