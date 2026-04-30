"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "./LanguageProvider";

const OrderForm = () => {
  const { t, language } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contactInfo: "",
    serviceType: "vitrine",
    location: "",
    description: "",
    options: [] as string[],
    preferredDate: "",
    preferredTime: "normal",
  });

  const serviceTypes = [
    { id: "vitrine", label: { fr: "Site Vitrine", en: "Showcase Site", ar: "موقع تعريفي" }[language], price: 15000 },
    { id: "ecommerce", label: { fr: "Pack Business (Immobilier, Gestion, E-comm...)", en: "Business Pack (Real Estate, MGMT, E-comm...)", ar: "باقة الأعمال (عقارات، تسيير، تجارة...)" }[language], price: 45000 },
    { id: "agency", label: { fr: "Pack Agence Premium", en: "Premium Agency Pack", ar: "باقة الوكالات المميزة" }[language], price: 85000 },
    { id: "application", label: { fr: "Application Web / SaaS", en: "Web App / SaaS", ar: "تطبيق ويب / SaaS" }[language], price: 120000 },
    { id: "seo", label: { fr: "SEO & Référencement", en: "SEO & Visibility", ar: "سيو وتحسين محركات البحث" }[language], price: 10000 },
    { id: "design", label: { fr: "UI/UX Design", en: "UI/UX Design", ar: "تصميم واجهة وتجربة المستخدم" }[language], price: 20000 },
    { id: "autre", label: { fr: "Autre projet digital", en: "Other digital project", ar: "مشروع رقمي آخر" }[language], price: 0 },
  ];

  const optionsList = [
    { label: { fr: "Design sur mesure", en: "Custom Design", ar: "تصميم مخصص" }[language], price: 5000 },
    { label: { fr: "Paiement en ligne", en: "Online Payment", ar: "الدفع الإلكتروني" }[language], price: 10000 },
    { label: { fr: "Espace Client / Admin", en: "Client / Admin Area", ar: "لوحة تحكم / مساحة عملاء" }[language], price: 15000 },
    { label: { fr: "Optimisation SEO", en: "SEO Optimization", ar: "تحسين محركات البحث" }[language], price: 5000 },
    { label: { fr: "Multilingue (FR/AR/EN)", en: "Multilingual (FR/AR/EN)", ar: "متعدد اللغات" }[language], price: 8000 },
    { label: { fr: "Maintenance mensuelle", en: "Monthly Maintenance", ar: "صيانة شهرية" }[language], price: 4000 },
  ];

  const calculateTotal = () => {
    const serviceBase = serviceTypes.find(t => t.id === formData.serviceType)?.price || 0;
    const optionsTotal = formData.options.reduce((acc, optLabel) => {
      const option = optionsList.find(o => o.label === optLabel);
      return acc + (option?.price || 0);
    }, 0);
    const urgencyTotal = formData.preferredTime === "prioritaire" ? 5000 : 0;
    return serviceBase + optionsTotal + urgencyTotal;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (optionLabel: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.includes(optionLabel)
        ? prev.options.filter((o) => o !== optionLabel)
        : [...prev.options, optionLabel],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("service_requests").insert([
        {
          full_name: formData.fullName,
          contact_info: formData.contactInfo,
          service_type: formData.serviceType,
          location: formData.location,
          description: formData.description,
          urgency: formData.options.join(", "),
          preferred_date: formData.preferredDate,
          budget: `${calculateTotal()} DA`,
          status: 'pending'
        },
      ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      console.error("Detailed submission error:", err);
      const errorMsg = err.message || (language === 'ar' ? "خطأ في النظام." : "Erreur système.");
      alert(`${errorMsg} - ${language === 'ar' ? "يرجى المحاولة مرة أخرى." : "Veuillez réessayer."}`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-20 card p-12 relative overflow-hidden bg-surface border-border">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[80px] pointer-events-none"></div>
        <div className="w-24 h-24 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-4xl font-display font-bold text-text mb-4">{t("order.success_title")}</h2>
        <p className="text-text-sub mb-10 max-w-lg mx-auto font-sans">
          {t("order.success_desc")}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button onClick={() => setSubmitted(false)} className="btn-ghost bg-surface">{t("order.new_request")}</button>
          <a href={`https://wa.me/213555555555`} target="_blank" className="btn-brand" style={{ backgroundColor: '#25D366', color: '#fff' }}>WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 md:p-12 space-y-12 relative overflow-hidden bg-surface border-border">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] pointer-events-none -mr-40 -mt-40"></div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-border pb-4">
             <div className="w-10 h-10 rounded-lg bg-surface border border-border text-brand flex items-center justify-center font-display font-bold text-lg shadow-sm">01</div>
             <h3 className="text-2xl font-display font-bold text-text">{t("order.section_contact")}</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sub uppercase tracking-wider">{t("order.form_name")}</label>
              <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="input" placeholder={language === 'ar' ? "مثال: محمد علي" : "Ex: Mohamed Ali"} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sub uppercase tracking-wider">{t("order.form_contact")}</label>
              <input required type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} className="input" placeholder={language === 'ar' ? "مثال: 0555..." : "Ex: 0555..."} />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-border pb-4">
             <div className="w-10 h-10 rounded-lg bg-surface border border-border text-brand flex items-center justify-center font-display font-bold text-lg shadow-sm">02</div>
             <h3 className="text-2xl font-display font-bold text-text">{t("order.section_need")}</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sub uppercase tracking-wider">{t("order.prestation")}</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="input cursor-pointer">
                {serviceTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-sub uppercase tracking-wider">{t("order.form_location")}</label>
              <input required type="text" name="location" value={formData.location} onChange={handleChange} className="input" placeholder={language === 'ar' ? "مثال: الجزائر" : "Ex: Alger"} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 relative z-10">
        <div className="flex items-center gap-4 border-b border-border pb-4">
             <div className="w-10 h-10 rounded-lg bg-surface border border-border text-brand flex items-center justify-center font-display font-bold text-lg shadow-sm">03</div>
             <h3 className="text-2xl font-display font-bold text-text">{t("order.section_details")}</h3>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-sub uppercase tracking-wider">{t("order.form_desc")}</label>
          <textarea required name="description" rows={4} value={formData.description} onChange={handleChange} className="input resize-none" />
        </div>

        <div className="space-y-4 pt-4">
          <label className="text-xs font-bold text-text-sub uppercase tracking-wider block mb-4">{t("order.urgency_label")}</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {optionsList.map((option) => (
              <label key={option.label} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.options.includes(option.label) ? "bg-brand/5 border-brand/50 text-brand" : "bg-surface border-border text-text-sub"}`}>
                <input type="checkbox" className="hidden" checked={formData.options.includes(option.label)} onChange={() => handleCheckboxChange(option.label)} />
                <div className="flex flex-col grow">
                  <span className="text-xs font-bold font-sans text-text">{option.label}</span>
                  <span className="text-[10px] text-brand font-bold">+{option.price} DA</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 pt-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-sub uppercase tracking-wider">{t("order.total_price")}</label>
          <input readOnly type="text" value={`${calculateTotal()} DA`} className="input bg-brand/5 border-brand/30 text-brand font-bold text-xl" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-sub uppercase tracking-wider">{t("order.urgency")}</label>
          <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="input">
            <option value="normal">{t("order.normal")}</option>
            <option value="prioritaire">{t("order.priority")} (+5,000 DA)</option>
          </select>
        </div>
      </div>

      <div className="pt-8 border-t border-border relative z-10">
        <button disabled={loading} type="submit" className="btn-brand w-full py-5 text-lg justify-center uppercase tracking-widest text-white">
          {loading ? t("order.sending") : t("order.form_submit")}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
