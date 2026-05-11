"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "./LanguageProvider";

const Footer = ({ dbSettings = [] }: { dbSettings?: any[] }) => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const getSetting = (key: string, fallback: string) => {
    const s = dbSettings.find(item => item.key === key);
    return s ? s.value : fallback;
  };

  const agencyName = getSetting('agency_name', 'ProServices');
  const footerDesc = getSetting('footer_desc', t("footer.description"));
  const contactPhone = getSetting('contact_phone', '+213 555 555 555');
  const contactEmail = getSetting('contact_email', 'contact@proservices.dz');
  const socialFb = getSetting('social_facebook', '#');
  const socialIg = getSetting('social_instagram', '#');
  const socialLi = getSetting('social_linkedin', '#');

  if (pathname.startsWith('/admin')) return null;
  
  return (
    <footer className="bg-bg border-t border-border pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand opacity-20 blur-md rounded-full"></div>
                <img src="/logo.png" alt="ProServices - Agence de création de sites web en Algérie" className="relative w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-display font-bold text-text tracking-tight">
                {agencyName.split(' ')[0]}<span className="text-brand">{agencyName.split(' ').slice(1).join(' ') || 'Services'}</span>
              </span>
            </Link>
            <p className="text-text-sub text-sm leading-relaxed mb-8 max-w-md">
              {footerDesc}
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-text font-display font-bold mb-6 text-sm uppercase tracking-wider">{t("footer.expertise")}</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-text-sub hover:text-brand text-sm transition-colors">{t("footer.serv_vitrine")}</Link></li>
              <li><Link href="/services" className="text-text-sub hover:text-brand text-sm transition-colors">{t("footer.serv_ecommerce")}</Link></li>
              <li><Link href="/services" className="text-text-sub hover:text-brand text-sm transition-colors">{t("footer.serv_apps")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-text font-display font-bold mb-6 text-sm uppercase tracking-wider">{t("footer.company")}</h4>
            <ul className="space-y-3">
              <li><Link href="/order" className="text-text-sub hover:text-brand text-sm transition-colors">{t("nav.quote")}</Link></li>
              <li><Link href="/contact" className="text-text-sub hover:text-brand text-sm transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <span className="text-text-sub text-sm font-mono">{contactPhone}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <span className="text-text-sub text-sm font-mono">{contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <a href={socialFb} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-text-sub hover:text-brand transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></a>
            <a href={socialIg} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-text-sub hover:text-brand transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></a>
            <a href={socialLi} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-text-sub hover:text-brand transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></a>
          </div>
          <p className="text-muted text-sm font-medium">
            © {new Date().getFullYear()} {agencyName}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
