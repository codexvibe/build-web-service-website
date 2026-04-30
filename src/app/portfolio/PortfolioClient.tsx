"use client";

import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";

export default function PortfolioClient() {
  const { t } = useTranslation();

  const projects = [
    {
      title: "E-commerce Mode DZ",
      category: "E-commerce",
      description: "Plateforme complète de vente en ligne avec paiement à la livraison et gestion de stock.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
      tags: ["Next.js", "Supabase", "Tailwind"]
    },
    {
      title: "Immo Alger",
      category: "Immobilier",
      description: "Portail de recherche immobilière avec géolocalisation et filtres avancés.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
      tags: ["React", "Node.js", "PostgreSQL"]
    },
    {
      title: "Clinique Santé Plus",
      category: "Santé",
      description: "Système de prise de rendez-vous en ligne et gestion des dossiers patients.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
      tags: ["TypeScript", "API Rest", "Dashboard"]
    }
  ];

  return (
    <div className="pt-32 pb-20 md:pt-48 md:pb-32 bg-bg min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="badge mb-6">Portfolio</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-6 leading-tight">
            Nos réalisations de sites web et projets digitaux en Algérie
          </h1>
          <p className="text-text-sub text-lg font-sans leading-relaxed">
            Explorez le <strong>portfolio de notre agence web en Algérie</strong> et découvrez la qualité de nos travaux. Nous avons réalisé de nombreux projets de <strong>création web à Alger</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="card group overflow-hidden border-border hover:border-brand/50 transition-all">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={`${project.title} - ${project.category} en Algérie`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-display font-bold text-text mb-4">{project.title}</h3>
                <p className="text-text-sub text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-brand bg-brand/5 px-2 py-1 rounded border border-brand/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Content Section */}
        <div className="mt-24 max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-3xl font-display font-bold text-text mb-8 text-center">Études de cas : Succès e-commerce et vitrine à Alger</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-display font-bold text-text mb-6">Des designs modernes pour des clients algériens exigeants</h3>
              <p className="text-text-sub leading-relaxed mb-6">
                Chaque réalisation dans ce portfolio démontre notre savoir-faire en <strong>design web en Algérie</strong> et notre attention aux détails. Nos exemples de <strong>sites e-commerce en Algérie</strong> illustrent notre capacité à créer des tunnels de vente efficaces.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-text mb-6">Optimisation et Performance</h3>
              <p className="text-text-sub leading-relaxed">
                En parcourant nos réalisations, vous constaterez que chaque projet est optimisé pour les mobiles et conforme aux standards SEO. Inspirez-vous de nos succès passés à <strong>Alger</strong> pour imaginer votre futur site web.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link href="/order" className="btn-brand">
            Lancer mon projet maintenant
          </Link>
        </div>
      </div>
    </div>
  );
}
