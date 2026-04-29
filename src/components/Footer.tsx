import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-bg border-t border-border pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand opacity-20 blur-md rounded-full"></div>
                <div className="relative w-full h-full bg-surface border border-brand/50 rounded-xl flex items-center justify-center">
                  <span className="text-brand font-display font-bold text-xl">P</span>
                </div>
              </div>
              <span className="text-2xl font-display font-bold text-text tracking-tight">
                Pro<span className="text-brand">Services</span>
              </span>
            </Link>
            <p className="text-text-sub text-sm leading-relaxed mb-8 max-w-md">
              Agence digitale spécialisée dans la création de sites web haute performance, le design UX/UI et le référencement pour propulser votre business.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-sub hover:bg-brand/10 hover:border-brand/30 hover:text-brand transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-sub hover:bg-brand/10 hover:border-brand/30 hover:text-brand transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-sub hover:bg-brand/10 hover:border-brand/30 hover:text-brand transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-text font-display font-bold mb-6 text-sm uppercase tracking-wider">Expertise</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-text-sub hover:text-brand text-sm transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand/50"></span>Site Vitrine</Link></li>
              <li><Link href="/services" className="text-text-sub hover:text-brand text-sm transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand/50"></span>E-commerce</Link></li>
              <li><Link href="/services" className="text-text-sub hover:text-brand text-sm transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand/50"></span>App Web / SaaS</Link></li>
              <li><Link href="/services" className="text-text-sub hover:text-brand text-sm transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand/50"></span>SEO & Digital</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-text font-display font-bold mb-6 text-sm uppercase tracking-wider">Entreprise</h4>
            <ul className="space-y-3">
              <li><Link href="/portfolio" className="text-text-sub hover:text-brand text-sm transition-colors">Réalisations</Link></li>
              <li><Link href="/order" className="text-text-sub hover:text-brand text-sm transition-colors">Demander un devis</Link></li>
              <li><Link href="/contact" className="text-text-sub hover:text-brand text-sm transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-text-sub hover:text-brand text-sm transition-colors">Mentions légales</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-text font-display font-bold mb-6 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <span className="block text-text-sub text-sm font-mono">+213 555 555 555</span>
                  <span className="block text-muted text-xs mt-1">Lun-Jeu, 9h-18h</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <span className="text-text-sub text-sm">contact@proservices.dz</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm font-medium">
            © {new Date().getFullYear()} ProServices. <span className="hidden md:inline">Tous droits réservés.</span>
          </p>
          <div className="flex items-center gap-2 text-muted text-sm font-medium">
            <span>Designed in</span>
            <span className="text-text">Algeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
