import React from 'react';
import tablierImg from '../../tablier.webp';
import win1 from '../../../assets/win1.webp';
import win2 from '../../../assets/win2.webp';
import win3 from '../../../assets/win3.webp';
import win4 from '../../../assets/win4.webp';

const LAST_WINNERS = [
  {
    name: 'Sophie L.',
    month: 'Gagnante de Juin',
    image: win1
  },
  {
    name: 'Thomas M.',
    month: 'Gagnant de Mai',
    image: win3
  },
  {
    name: 'Emma R.',
    month: 'Gagnante d\'Avril',
    image: win2
  },
  {
    name: 'Lucas B.',
    month: 'Gagnant de Mars',
    image: win4
  }
];

export default function MonthlyContest() {
  return (
    <section 
      className="py-16 px-4 md:px-8 max-w-screen-2xl mx-auto text-primary" 
      id="monthly-contest"
    >
      <div className="bg-secondary/40 rounded-3xl border border-primary/5 overflow-hidden shadow-premium">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Premium visual representation of the apron */}
          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-square w-full h-full min-h-[320px] lg:min-h-[480px]">
            <img 
              src={tablierImg} 
              alt="Magnifique tablier de jardinage BigLeaf" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Dark elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-primary/10" />

            <div className="absolute bottom-6 left-6 text-white text-left max-w-xs md:max-w-md lg:hidden">
              <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-bold">Édition Limitée</span>
              <h4 className="font-display font-black text-xl leading-tight mt-1">Le Tablier de Maître BigLeaf</h4>
            </div>
          </div>

          {/* Right Column: Copy & Details */}
          <div className="lg:col-span-7 p-6 md:p-10 lg:pl-0 text-left space-y-6 md:space-y-8">
            
            {/* Accent badge + Title */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-accent font-mono text-[11px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-3 bg-[#7A5C43] rounded-xs flex-shrink-0" />
                <span>Tirage au Sort Mensuel</span>
              </div>
              <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase leading-none">
                Gagnez le Tablier BigLeaf<span className="text-accent">.</span>
              </h2>
              <p className="text-sm md:text-base text-primary/70 max-w-2xl leading-relaxed">
                Chaque mois, nous célébrons notre communauté de passionnés de botanique. Toutes les personnes ayant passé commande durant le mois en cours sont automatiquement inscrites à notre grand tirage au sort pour remporter notre tablier de jardinage signature.
              </p>
            </div>

            {/* Apron key benefits - minimal bento style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/80 p-4 rounded-xl border border-primary/5 flex gap-3.5 items-start">
                <span className="w-1.5 h-3 bg-[#7A5C43] rounded-xs flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wide text-primary">Toile de Coton Ciré</h4>
                  <p className="text-[11px] text-primary/70 mt-1">Imperméable et ultra-robuste face à la terre et à l'usure du temps.</p>
                </div>
              </div>

              <div className="bg-white/80 p-4 rounded-xl border border-primary/5 flex gap-3.5 items-start">
                <span className="w-1.5 h-3 bg-[#7A5C43] rounded-xs flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wide text-primary">Lanières en Tissu</h4>
                  <p className="text-[11px] text-primary/70 mt-1">Lanières en tissu robuste ajustable pour un confort de travail absolu.</p>
                </div>
              </div>

              <div className="bg-white/80 p-4 rounded-xl border border-primary/5 flex gap-3.5 items-start">
                <span className="w-1.5 h-3 bg-[#7A5C43] rounded-xs flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wide text-primary font-bold">Poches d'Artisan</h4>
                  <p className="text-[11px] text-primary/70 mt-1">Multiples compartiments renforcés pour vos cisailles, pelles et vaporisateurs.</p>
                </div>
              </div>

              <div className="bg-white/80 p-4 rounded-xl border border-primary/5 flex gap-3.5 items-start">
                <span className="w-1.5 h-3 bg-[#7A5C43] rounded-xs flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wide text-primary">Logo Brodé Main</h4>
                  <p className="text-[11px] text-primary/70 mt-1">Notre emblématique feuille BigLeaf finement brodée sur le plastron.</p>
                </div>
              </div>
            </div>

            {/* Last Winners Section */}
            <div className="space-y-4 pt-4 border-t border-primary/5">
              <div className="flex items-center gap-2 text-accent font-mono text-[11px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-3 bg-[#7A5C43] rounded-xs flex-shrink-0" />
                <span>Nos derniers gagnants</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {LAST_WINNERS.map((winner, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-xl border border-primary/5 bg-white/80 p-2 text-center shadow-xs transition-all hover:shadow-md">
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-secondary">
                      <img 
                        src={winner.image} 
                        alt={winner.name} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="mt-2 text-left px-1">
                      <p className="font-sans font-bold text-xs text-primary">{winner.name}</p>
                      <p className="font-mono text-[9px] text-primary/40 uppercase mt-0.5">{winner.month}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
