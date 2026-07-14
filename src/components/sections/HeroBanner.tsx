import React, { useState } from 'react';
import { Play } from 'lucide-react';
import personneImg from '../../personne.webp';

export default function HeroBanner() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section 
      className="max-w-screen-2xl mx-auto px-4 md:px-8 mt-6"
      id="hero-editorial-banner"
    >
      <div className="bg-[#F4F4F3] text-primary rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 shadow-sm border border-[#E5E5E3]">
        
        {/* Left Column: Bold Title & Subtitle */}
        <div className="flex-1 min-w-[240px] text-left">
          <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-primary leading-none mb-3">
            Le Vert <br /> pour Tous
          </h2>
          <p className="text-xs md:text-sm text-primary/70 font-sans max-w-sm leading-relaxed">
            Nous croyons que chacun mérite son propre petit coin de paradis botanique.
          </p>
        </div>

        {/* Center Column: Interactive Video/Image Capsule */}
        <div className="flex-1 flex justify-center max-w-md w-full">
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden group shadow-md border border-black/5 bg-[#1F2E23]">
            <img 
              src={personneImg} 
              alt="Artisan BigLeaf" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Absolute overlay elements */}
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors" />
            
            <button aria-label="Bouton d'action" 
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute right-4 bottom-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gold hover:text-primary hover:scale-105 transition-all cursor-pointer"
              aria-label="Lancer la vidéo"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </button>


          </div>
        </div>

        {/* Right Column: Horticultural description with inline custom capsule badge */}
        <div className="flex-1 min-w-[260px] text-left md:max-w-md">
          <p className="text-sm sm:text-base md:text-lg text-primary/85 font-sans leading-relaxed">
            Chaque plante est cultivée{' '}
            <span className="inline-flex items-center bg-[#0D2E1A] text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full mx-1 align-middle shadow-sm border border-emerald-800/20 select-none">
              avec amour
            </span>{' '}
            par nos experts, pour qu'elle s'épanouisse en parfaite santé.
          </p>
        </div>

      </div>
    </section>
  );
}
