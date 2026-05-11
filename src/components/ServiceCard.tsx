import React from "react";
import { useTranslation } from "./LanguageProvider";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  discount_percent?: number;
  original_price?: string;
}

const ServiceCard = ({ title, description, icon, price, discount_percent, original_price }: ServiceCardProps) => {
  const { language } = useTranslation();
  
  const fromText = {
    fr: "À partir de",
    en: "Starting from",
    ar: "ابتداءً من"
  }[language];

  return (
    <div className="card p-8 flex flex-col h-full group relative overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand rounded-full blur-[50px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="w-14 h-14 rounded-xl bg-surface border border-border flex items-center justify-center text-text-sub mb-8 group-hover:border-brand/50 group-hover:text-brand transition-all duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-display font-bold text-text mb-4 group-hover:text-brand transition-colors">{title}</h3>
      
      <p className="text-text-sub text-sm leading-relaxed mb-8 grow font-sans">
        {description}
      </p>
      
      <div className="pt-6 border-t border-border flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">{fromText}</span>
          {original_price && (
            <span className="text-[10px] text-muted/50 line-through font-mono">{original_price}</span>
          )}
        </div>
        <div className="flex flex-col items-end">
          {discount_percent ? (
            <span className="text-xs font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-md mb-1">-{discount_percent}%</span>
          ) : null}
          <span className="text-lg font-display font-bold text-text">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
