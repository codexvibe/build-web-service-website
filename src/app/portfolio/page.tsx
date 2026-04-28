import Link from "next/link";

export default function PortfolioPage() {
  const projects = [
    {
      title: "Elite Sneaker Store",
      category: "E-commerce",
      tech: ["Next.js", "Tailwind", "Supabase", "Stripe"],
      image: "/projects/p1.jpg",
      description: "Refonte complète de la boutique en ligne. Architecture headless pour des performances fulgurantes et intégration de paiement sécurisé.",
    },
    {
      title: "Nova Arch Studio",
      category: "Site Vitrine",
      tech: ["React", "Three.js", "Framer Motion"],
      image: "/projects/p2.jpg",
      description: "Portfolio immersif pour un cabinet d'architecture. Navigation WebGL fluide et intégration de modèles 3D interactifs.",
    },
    {
      title: "Z-Pulse Dashboard",
      category: "Application Web",
      tech: ["Next.js", "PostgreSQL", "Prisma"],
      image: "/projects/p3.jpg",
      description: "Interface d'administration sur-mesure pour une startup logistique. Visualisation de données en temps réel et gestion des tournées.",
    },
    {
      title: "Gastronomy Hub",
      category: "Blog / CMS",
      tech: ["Sanity CMS", "Next.js", "Vercel"],
      image: "/projects/p4.jpg",
      description: "Plateforme de publication de recettes avec système de filtrage complexe et espace membre personnalisé.",
    },
    {
      title: "Fitness Pro DZ",
      category: "Site Vitrine",
      tech: ["HTML5", "CSS3", "JavaScript"],
      image: "/projects/p5.jpg",
      description: "Landing page haute conversion pour une chaîne de salles de sport. Intégration de calendrier de réservation.",
    },
    {
      title: "Beauty Glow",
      category: "E-commerce Local",
      tech: ["WooCommerce", "PHP", "BaridiMob API"],
      image: "/projects/p6.jpg",
      description: "Développement d'un module de paiement spécifique pour intégrer BaridiMob à une boutique de cosmétiques locale.",
    },
  ];

  return (
    <div className="pt-32 pb-20 md:pt-48 md:pb-32 noise min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="badge mb-6 animate-fade-up">Portfolio</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 animate-fade-up-delay leading-tight">
            Code en action.
          </h1>
          <p className="text-gray-400 text-lg font-sans leading-relaxed animate-fade-up-delay-2">
            Découvrez comment nous avons transformé les défis techniques de nos clients en solutions digitales élégantes et performantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up-delay-2">
          {projects.map((project, index) => (
            <div key={index} className="group card overflow-hidden border-0 bg-white/2">
              {/* Image Container */}
              <div className="aspect-4/3 bg-[#0a0a0f] relative overflow-hidden">
                <div className="absolute inset-0 bg-brand/10 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent opacity-90 z-10"></div>
                
                {/* Tech Stack Pills */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-md text-[10px] font-bold text-gray-300 tracking-wider uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 relative z-20 -mt-12">
                <span className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-2 block drop-shadow-md">
                  {project.category}
                </span>
                <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-brand transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm font-sans leading-relaxed mb-8 h-20">
                  {project.description}
                </p>
                <div className="pt-6 border-t border-white/5">
                  <button className="text-white text-sm font-display font-bold flex items-center gap-2 group/btn hover:text-brand transition-colors">
                    Détails Techniques
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-32 text-center card p-16 max-w-4xl mx-auto relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand/5 blur-[80px] pointer-events-none"></div>
          <h2 className="text-3xl font-display font-bold text-white mb-6 relative z-10">Un projet similaire en tête ?</h2>
          <p className="text-gray-400 mb-10 font-sans relative z-10">Discutons de la stack technique idéale pour votre produit.</p>
          <div className="relative z-10">
            <Link href="/order" className="btn-brand">
              Démarrer le brief technique
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
