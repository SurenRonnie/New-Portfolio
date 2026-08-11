'use client';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="py-12 sm:py-16 lg:py-20 bg-black border-t border-white/5 relative z-10">
      <div className="shell">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 sm:pt-10 border-t border-white/5 text-white/40 text-xs sm:text-sm font-medium text-center md:text-left">
          <div>
            Copyright @2026, <span className="text-[#BFFF0B]">Surendar G</span>. All Rights Reserved
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:gap-8">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a
              href="https://www.linkedin.com/in/surendar-g-a97741276"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
