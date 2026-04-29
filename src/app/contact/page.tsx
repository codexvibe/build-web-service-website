"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-20 md:pt-48 md:pb-32 bg-bg min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="badge mb-6">{t("contact.badge")}</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-6 leading-tight">
            {t("contact.title")}
          </h1>
          <p className="text-text-sub text-lg font-sans leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="card p-8 bg-surface border-border hover:border-brand/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <h4 className="text-text font-display font-bold mb-2">{t("contact.info_phone")}</h4>
              <p className="text-text-sub font-mono text-sm mb-1">+213 555 555 555</p>
            </div>

            <div className="card p-8 bg-surface border-border hover:border-brand/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <h4 className="text-text font-display font-bold mb-2">{t("contact.info_email")}</h4>
              <p className="text-text-sub font-mono text-sm mb-1">contact@proservices.dz</p>
            </div>

            <div className="card p-8 bg-surface border-border hover:border-brand/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <h4 className="text-text font-display font-bold mb-2">{t("contact.info_location")}</h4>
              <p className="text-text-sub font-sans text-sm mb-1">Alger, Algérie</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 card p-8 md:p-12 relative overflow-hidden bg-surface border-border">
            <h3 className="text-2xl font-display font-bold text-text mb-8 relative z-10">{t("contact.form_send")}</h3>
            
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-sub uppercase tracking-wider">{t("order.form_name")}</label>
                  <input type="text" className="input" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-sub uppercase tracking-wider">{t("contact.info_email")}</label>
                  <input type="email" className="input" placeholder="john@entreprise.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-sub uppercase tracking-wider">{t("contact.form_subject")}</label>
                <input type="text" className="input" placeholder="..." />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-sub uppercase tracking-wider">{t("contact.form_message")}</label>
                <textarea rows={6} className="input resize-none" placeholder="..." />
              </div>
              <div className="pt-4">
                <button type="submit" className="btn-brand w-full md:w-auto px-10">
                  {t("contact.form_send")}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
