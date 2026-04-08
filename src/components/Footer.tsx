import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="py-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#BFFF0B] rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-black rounded-full" />
            </div>
            <span className="text-3xl font-bold tracking-tighter text-white">Noxfolio</span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-white/60">
            <a href="#services" className="hover:text-[#BFFF0B] transition-colors">Service</a>
            <a href="#projects" className="hover:text-[#BFFF0B] transition-colors">Projects</a>
            <a href="#pricing" className="hover:text-[#pricing] transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-[#BFFF0B] transition-colors">Contact</a>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-14 h-14 bg-[#BFFF0B] rounded-full flex items-center justify-center text-black"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 text-white/40 text-sm font-medium">
          <div>Copyright @2023, <span className="text-[#BFFF0B]">Noxfolio</span> All Rights Reserved</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
