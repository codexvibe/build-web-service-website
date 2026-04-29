"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

const OrderForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    formData: {
      fullName: "",
      contactInfo: "",
      serviceType: "vitrine",
      location: "",
      description: "",
      options: [] as string[],
      preferredDate: "",
      budget: "",
      preferredTime: "normal",
    }
  });

  const serviceTypes = [
    { id: "vitrine", label: "Site Vitrine", price: 15000 },
    { id: "ecommerce", label: "Boutique E-commerce", price: 45000 },
    { id: "application", label: "Application Web / SaaS", price: 80000 },
    { id: "seo", label: "SEO & Référencement", price: 10000 },
    { id: "design", label: "UI/UX Design", price: 20000 },
    { id: "autre", label: "Autre projet digital", price: 0 },
  ];

  const optionsList = [
    { label: "Design sur mesure", price: 5000 },
    { label: "Paiement en ligne", price: 10000 },
    { label: "Espace Client / Admin", price: 15000 },
    { label: "Optimisation SEO", price: 5000 },
    { label: "Multilingue (FR/AR/EN)", price: 8000 },
    { label: "Maintenance mensuelle", price: 4000 },
  ];

  const calculateTotal = () => {
    const serviceBase = serviceTypes.find(t => t.id === formData.formData.serviceType)?.price || 0;
    const optionsTotal = formData.formData.options.reduce((acc, optLabel) => {
      const option = optionsList.find(o => o.label === optLabel);
      return acc + (option?.price || 0);
    }, 0);
    const urgencyTotal = formData.formData.preferredTime === "prioritaire" ? 5000 : 0;
    return serviceBase + optionsTotal + urgencyTotal;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, formData: { ...prev.formData, [name]: value } }));
  };

  const handleCheckboxChange = (optionLabel: string) => {
    setFormData((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        options: prev.formData.options.includes(optionLabel)
          ? prev.formData.options.filter((o) => o !== optionLabel)
          : [...prev.formData.options, optionLabel],
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("service_requests").insert([
        {
          full_name: formData.formData.fullName,
          contact_info: formData.formData.contactInfo,
          service_type: formData.formData.serviceType,
          location: formData.formData.location,
          description: formData.formData.description,
          urgency: formData.formData.options.join(", "),
          preferred_date: formData.formData.preferredDate,
          budget: `${calculateTotal()} DA`,
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting request:", err);
      alert("Erreur système lors de l'envoi. Veuillez réessayer ou nous contacter directement.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-20 card p-12 relative overflow-hidden bg-surface border-border">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[80px] pointer-events-none"></div>
        <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-4xl font-display font-bold text-text mb-4 relative z-10">Demande Enregistrée.</h2>
        <p className="text-text-sub mb-10 max-w-lg mx-auto font-sans text-lg relative z-10">
          Votre demande de projet a bien été reçue. Un de nos experts prendra contact avec vous très rapidement pour discuter de votre futur site.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-ghost bg-surface"
          >
            Nouvelle demande
          </button>
          <a 
            href={`https://wa.me/213555555555?text=Bonjour, je viens de soumettre une demande de projet pour : ${formData.formData.serviceType}. Total estimé : ${calculateTotal()} DA`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand"
            style={{ backgroundColor: '#25D366', color: '#fff' }}
          >
            Contacter sur WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 md:p-12 space-y-12 relative overflow-hidden bg-surface border-border">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] pointer-events-none -mr-40 -mt-40"></div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 relative z-10">
        
        {/* Step 1: Info Perso */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-border pb-4">
             <div className="w-10 h-10 rounded-lg bg-surface border border-border text-brand flex items-center justify-center font-display font-bold text-lg shadow-sm">01</div>
             <h3 className="text-2xl font-display font-bold text-text">Coordonnées</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Nom / Entreprise</label>
              <input
                required
                type="text"
                name="fullName"
                value={formData.formData.fullName}
                onChange={handleChange}
                className="input"
                placeholder="Ex: Mohamed Ali"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Téléphone ou Email</label>
              <input
                required
                type="text"
                name="contactInfo"
                value={formData.formData.contactInfo}
                onChange={handleChange}
                className="input"
                placeholder="Ex: 0555..."
              />
            </div>
          </div>
        </div>

        {/* Step 2: Project Info */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-border pb-4">
             <div className="w-10 h-10 rounded-lg bg-surface border border-border text-brand flex items-center justify-center font-display font-bold text-lg shadow-sm">02</div>
             <h3 className="text-2xl font-display font-bold text-text">Votre Besoin</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Type de prestation</label>
              <select
                name="serviceType"
                value={formData.formData.serviceType}
                onChange={handleChange}
                className="input cursor-pointer appearance-none bg-surface"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
              >
                {serviceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Adresse d'intervention</label>
              <input
                required
                type="text"
                name="location"
                value={formData.formData.location}
                onChange={handleChange}
                className="input"
                placeholder="Ex: Hydra, Alger"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Scope */}
      <div className="space-y-8 relative z-10">
        <div className="flex items-center gap-4 border-b border-border pb-4">
             <div className="w-10 h-10 rounded-lg bg-surface border border-border text-brand flex items-center justify-center font-display font-bold text-lg shadow-sm">03</div>
             <h3 className="text-2xl font-display font-bold text-text">Détails du Projet</h3>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Description du problème ou du besoin</label>
          <textarea
            required
            name="description"
            rows={4}
            value={formData.formData.description}
            onChange={handleChange}
            className="input resize-none"
            placeholder="Décrivez votre projet, vos objectifs et vos fonctionnalités souhaitées..."
          />
        </div>

        <div className="space-y-4 pt-4">
          <label className="text-xs font-bold text-text-sub uppercase tracking-wider block mb-4">Options supplémentaires</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {optionsList.map((option) => (
              <label
                key={option.label}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.formData.options.includes(option.label)
                    ? "bg-brand/5 border-brand/50 text-brand shadow-sm"
                    : "bg-surface border-border text-text-sub hover:border-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={formData.formData.options.includes(option.label)}
                  onChange={() => handleCheckboxChange(option.label)}
                />
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                  formData.formData.options.includes(option.label) ? "bg-brand border-brand" : "border-gray-400 bg-white"
                }`}>
                  {formData.formData.options.includes(option.label) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  )}
                </div>
                <div className="flex flex-col grow">
                  <span className="text-xs font-bold font-sans leading-tight text-text">{option.label}</span>
                  <span className="text-[10px] text-brand font-bold">+{option.price} DA</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Step 4: Constraints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 pt-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Date souhaitée</label>
          <input
            type="text"
            name="preferredDate"
            value={formData.formData.preferredDate}
            onChange={handleChange}
            className="input"
            placeholder="Ex: Le plus tôt possible, Demain..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Budget estimé</label>
          <div className="relative">
            <input
              readOnly
              type="text"
              value={`${calculateTotal()} DA`}
              className="input bg-brand/5 border-brand/30 text-brand font-bold text-xl"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-brand/60">
              Total Estimé
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-sub uppercase tracking-wider">Urgence</label>
          <select
            name="preferredTime"
            value={formData.formData.preferredTime}
            onChange={handleChange}
            className="input"
          >
            <option value="normal">Normal</option>
            <option value="prioritaire">Prioritaire (+5,000 DA)</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-8 border-t border-border relative z-10">
        <button
          disabled={loading}
          type="submit"
          className="btn-brand w-full py-5 text-lg justify-center relative overflow-hidden group"
        >
          {loading ? (
            <span className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Envoi en cours...
            </span>
          ) : (
            <>
              <span className="relative z-10 font-display uppercase tracking-widest text-sm text-white">Confirmer la demande</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </>
          )}
        </button>
        <p className="text-center text-[10px] text-muted uppercase tracking-widest mt-4">
           Connexion sécurisée
        </p>
      </div>
    </form>
  );
};

export default OrderForm;
