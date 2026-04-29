import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
}

const ServiceCard = ({ title, description, icon, price }: ServiceCardProps) => {
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
        <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">À partir de</span>
        <span className="text-lg font-display font-bold text-text">{price}</span>
      </div>
    </div>
  );
};

export default ServiceCard;
