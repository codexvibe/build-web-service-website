import OrderForm from "@/components/OrderForm";

export default function OrderPage() {
  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-32 noise min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-brand to-transparent opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="badge mb-6 animate-fade-up">Brief Technique</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 animate-fade-up-delay leading-tight">
              Lancement du <span className="text-brand-gradient">Protocole.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto font-sans animate-fade-up-delay-2">
              Détaillez vos spécifications techniques ci-dessous. Notre équipe d'ingénieurs analysera vos prérequis pour vous proposer l'architecture la plus adaptée.
            </p>
          </div>
          
          <div className="animate-fade-up-delay-2">
            <OrderForm />
          </div>
          
          {/* Trust indicators */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up-delay-2">
            <div className="card p-6 text-center bg-white/1 border-white/5">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mx-auto mb-4 border border-brand/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <h3 className="text-white font-display font-bold mb-2">Analyse Rapide</h3>
              <p className="text-gray-500 font-sans text-sm">Évaluation technique de votre brief sous 24h ouvrées.</p>
            </div>
            
            <div className="card p-6 text-center bg-white/1 border-white/5">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mx-auto mb-4 border border-brand/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h3 className="text-white font-display font-bold mb-2">Données Sécurisées</h3>
              <p className="text-gray-500 font-sans text-sm">Vos informations sont chiffrées et traitées en toute confidentialité.</p>
            </div>
            
            <div className="card p-6 text-center bg-white/1 border-white/5">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mx-auto mb-4 border border-brand/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="text-white font-display font-bold mb-2">Architecture Sur-mesure</h3>
              <p className="text-gray-500 font-sans text-sm">Proposition d'une stack technique adaptée à vos contraintes.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
