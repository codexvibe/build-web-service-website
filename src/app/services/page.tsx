import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";

export default function ServicesPage() {
  const allServices = [
    {
      title: "E-commerce Premium",
      description: "Solution complète de vente en ligne. Tunnel d'achat optimisé, gestion de stock avancée, intégration paiements locaux (BaridiMob, CIB) et internationaux (Stripe, PayPal).",
      price: "120,000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
    },
    {
      title: "Site Vitrine Corporate",
      description: "Design immersif et professionnel pour asseoir votre crédibilité. Inclus : Animations fluides, SEO On-Page, intégration CRM et formulaire de contact avancé.",
      price: "45,000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
    },
    {
      title: "Plateforme Contenu / Blog",
      description: "Architecture optimisée pour la lecture et le référencement naturel. Back-office sur-mesure pour une gestion éditoriale simplifiée et performante.",
      price: "35,000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
    },
    {
      title: "Application Web / SaaS",
      description: "Développement d'outils métiers complexes : ERP légers, portails B2B, dashboard analytique. Stack technique moderne (Next.js, Node, Supabase).",
      price: "Sur Devis",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
    },
    {
      title: "SEO & Web Performance",
      description: "Audit technique, optimisation des Core Web Vitals, stratégie de mots-clés et netlinking pour propulser votre site en tête des résultats Google.",
      price: "25,000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
    },
    {
      title: "Maintenance Évolutive",
      description: "Mises à jour de sécurité, monitoring 24/7, sauvegardes automatisées et forfait d'heures pour des évolutions fonctionnelles continues.",
      price: "5,000 DA/mois",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>,
    },
  ];

  return (
    <div className="pt-32 pb-20 md:pt-48 md:pb-32 noise min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="badge mb-6 animate-fade-up">Notre Offre</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 animate-fade-up-delay leading-tight">
            Des solutions <span className="text-brand-gradient">techniques</span> d'excellence.
          </h1>
          <p className="text-gray-400 text-lg font-sans leading-relaxed animate-fade-up-delay-2">
            Nous concevons des produits digitaux performants, sécurisés et scalables. Chaque ligne de code est pensée pour maximiser votre impact business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up-delay-2">
          {allServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        {/* Why choose us - Tech Focus */}
        <div className="mt-32">
          <div className="card p-10 md:p-16 overflow-hidden relative border-0 bg-white/2">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 blur-[120px] pointer-events-none -mr-40 -mt-40"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-10">L'ADN WebCraft.</h2>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="text-white font-display font-bold text-lg mb-2">Code Clean & Moderne</h4>
                      <p className="text-gray-400 font-sans leading-relaxed">Architecture robuste basée sur Next.js, React et Tailwind. Performances optimales et maintenabilité garantie.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <div>
                      <h4 className="text-white font-display font-bold text-lg mb-2">Sécurité par Défaut</h4>
                      <p className="text-gray-400 font-sans leading-relaxed">Protection contre les vulnérabilités courantes (XSS, CSRF). Intégration sécurisée des APIs et bases de données.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                    </div>
                    <div>
                      <h4 className="text-white font-display font-bold text-lg mb-2">Vitesse Éclair</h4>
                      <p className="text-gray-400 font-sans leading-relaxed">Optimisation agressive des images, server-side rendering, et CDN global pour des temps de charge ultra-rapides.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group lg:ml-10">
                <div className="absolute -inset-0.5 bg-linear-to-br from-brand via-accent to-brand rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700"></div>
                <div className="relative bg-card border border-white/10 rounded-2xl p-6 aspect-square flex flex-col justify-center items-center text-center overflow-hidden">
                  <div className="absolute inset-0 noise"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-display font-bold text-white mb-4">Prêt à coder ?</h3>
                    <p className="text-gray-400 mb-8 max-w-xs mx-auto">Confiez-nous votre projet technique.</p>
                    <Link href="/order" className="btn-brand">
                      Lancer le projet
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
