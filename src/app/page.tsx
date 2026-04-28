import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  const services = [
    {
      title: "E-commerce",
      description: "Boutique en ligne complète, optimisée pour la conversion, avec paiements locaux et internationaux intégrés.",
      price: "120,000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
    },
    {
      title: "Site Vitrine",
      description: "Design sur-mesure pour présenter votre activité, attirer de nouveaux clients et asseoir votre crédibilité en ligne.",
      price: "45,000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
    },
    {
      title: "Blog & Magazine",
      description: "Plateforme de contenu rapide et optimisée SEO, avec un back-office intuitif pour gérer vos publications.",
      price: "35,000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
    },
    {
      title: "Application Web",
      description: "Développement d'outils métiers, SaaS ou portails clients complexes, conçus selon vos besoins spécifiques.",
      price: "Sur Devis",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
    },
  ];

  const testimonials = [
    {
      name: "Ahmed Benali",
      role: "CEO, TechShop DZ",
      content: "Une agence qui comprend les enjeux business. Notre nouveau site e-commerce a fait exploser nos ventes de 40% en deux mois.",
    },
    {
      name: "Sonia Mansouri",
      role: "Architecte d'intérieur",
      content: "Le design de mon portfolio est tout simplement parfait. Il reflète exactement le positionnement haut de gamme que je recherchais.",
    },
    {
      name: "Karim Ziani",
      role: "Fondateur, Startup Pulse",
      content: "Équipe réactive, code propre et respect des délais. Une perle rare dans le domaine du développement web en Algérie.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden noise">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-brand animate-glow"></span>
            <span className="text-xs font-bold text-gray-300 tracking-[0.15em] uppercase">Agence Digitale Next-Gen</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold text-white mb-8 leading-[1.1] tracking-tight animate-fade-up-delay">
            Construisons le futur <br className="hidden md:block" />
            de votre <span className="text-brand-gradient">business.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-12 leading-relaxed font-sans animate-fade-up-delay-2">
            Nous concevons des expériences web performantes, esthétiques et évolutives. De la vitrine élégante à l'application métier complexe.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up-delay-2">
            <Link href="/order" className="btn-brand w-full sm:w-auto justify-center">
              Démarrer un projet
            </Link>
            <Link href="/portfolio" className="btn-ghost w-full sm:w-auto justify-center">
              Explorer nos travaux
            </Link>
          </div>
        </div>
      </section>

      {/* --- STATS LOGOS SECTION --- */}
      <section className="py-12 border-y border-white/5 bg-white/2">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            <div className="text-center px-4">
              <span className="block text-4xl font-display font-bold text-white mb-1">150+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Projets Livrés</span>
            </div>
            <div className="text-center px-4">
              <span className="block text-4xl font-display font-bold text-white mb-1">98%</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Clients Satisfaits</span>
            </div>
            <div className="text-center px-4">
              <span className="block text-4xl font-display font-bold text-white mb-1">&lt;1s</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Temps de charge</span>
            </div>
            <div className="text-center px-4">
              <span className="block text-4xl font-display font-bold text-white mb-1">24/7</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Support Technique</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="section relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="badge mb-6">Expertises</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Solutions sur-mesure.
              </h2>
              <p className="text-gray-400 text-lg font-sans">
                Nous maîtrisons les technologies les plus récentes pour vous offrir des solutions robustes, sécurisées et adaptées à vos ambitions.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO HIGHLIGHT --- */}
      <section className="section bg-surface border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <span className="badge mb-6">Portfolio</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Études de cas.</h2>
            </div>
            <Link href="/portfolio" className="text-brand font-bold text-sm tracking-wide uppercase flex items-center gap-2 hover:gap-3 transition-all">
              Voir tout le portfolio
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-4xl aspect-4/3 card border-0">
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10"></div>
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-brand/10 group-hover:scale-105 transition-transform duration-700"></div>
              
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-wider">E-COMMERCE</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-wider">NEXT.JS</span>
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Elite Sneaker Store</h3>
                <p className="text-gray-300 font-sans text-sm max-w-md line-clamp-2">Refonte complète de l'expérience d'achat avec un focus sur la performance mobile et l'intégration de paiements locaux.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-4xl aspect-4/3 card border-0">
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10"></div>
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-accent/10 group-hover:scale-105 transition-transform duration-700"></div>
              
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-wider">SITE VITRINE</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-wider">ANIMATIONS 3D</span>
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Nova Arch Studio</h3>
                <p className="text-gray-300 font-sans text-sm max-w-md line-clamp-2">Création d'un portfolio immersif pour un cabinet d'architecture, intégrant des rendus 3D interactifs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="section relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="badge mb-6">Témoignages</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white">Ils nous font confiance.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-8 flex flex-col">
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  ))}
                </div>
                <p className="text-gray-300 font-sans leading-relaxed mb-8 grow">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-display font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-display">{t.name}</h4>
                    <span className="text-xs text-brand uppercase tracking-wider font-bold">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-brand/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[2px] bg-linear-to-r from-transparent via-brand to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
            Prêt à faire décoller <br className="hidden md:block"/>votre projet ?
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 font-sans text-lg mb-12">
            Discutons de vos objectifs et trouvons la solution technique idéale pour les atteindre. Devis gratuit en 24h.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link href="/order" className="btn-brand">
              Demander un devis
            </Link>
            <a href="https://wa.me/213555555555" className="btn-ghost">
              Discuter sur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
