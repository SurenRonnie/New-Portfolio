'use client';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    period: 'Sep 2021 - Mar 2026',
    role: 'Senior Programmer (Frontend Developer)',
    company: 'Osiz Technologies',
    description: 'Developed and maintained scalable web apps using React.js, Next.js, Astro, and Vite.js. Worked on DeFi, NFT marketplaces, and crypto exchanges.'
  },
  {
    period: '2014 - 2018',
    role: 'B.E. Civil Engineering',
    company: 'Vickram College of Engineering',
    description: 'Completed Bachelor of Engineering with a GPA of 6.5/10.'
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 bg-black/60 backdrop-blur-sm relative z-10">
      <div className="shell">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-3 sm:mb-4 text-xs sm:text-sm">My Resume</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Real <span className="text-[#BFFF0B]">Problem Solutions</span> Experience
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 0 }}
              className="group bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:border-[#BFFF0B]/50 transition-all duration-500"
            >
              <div className="flex flex-wrap justify-between items-start gap-3 mb-5 sm:mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#BFFF0B] transition-colors shrink-0">
                  <Briefcase className="w-6 h-6 text-white group-hover:text-black" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white/40 uppercase tracking-widest">{exp.period}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">{exp.role}</h4>
              <div className="text-[#BFFF0B] font-medium mb-4 text-sm sm:text-base">{exp.company}</div>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
