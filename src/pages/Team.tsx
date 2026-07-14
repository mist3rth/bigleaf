import React from 'react';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { Heart, Sparkles, Sprout, ShieldCheck, ArrowLeft, Instagram, Linkedin, Mail } from 'lucide-react';
import serreImg from '../../assets/serre.webp';
import mathildeImg from '../../assets/mathilde.webp';
import sylvainImg from '../../assets/sylvain.webp';
import claraImg from '../../assets/clara.webp';
import adrienImg from '../../assets/adrien.webp';
import contactFormBg from '../assets/images/contact_form_bg.webp';
import visitGreenhouseImg from '../assets/images/visit_greenhouse.webp';

interface TeamPageProps {
  onBack: () => void;
}

export default function TeamPage() {
  const { navigate } = useUI();
  const onBack = () => navigate("home");

  const teamMembers = [
    {
      name: 'Mathilde Laroche',
      role: 'Co-fondatrice & Botaniste en Chef',
      bio: "Passionnée d'horticulture rare depuis l'enfance, Mathilde parcourt le monde à la recherche des variétés les plus fascinantes. Elle veille personnellement à l'acclimatation et à la santé de chaque spécimen avant son expédition.",
      image: mathildeImg,
      icon: <Sprout className="w-4 h-4 text-gold" />,
      instagram: '@mathilde.botanist',
      linkedin: 'mathilde-laroche-bigleaf'
    },
    {
      name: 'Sylvain Beaumont',
      role: 'Horticulteur Expert & Sols',
      bio: "Véritable alchimiste des substrats, Sylvain compose des terreaux drainants organiques sur-mesure pour chaque variété. Sa priorité absolue : stimuler le développement racinaire pour garantir des plantes ultra-robustes.",
      image: claraImg,
      icon: <Heart className="w-4 h-4 text-gold" />,
      instagram: '@sylvain.horticulture',
      linkedin: 'sylvain-beaumont-bigleaf'
    },
    {
      name: 'Clara Masson',
      role: 'Designer Végétal & Styliste',
      bio: "Clara sublime les formes géométriques et les symétries hypnotiques de nos cactus et succulentes. Elle conçoit des guides d'aménagement d'intérieur inspirants pour marier parfaitement botanique et art de vivre.",
      image: sylvainImg,
      icon: <Sparkles className="w-4 h-4 text-gold" />,
      instagram: '@clara.vegetal.style',
      linkedin: 'clara-masson-bigleaf'
    },
    {
      name: 'Adrien Roy',
      role: 'Responsable Soins & Logistique',
      bio: "Adrien a conçu nos emballages d'expédition brevetés, entièrement biosourcés et protecteurs. Son rôle est de s'assurer que vos colis voyagent à la température parfaite pour préserver l'éclat des feuillages.",
      image: adrienImg,
      icon: <ShieldCheck className="w-4 h-4 text-gold" />,
      instagram: '@adrien.care.logistics',
      linkedin: 'adrien-roy-bigleaf'
    }
  ];

  return (
    <div className="bg-[#FDFDFD] min-h-screen pt-8 pb-20" id="team-page">
      {/* Container limits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Return CTA */}
        <div className="mb-12">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary/75 hover:text-accent transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Retour à l'accueil
          </button>
        </div>

        {/* Hero Banner with serre.webp */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] rounded-3xl overflow-hidden mb-16 shadow-premium border border-primary/5">
          <img 
            src={serreImg} 
            alt="Notre Serre" 
            className="w-full h-full object-cover object-top"
          />
          {/* Dark gradient overlay for high legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E12]/90 via-primary/40 to-transparent" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-12 text-left max-w-4xl">
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white leading-none tracking-tight uppercase">
              La Team <span className="font-serif italic font-normal text-gold normal-case">BigLeaf</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/85 font-sans mt-4 max-w-xl leading-relaxed">
              Derrière chaque rosette parfaite et chaque cactus sculptural se cache une équipe d'artisans dévoués, unis par l'amour de la botanique et de la culture raisonnée.
            </p>
          </div>
        </div>

        {/* Section 1: Ethique & Passion (Bento Row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* Card 1: Ethique */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-secondary rounded-3xl p-8 md:p-12 border border-primary/5 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
            <div className="flex items-center gap-3.5 mb-6">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-primary tracking-tight uppercase">
                Notre Éthique Végétale
              </h2>
            </div>
            <p className="text-sm sm:text-base text-primary/80 font-sans leading-relaxed mb-6">
              Nous prônons une horticulture douce, respectueuse des saisons et de l'environnement. Nos plantes grandissent sans aucun engrais chimique de synthèse ni forçage thermique artificiel. Nous concevons nous-mêmes nos substrats biosourcés et privilégions des emballages 100% compostables ou recyclables.
            </p>
            <div className="border-t border-primary/10 pt-4 flex flex-wrap gap-4 text-xs font-mono font-bold text-accent">
              <span>#CultureRaisonnée</span>
              <span>#ZéroPlastique</span>
              <span>#SolsOrganiques</span>
            </div>
          </motion.div>

          {/* Card 2: Passion */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-secondary rounded-3xl p-8 md:p-12 border border-primary/5 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/10 transition-colors" />
            <div className="flex items-center gap-3.5 mb-6">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-primary tracking-tight uppercase">
                Une Passion Transmise
              </h2>
            </div>
            <p className="text-sm sm:text-base text-primary/80 font-sans leading-relaxed mb-6">
              Pour nous, les plantes ne sont pas de simples objets de décoration, mais des partenaires de bien-être. Nous adorons observer la perfection des symétries géométriques naturelles et partager ce sentiment d'apaisement quotidien. Notre mission est de vous accompagner à chaque étape pour réussir leur croissance.
            </p>
            <div className="border-t border-primary/10 pt-4 flex flex-wrap gap-4 text-xs font-mono font-bold text-gold">
              <span>#AmourDuVivant</span>
              <span>#SymétrieNaturelle</span>
              <span>#PédagogieVerte</span>
            </div>
          </motion.div>

        </div>

        {/* Section 2: Team Members grid */}
        <div className="mb-12">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-primary tracking-tight uppercase mb-12 text-center md:text-left">
            Les Visages de l'Équipe
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-premium border border-primary/5 group transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with beautiful ratio & effect */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Body textual content */}
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-primary tracking-tight group-hover:text-gold transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-primary/40 uppercase tracking-wider mt-1">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-primary/75 font-sans leading-relaxed mt-3.5">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Footer links */}
                <div className="px-5 pb-5 pt-2 border-t border-primary/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <a 
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      className="text-primary/60 hover:text-gold transition-colors"
                      title={member.instagram}
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a 
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      className="text-primary/60 hover:text-gold transition-colors"
                      title="LinkedIn profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a 
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      className="text-primary/60 hover:text-gold transition-colors"
                      title="Contact mail"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                  <span className="text-[10px] font-mono text-primary/30 uppercase">
                    BigLeaf Artisans
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Greenhouse Visit Section */}
        <div className="mt-20 flex flex-col md:flex-row-reverse bg-[#0A1E12] rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[400px]">
            <img 
              src={visitGreenhouseImg} 
              alt="Visitez nos serres BigLeaf"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20"></div>
          </div>
          
          {/* Content Side */}
          <div className="w-full md:w-1/2 p-8 sm:p-14 flex flex-col justify-center relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#CBB279_1px,transparent_1px)] [background-size:16px_16px]" />
            <h3 className="font-display font-bold text-[22px] md:text-[34px] text-white mb-6 tracking-tight uppercase relative z-10 leading-snug">
              Envie de venir nous voir dans nos serres ?
            </h3>
            <p className="text-sm md:text-base text-white/80 font-sans mb-10 leading-relaxed relative z-10">
              Nous serons particulièrement heureux de vous y accueillir pour partager notre passion végétale, vous prodiguer tous nos conseils d'entretien, et vous recevoir chaleureusement autour d'un petit verre de limonade maison !
            </p>
            <div className="relative z-10">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=48.8437976,2.358249"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3.5 bg-gold text-[#0A1E12] hover:bg-white hover:text-[#0A1E12] rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer"
              >
                Voir sur Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-16 flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-glass border border-primary/10">
          {/* Image Side */}
          <div className="w-full md:w-5/12 relative min-h-[300px]">
            <img 
              src={contactFormBg} 
              alt="Serre BigLeaf"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/10"></div>
          </div>
          
          {/* Form Side */}
          <div className="w-full md:w-7/12 p-8 sm:p-12 text-left">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-primary mb-3 tracking-tight">
              Contactez-nous
            </h3>
            <p className="text-sm text-primary/70 font-sans mb-8 leading-relaxed max-w-md">
              Que ce soit pour une question sur nos services, nos prix, ou toute autre demande, notre équipe est prête à répondre à toutes vos questions.
            </p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Nom <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Votre nom" className="w-full px-4 py-3 bg-white border border-primary/15 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm text-primary placeholder-primary/40 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Email <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="vous@exemple.com" className="w-full px-4 py-3 bg-white border border-primary/15 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm text-primary placeholder-primary/40 shadow-sm" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Entreprise</label>
                <input type="text" placeholder="Votre entreprise" className="w-full px-4 py-3 bg-white border border-primary/15 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm text-primary placeholder-primary/40 shadow-sm" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Message <span className="text-red-500">*</span></label>
                <textarea rows={4} placeholder="Comment pouvons-nous vous aider ?" className="w-full px-4 py-3 bg-white border border-primary/15 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm text-primary placeholder-primary/40 resize-none shadow-sm"></textarea>
              </div>
              
              <button type="submit" className="w-full px-6 py-3.5 bg-primary text-white hover:bg-accent rounded-xl font-sans font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
