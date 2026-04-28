export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 md:pt-48 md:pb-32 noise min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="badge mb-6 animate-fade-up">Contact</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 animate-fade-up-delay leading-tight">
            Initialiser la <span className="text-brand-gradient">connexion.</span>
          </h1>
          <p className="text-gray-400 text-lg font-sans leading-relaxed animate-fade-up-delay-2">
            Besoin d'expertise technique pour votre prochain projet ? Notre équipe est prête à relever le défi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-up-delay-2">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="card p-8 bg-white/2 border-white/5 hover:border-brand/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <h4 className="text-white font-display font-bold mb-2">Téléphone</h4>
              <p className="text-gray-400 font-mono text-sm mb-1">+213 555 555 555</p>
              <p className="text-gray-600 text-xs uppercase tracking-wider font-bold">Lun-Jeu, 9h-18h</p>
            </div>

            <div className="card p-8 bg-white/2 border-white/5 hover:border-brand/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <h4 className="text-white font-display font-bold mb-2">Email</h4>
              <p className="text-gray-400 font-mono text-sm mb-1">hello@webcraft.dz</p>
              <p className="text-gray-600 text-xs uppercase tracking-wider font-bold">Réponse sous 24h</p>
            </div>

            <div className="card p-8 bg-white/2 border-white/5 hover:border-brand/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <h4 className="text-white font-display font-bold mb-2">Localisation</h4>
              <p className="text-gray-400 font-sans text-sm mb-1">Quartier des Affaires, Bab Ezzouar</p>
              <p className="text-gray-600 text-xs uppercase tracking-wider font-bold">Alger, Algérie</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 blur-[100px] pointer-events-none -mr-20 -mt-20"></div>
            
            <h3 className="text-2xl font-display font-bold text-white mb-8 relative z-10">Envoyer un message</h3>
            
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nom Complet</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Pro</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="john@entreprise.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sujet</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Demande d'information technique..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                <textarea
                  rows={6}
                  className="input resize-none"
                  placeholder="Détaillez votre besoin..."
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="btn-brand w-full md:w-auto px-10">
                  Envoyer le message
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
