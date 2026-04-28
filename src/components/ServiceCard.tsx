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
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 mb-8 group-hover:border-brand/50 group-hover:text-brand group-hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-brand transition-colors">{title}</h3>
      
      <p className="text-gray-400 text-sm leading-relaxed mb-8 grow font-sans">
        {description}
      </p>
      
      <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Budget min.</span>
        <span className="text-lg font-display font-bold text-white">{price}</span>
      </div>
    </div>
  );
};

export default ServiceCard;
