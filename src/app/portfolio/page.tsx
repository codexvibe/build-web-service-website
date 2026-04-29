import Link from "next/link";

export default function PortfolioPage() {
  const projects = [
    {
      title: "Locaux Commerciaux",
      category: "Nettoyage",
      tech: ["Industriel", "Surface > 2000m²", "Quotidien"],
      image: "/projects/p1.jpg",
      description: "Nettoyage complet et régulier d'un centre commercial. Utilisation de machines auto-laveuses et de produits écologiques certifiés.",
    },
    {
      title: "Rénovation Réseau",
      category: "Plomberie",
      tech: ["Urgence", "Tuyauterie", "Résidentiel"],
      image: "/projects/p2.jpg",
      description: "Intervention d'urgence pour le remplacement de la tuyauterie principale d'un immeuble de 15 étages suite à une fuite majeure.",
    },
    {
      title: "Câblage Fibre Optique",
      category: "IT & Réseaux",
      tech: ["Infrastructure", "Fibre", "B2B"],
      image: "/projects/p3.jpg",
      description: "Installation complète du réseau fibre optique pour un campus d'entreprise de 3 bâtiments avec certification des prises.",
    },
    {
      title: "Transfert d'Entreprise",
      category: "Déménagement",
      tech: ["Logistique", "Sécurisé", "Week-end"],
      image: "/projects/p4.jpg",
      description: "Déménagement complet de 50 postes de travail, incluant le matériel informatique et les archives, réalisé en un seul week-end.",
    },
    {
      title: "Mise aux Normes",
      category: "Électricité",
      tech: ["Tableau", "Sécurité", "Particulier"],
      image: "/projects/p5.jpg",
      description: "Refonte totale du tableau électrique d'une ancienne maison pour correspondre aux normes de sécurité actuelles.",
    },
    {
      title: "Création Paysagère",
      category: "Espaces Verts",
      tech: ["Plantation", "Design", "Irrigation"],
      image: "/projects/p6.jpg",
      description: "Aménagement d'un espace vert d'entreprise incluant un système d'irrigation automatique et des plantes peu gourmandes en eau.",
    },
  ];

  return (
    <div className="pt-32 pb-20 md:pt-48 md:pb-32 bg-bg min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="badge mb-6 animate-fade-up">Réalisations</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-6 animate-fade-up-delay leading-tight">
            Notre <span className="text-brand">savoir-faire</span> en action.
          </h1>
          <p className="text-text-sub text-lg font-sans leading-relaxed animate-fade-up-delay-2">
            Découvrez nos dernières interventions et comment nous avons répondu aux exigences spécifiques de nos clients avec efficacité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up-delay-2">
          {projects.map((project, index) => (
            <div key={index} className="group card overflow-hidden border-border bg-surface">
              {/* Image Container */}
              <div className="aspect-4/3 bg-border/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand/10 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent opacity-90 z-10"></div>
                
                {/* Tech Stack Pills */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-surface/50 backdrop-blur-md border border-border rounded-md text-[10px] font-bold text-text tracking-wider uppercase">
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
                <h3 className="text-2xl font-display font-bold text-text mb-4 group-hover:text-brand transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-sub text-sm font-sans leading-relaxed mb-8 h-20">
                  {project.description}
                </p>
                <div className="pt-6 border-t border-border">
                  <button className="text-text text-sm font-display font-bold flex items-center gap-2 group/btn hover:text-brand transition-colors">
                    Détails de l'intervention
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-32 text-center card p-16 max-w-4xl mx-auto relative overflow-hidden border-border bg-surface">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand/5 blur-[80px] pointer-events-none"></div>
          <h2 className="text-3xl font-display font-bold text-text mb-6 relative z-10">Un besoin d'intervention spécifique ?</h2>
          <p className="text-text-sub mb-10 font-sans relative z-10">Discutons de votre besoin et de la meilleure approche pour le résoudre.</p>
          <div className="relative z-10">
            <Link href="/order" className="btn-brand">
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
