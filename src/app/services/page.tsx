import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";

export default function ServicesPage() {
  const allServices = [
    {
      title: "Sites Vitrines",
      description: "Présentez votre entreprise avec un site moderne et professionnel. Design unique, responsive et optimisé pour Google.",
      price: "Dès 15 000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
    },
    {
      title: "Boutiques E-commerce",
      description: "Lancez votre commerce en ligne. Gestion des stocks, paiements sécurisés et interface client intuitive.",
      price: "Dès 45 000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    },
    {
      title: "Applications Web",
      description: "Développement d'applications métiers, SaaS et plateformes complexes adaptées à vos processus internes.",
      price: "Sur Devis",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>,
    },
    {
      title: "SEO & Référencement",
      description: "Audit technique, optimisation on-page et stratégie de mots-clés pour dominer les résultats de recherche.",
      price: "Dès 10 000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    },
    {
      title: "UI/UX Design",
      description: "Conception d'interfaces modernes et ergonomiques centrées sur l'utilisateur pour une conversion maximale.",
      price: "Sur Devis",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M7 20h.01"/><path d="M17 20h.01"/><path d="M2 15h20"/><path d="M2 9h20"/><path d="M12 4v16"/></svg>,
    },
    {
      title: "Maintenance & Support",
      description: "Mises à jour de sécurité, sauvegardes régulières et assistance technique pour garantir la pérennité de votre site.",
      price: "Dès 4 000 DA",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
    },
  ];

  const pricingPacks = [
    {
      name: "PACK BASIC",
      price: "15,000 DA",
      features: ["1 à 3 pages", "Design moderne", "Version mobile"],
      tag: "CRÉATION"
    },
    {
      name: "PACK STANDARD",
      price: "25,000 DA",
      features: ["Jusqu'à 5 pages", "Design professionnel", "SEO de base"],
      tag: "PROFESSIONAL",
      popular: true
    },
    {
      name: "PACK PREMIUM",
      price: "45,000 DA",
      features: ["Site e-commerce", "Ajout de produits", "Design avancé"],
      tag: "E-COMMERCE"
    }
  ];

  const additionalOptions = [
    { name: "Admin Dashboard", price: "+10,000 DA" },
    { name: "Optimisation vitesse", price: "+5,000 DA" },
    { name: "Logo simple", price: "+3,000 DA" },
    { name: "Multilingue (AR / FR)", price: "+5,000 DA" },
    { name: "Maintenance (1 mois)", price: "+4,000 DA" }
  ];


  return (
    <div className="pt-32 pb-20 md:pt-48 md:pb-32 bg-bg min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="badge mb-6 animate-fade-up">Notre Expertise</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-6 animate-fade-up-delay leading-tight">
            Des solutions digitales <span className="text-brand">performantes.</span>
          </h1>
          <p className="text-text-sub text-lg font-sans leading-relaxed animate-fade-up-delay-2">
            Nous concevons des expériences web uniques pour aider votre entreprise à se démarquer et à croître dans l'écosystème numérique actuel.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up-delay-2">
          {allServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        {/* Pricing Packs Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <span className="badge mb-6">Nos Tarifs Web</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-6">
              Des solutions adaptées à <span className="text-brand">votre budget.</span>
            </h2>
            <p className="text-text-sub text-lg max-w-2xl mx-auto">
              Choisissez le pack qui correspond le mieux à vos besoins de développement web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPacks.map((pack, idx) => (
              <div 
                key={idx} 
                className={`card p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                  pack.popular ? 'border-brand ring-1 ring-brand/50' : 'border-border'
                }`}
              >
                {pack.popular && (
                  <div className="absolute top-0 right-0 bg-brand text-bg text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Populaire
                  </div>
                )}
                <span className="text-xs font-bold text-brand uppercase tracking-widest mb-4">{pack.tag}</span>
                <h3 className="text-2xl font-display font-bold text-text mb-2">{pack.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-text">{pack.price}</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {pack.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-text-sub font-sans">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/order" className={pack.popular ? "btn-brand w-full" : "btn-ghost border border-border w-full"}>
                  Choisir ce pack
                </Link>
              </div>
            ))}
          </div>

          {/* Additional Options */}
          <div className="mt-16 card p-8 md:p-12 border-border bg-surface/50">
            <h4 className="text-xl font-display font-bold text-text mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              Options Supplémentaires
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalOptions.map((opt, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-bg border border-border/50">
                  <span className="text-text font-medium">{opt.name}</span>
                  <span className="text-brand font-bold">{opt.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why choose us - Tech Focus */}
        <div className="mt-32">
          <div className="card p-10 md:p-16 overflow-hidden relative border-border bg-surface">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] pointer-events-none -mr-40 -mt-40"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-10">L'ADN Digitale.</h2>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="text-text font-display font-bold text-lg mb-2">Professionnels Qualifiés</h4>
                      <p className="text-text-sub font-sans leading-relaxed">Chaque intervenant est rigoureusement sélectionné, formé et certifié dans son domaine d'expertise.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <div>
                      <h4 className="text-text font-display font-bold text-lg mb-2">Fiabilité & Garantie</h4>
                      <p className="text-text-sub font-sans leading-relaxed">Toutes nos interventions sont couvertes par une garantie de satisfaction. Nous respectons nos engagements.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="text-text font-display font-bold text-lg mb-2">Rapidité d'Intervention</h4>
                      <p className="text-text-sub font-sans leading-relaxed">Un service d'urgence disponible 24/7 pour les dépannages critiques. Délais d'intervention optimisés.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group lg:ml-10">
                <div className="absolute -inset-0.5 bg-linear-to-br from-brand via-accent to-brand rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700"></div>
                <div className="relative bg-surface border border-border rounded-2xl p-6 aspect-square flex flex-col justify-center items-center text-center overflow-hidden shadow-lg">
                  <div className="relative z-10">
                    <h3 className="text-4xl font-display font-bold text-text mb-4">Prêt à lancer votre site ?</h3>
                    <p className="text-text-sub mb-8 max-w-xs mx-auto">Confiez-nous votre projet web, nos experts s'occupent du reste.</p>
                    <Link href="/order" className="btn-brand">
                      Demander un devis
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
