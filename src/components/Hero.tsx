import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { useRef } from 'react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-4 text-sm">Hello, i'm</h2>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter leading-none">
            Surendar G <br />
            <span className="text-white/40">Senior Frontend Developer</span>
          </h1>
          <p className="text-white/60 text-lg max-w-lg mb-8 leading-relaxed">
            Results-driven Frontend Developer with 4 years of experience building high-performance web applications, specializing in React.js, Next.js, and blockchain platforms.
          </p>
          
          <div className="flex flex-wrap gap-6 items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#BFFF0B] text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 group"
            >
              Hire Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <a href="#" className="text-white font-medium border-b border-white/20 pb-1 hover:border-[#BFFF0B] transition-colors flex items-center gap-2">
              Download Resume <Download className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        <div className="relative flex justify-center items-center h-[500px]">
          {/* Parallax Image Container - Now a placeholder for the traveling image */}
          <motion.div 
            style={{ y: y2 }}
            className="hero-image-target relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] z-10"
          >
            <div className="absolute inset-0 bg-[#BFFF0B] rounded-full opacity-20 blur-3xl animate-pulse" />
            <div className="relative w-full h-full rounded-full border-[12px] border-white/5 overflow-hidden bg-[#1a1a1a] opacity-0">
              {/* Image will be rendered by TravelingImage component */}
            </div>
            
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl"
            >
              <div className="text-3xl font-bold text-[#BFFF0B]">4+</div>
              <div className="text-[10px] uppercase tracking-widest text-white/60">Years Experience</div>
            </motion.div>
          </motion.div>

          {/* Background Stats */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute right-[-16px] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 z-0"
          >
            <div className="text-right">
              <div className="text-5xl font-bold text-white">4+</div>
              <div className="text-xs uppercase tracking-widest text-white/40">Years Of Experience</div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-white">8k+</div>
              <div className="text-xs uppercase tracking-widest text-white/40">Hours Of Coding</div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-white">99%+</div>
              <div className="text-xs uppercase tracking-widest text-white/40">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
