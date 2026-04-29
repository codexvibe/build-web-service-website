import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  const services = [
    {
      title: "Création de Sites Web",
      description: "Sites vitrines, e-commerce et applications sur mesure. Design premium et performance.",
      price: "Dès 15 000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
    },
    {
      title: "Nettoyage Professionnel",
      description: "Des espaces impeccables pour vos bureaux ou votre domicile. Entretien régulier ou intervention ponctuelle.",
      price: "Sur Devis",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>,
    },
    {
      title: "Plomberie & Chauffage",
      description: "Installation, réparation et dépannage d'urgence par des plombiers certifiés. Service rapide et garanti.",
      price: "Dès 3000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    },
    {
      title: "Consulting IT",
      description: "Optimisation de votre infrastructure, sécurité réseau et conseils en transformation digitale.",
      price: "Sur Devis",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
    },
  ];

  const testimonials = [
    {
      name: "Ahmed Benali",
      role: "Gérant d'Entreprise",
      content: "Une équipe très professionnelle. L'intervention a été rapide et le résultat est impeccable. Je recommande vivement leurs services.",
    },
    {
      name: "Sonia Mansouri",
      role: "Particulier",
      content: "Service parfait de bout en bout. Ils ont été ponctuels, efficaces, et les tarifs sont transparents. Rien à redire !",
    },
    {
      name: "Karim Ziani",
      role: "Directeur Opérationnel",
      content: "Réactivité et professionnalisme sont les maîtres mots. Nous avons externalisé plusieurs services chez eux avec une grande satisfaction.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-bg">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-brand animate-glow"></span>
            <span className="text-xs font-bold text-text-sub tracking-[0.15em] uppercase">Services Professionnels</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold text-text mb-8 leading-[1.1] tracking-tight animate-fade-up-delay">
            Des experts <span className="text-brand">à votre service</span> <br className="hidden md:block" />
            pour tous vos besoins.
          </h1>
          
          <p className="max-w-2xl mx-auto text-text-sub text-lg md:text-xl mb-12 leading-relaxed font-sans animate-fade-up-delay-2">
            Nous mettons à votre disposition une équipe de professionnels qualifiés pour répondre à vos exigences de manière rapide, efficace et garantie.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up-delay-2">
            <Link href="/order" className="btn-brand w-full sm:w-auto justify-center">
              Demander un devis
            </Link>
            <Link href="/services" className="btn-ghost w-full sm:w-auto justify-center">
              Découvrir nos services
            </Link>
          </div>
        </div>
      </section>

      {/* --- STATS LOGOS SECTION --- */}
      <section className="py-12 border-y border-border bg-surface/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            <div className="text-center px-4">
              <span className="block text-4xl font-display font-bold text-text mb-1">500+</span>
              <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">Interventions</span>
            </div>
            <div className="text-center px-4">
              <span className="block text-4xl font-display font-bold text-text mb-1">99%</span>
              <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">Clients Satisfaits</span>
            </div>
            <div className="text-center px-4">
              <span className="block text-4xl font-display font-bold text-text mb-1">&lt;2h</span>
              <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">Temps de réponse</span>
            </div>
            <div className="text-center px-4">
              <span className="block text-4xl font-display font-bold text-text mb-1">24/7</span>
              <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">Assistance</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="section relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="badge mb-6">Nos Prestations</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-6">
                Des solutions sur-mesure.
              </h2>
              <p className="text-text-sub text-lg font-sans">
                Que ce soit pour l'entretien, l'installation ou le conseil, nous avons l'expertise nécessaire pour vous accompagner.
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

      {/* --- WEB PACKS PREVIEW --- */}
      <section className="py-24 bg-surface/30 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="badge mb-6">Offres Digitales</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-6">Packs Création Web</h2>
            <p className="text-text-sub text-lg max-w-2xl mx-auto">Boostez votre business avec un site web professionnel.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "BASIC", price: "15,000 DA", tag: "1-3 Pages" },
              { name: "STANDARD", price: "25,000 DA", tag: "Jusqu'à 5 Pages", popular: true },
              { name: "PREMIUM", price: "45,000 DA", tag: "E-Commerce" }
            ].map((pack, idx) => (
              <div key={idx} className={`card p-8 flex flex-col border-border hover:border-brand/50 transition-all ${pack.popular ? 'ring-1 ring-brand/30' : ''}`}>
                <h3 className="text-xl font-display font-bold text-text mb-2">PACK {pack.name}</h3>
                <span className="text-brand font-bold text-2xl mb-4">{pack.price}</span>
                <span className="text-text-sub text-sm mb-6 uppercase tracking-wider font-bold">{pack.tag}</span>
                <Link href="/services" className="btn-ghost border border-border text-center justify-center py-3 text-xs">
                  Détails du pack
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO HIGHLIGHT --- */}
      <section className="section bg-surface border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <span className="badge mb-6">Réalisations</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-4">Notre savoir-faire.</h2>
            </div>
            <Link href="/portfolio" className="text-brand font-bold text-sm tracking-wide uppercase flex items-center gap-2 hover:gap-3 transition-all">
              Voir la galerie
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-4xl aspect-4/3 card border-border">
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent z-10"></div>
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-brand/10 group-hover:scale-105 transition-transform duration-700"></div>
              
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider">NETTOYAGE</span>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider">ENTREPRISE</span>
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Locaux Commerciaux</h3>
                <p className="text-gray-200 font-sans text-sm max-w-md line-clamp-2">Intervention complète de nettoyage industriel pour des espaces professionnels de 2000m².</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-4xl aspect-4/3 card border-border">
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent z-10"></div>
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-emerald-500/10 group-hover:scale-105 transition-transform duration-700"></div>
              
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider">PLOMBERIE</span>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider">URGENCE</span>
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Rénovation Réseau</h3>
                <p className="text-gray-200 font-sans text-sm max-w-md line-clamp-2">Remplacement d'urgence de la tuyauterie principale d'un immeuble résidentiel en moins de 24h.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="section relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="badge mb-6">Avis Clients</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-text">Ils nous recommandent.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-8 flex flex-col">
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  ))}
                </div>
                <p className="text-text-sub font-sans leading-relaxed mb-8 grow">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-text font-display font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-text font-bold font-display">{t.name}</h4>
                    <span className="text-xs text-brand uppercase tracking-wider font-bold">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-brand/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[2px] bg-linear-to-r from-transparent via-brand to-transparent opacity-30"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-text mb-8">
            Besoin d'une <br className="hidden md:block"/>intervention rapide ?
          </h2>
          <p className="max-w-xl mx-auto text-text-sub font-sans text-lg mb-12">
            Contactez-nous dès aujourd'hui pour obtenir un devis gratuit et personnalisé. Nos équipes sont prêtes à agir.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link href="/order" className="btn-brand">
              Demander un devis
            </Link>
            <a href="https://wa.me/213555555555" className="btn-ghost bg-surface">
              Discuter sur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
