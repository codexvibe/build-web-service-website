"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

const OrderForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contactInfo: "",
    siteType: "e-commerce",
    projectName: "",
    description: "",
    features: [] as string[],
    designStyle: "",
    budget: "",
    deadline: "",
  });

  const siteTypes = [
    { id: "e-commerce", label: "E-commerce Premium" },
    { id: "vitrine", label: "Site Vitrine / Corporate" },
    { id: "blog", label: "Plateforme Contenu / Blog" },
    { id: "application", label: "Application Web / SaaS" },
    { id: "autre", label: "Autre projet spécifique" },
  ];

  const featuresList = [
    "Paiement en ligne (Local/Intl)",
    "API / Intégration Externe",
    "Back-office sur-mesure",
    "Espace membre sécurisé",
    "Dashboard Analytique",
    "Multilingue complexe",
    "Optimisation Web Perf avancée",
    "Animation WebGL / 3D",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("orders").insert([
        {
          full_name: formData.fullName,
          contact_info: formData.contactInfo,
          site_type: formData.siteType,
          project_name: formData.projectName,
          description: formData.description,
          features: formData.features,
          design_style: formData.designStyle,
          budget: formData.budget,
          deadline: formData.deadline,
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Erreur système lors de l'envoi. Veuillez réessayer ou nous contacter directement.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-20 card p-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#10b981]/5 blur-[80px] pointer-events-none"></div>
        <div className="w-24 h-24 bg-[#10b981]/10 text-[#10b981] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#10b981]/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-4xl font-display font-bold text-white mb-4 relative z-10">Transmission Réussie.</h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto font-sans text-lg relative z-10">
          Votre brief technique a été enregistré dans notre base de données. Un ingénieur système prendra contact avec vous dans les prochaines 24h ouvrées.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-ghost"
          >
            Nouveau brief
          </button>
          <a 
            href={`https://wa.me/213555555555?text=Bonjour, je viens de soumettre le brief technique pour le projet : ${formData.projectName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand"
            style={{ backgroundColor: '#25D366', color: '#fff', boxShadow: '0 0 20px rgba(37,211,102,0.3)' }}
          >
            Contacter le support WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 md:p-12 space-y-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] pointer-events-none -mr-40 -mt-40"></div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 relative z-10">
        
        {/* Step 1: Info Perso */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-white/5 pb-4">
             <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/30 text-brand flex items-center justify-center font-display font-bold text-lg">01</div>
             <h3 className="text-2xl font-display font-bold text-white">Identification</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nom Complet / Entreprise</label>
              <input
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input"
                placeholder="Ex: TechCorp Algérie"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email pro ou WhatsApp</label>
              <input
                required
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="input"
                placeholder="Ex: contact@techcorp.dz ou 0555..."
              />
            </div>
          </div>
        </div>

        {/* Step 2: Project Info */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-white/5 pb-4">
             <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/30 text-brand flex items-center justify-center font-display font-bold text-lg">02</div>
             <h3 className="text-2xl font-display font-bold text-white">Spécifications</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Type d'architecture requise</label>
              <select
                name="siteType"
                value={formData.siteType}
                onChange={handleChange}
                className="input cursor-pointer appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23f1f5f9\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
              >
                {siteTypes.map((type) => (
                  <option key={type.id} value={type.id} className="bg-card text-white">
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nom de code du projet</label>
              <input
                required
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="input"
                placeholder="Ex: Projet Phoenix"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Scope */}
      <div className="space-y-8 relative z-10">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
             <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/30 text-brand flex items-center justify-center font-display font-bold text-lg">03</div>
             <h3 className="text-2xl font-display font-bold text-white">Périmètre Technique</h3>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cahier des charges succinct (Objectifs, problématique...)</label>
          <textarea
            required
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="input resize-none"
            placeholder="Décrivez les fonctionnalités clés, le flux utilisateur attendu et les contraintes techniques éventuelles..."
          />
        </div>

        <div className="space-y-4 pt-4">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4">Modules Techniques Requis</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuresList.map((feature) => (
              <label
                key={feature}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.features.includes(feature)
                    ? "bg-brand/10 border-brand/50 text-brand shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                    : "bg-white/2 border-white/10 text-gray-400 hover:border-white/30"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={formData.features.includes(feature)}
                  onChange={() => handleCheckboxChange(feature)}
                />
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                  formData.features.includes(feature) ? "bg-brand border-brand" : "border-gray-600"
                }`}>
                  {formData.features.includes(feature) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  )}
                </div>
                <span className="text-xs font-bold font-sans leading-tight">{feature}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Step 4: Constraints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 pt-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Direction Artistique</label>
          <input
            type="text"
            name="designStyle"
            value={formData.designStyle}
            onChange={handleChange}
            className="input"
            placeholder="Ex: Tech, Dark Mode, Minimaliste"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Budget Alloué (DA)</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="input"
            placeholder="Ex: 150k - 200k"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Deadline Critique</label>
          <input
            type="text"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="input"
            placeholder="Ex: Q3 2026, Fin du mois..."
          />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-8 border-t border-white/5 relative z-10">
        <button
          disabled={loading}
          type="submit"
          className="btn-brand w-full py-5 text-lg justify-center relative overflow-hidden group"
        >
          {loading ? (
            <span className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Exécution en cours...
            </span>
          ) : (
            <>
              <span className="relative z-10 font-display uppercase tracking-widest text-sm">Initialiser le déploiement</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </>
          )}
        </button>
        <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mt-4">
           Connexion sécurisée via Supabase
        </p>
      </div>
    </form>
  );
};

export default OrderForm;
