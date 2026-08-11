'use client';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-black/90 backdrop-blur-md py-3 border-b border-white/10' : 'bg-gradient-to-b from-black/70 to-transparent py-4 sm:py-6'}`}>
      <div className="shell flex items-center justify-between gap-4">
        <a
          href="#home"
          className="text-base sm:text-lg font-bold tracking-tight text-white shrink-0"
        >
          Surendar<span className="text-[#BFFF0B]">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-white/70 hover:text-[#BFFF0B] transition-colors whitespace-nowrap"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#BFFF0B] text-black text-sm font-bold px-5 py-2.5 rounded-full whitespace-nowrap"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-black border-b border-white/10 px-4 sm:px-6 py-6 flex flex-col gap-1 md:hidden max-h-[calc(100svh-4rem)] overflow-y-auto"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-white/70 hover:text-[#BFFF0B] py-3 border-b border-white/5 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-[#BFFF0B] text-black text-center font-bold px-6 py-3.5 rounded-full"
          >
            Hire Me
          </a>
        </motion.div>
      )}
    </nav>
  );
};
