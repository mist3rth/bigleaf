import potDrainantImg from '../../assets/images/pot_drainant.webp';
import substratIdealImg from '../../assets/images/substrat_ideal.webp';
import arrosageBainImg from '../../assets/images/arrosage_bain.webp';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CuratedGoods() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const stepsData = [
    {
      overline: 'UN POT EN TERRE CUITE RESPIRANT',
      title: 'LE CHOIX DU POT DRAINANT',
      desc: "Choisissez toujours un pot muni d'un trou d'évacuation. La terre cuite naturelle est idéale car elle respire, permettant à l'excès d'humidité de s'évaporer rapidement par les parois de manière homogène.",
      image: potDrainantImg
    },
    {
      overline: 'LE FAMEUX MÉLANGE "TROIS TIERS"',
      title: 'LE SUBSTRAT IDÉAL',
      desc: "Les succulentes détestent avoir les racines mouillées. Composez un mélange drainant : 1/3 de terreau de feuilles de qualité, 1/3 de sable de rivière grossier et 1/3 de pouzzolane ou perlite.",
      image: substratIdealImg
    },
    {
      overline: 'LA RÈGLE D\'OR DU SUCCÈS',
      title: 'L\'ARROSAGE : LA MÉTHODE "BAIN"',
      desc: "Laissez tremper la base du pot dans une bassine d'eau pendant 10 minutes jusqu'à ce que la surface du substrat soit humide. Laissez toujours le terreau s'assécher complètement avant le prochain arrosage.",
      image: arrosageBainImg
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 max-w-screen-2xl mx-auto text-center" id="curated-section">
      
      {/* Editorial Header */}
      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-primary uppercase leading-tight">
          Guide de culture <br />
          L'Art du Rempotage<span className="text-accent">.</span>
        </h2>
        <p className="text-sm text-primary/70 font-sans mt-5 leading-relaxed">
          Prenez soin de vos succulentes en maîtrisant les gestes fondamentaux de nos artisans botanistes pour leur assurer une croissance saine, robuste et durable.
        </p>
      </div>

      {/* 3 Steps Timeline */}
      <div className="max-w-5xl mx-auto relative text-left" ref={containerRef}>
        {/* Vertical Line Background */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-1/2 hidden md:block" />
        <div className="absolute left-4 top-0 bottom-0 w-px bg-primary/10 md:hidden -translate-x-1/2" />
        
        {/* Animated Green Line */}
        <motion.div 
          className="absolute left-4 md:left-1/2 top-0 w-1 bg-accent -translate-x-1/2 origin-top hidden md:block z-0" 
          style={{ height: lineHeight }}
        />
        <motion.div 
          className="absolute left-4 top-0 w-1 bg-accent origin-top md:hidden z-0 -translate-x-1/2" 
          style={{ height: lineHeight }}
        />

        <div className="space-y-24">
          {stepsData.map((step, idx) => (
            <div key={idx} className="relative flex flex-col md:flex-row items-center gap-12 group">
              
              {/* Step Number Badge */}
              <motion.div 
                initial={{ scale: 1, borderColor: 'rgba(10, 30, 18, 0.1)', color: '#0A1E12' }}
                whileInView={{ 
                  scale: [1, 1.4, 1.1], 
                  borderColor: '#1E4E30', 
                  color: '#1E4E30',
                  borderWidth: '2px',
                  backgroundColor: '#F4F6F4'
                }}
                viewport={{ margin: "-30% 0px -30% 0px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border rounded-full flex items-center justify-center font-display font-bold text-lg shadow-sm z-10"
              >
                {idx + 1}
              </motion.div>

              {/* Text Content */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:order-2 md:pl-16'}`}>
                <span className="text-[10px] md:text-xs uppercase font-mono font-bold tracking-widest text-primary/70">
                  {step.overline}
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-primary uppercase mt-3 mb-4">
                  {step.title}
                </h3>
                <p className="text-sm text-primary/70 font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Image Content */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:pl-16' : 'md:order-1 md:pr-16'}`}>
                <div className="rounded-3xl overflow-hidden shadow-premium border border-primary/5 aspect-[4/3] w-full group-hover:shadow-2xl transition-shadow duration-500">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
