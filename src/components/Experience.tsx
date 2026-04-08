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
    <section id="experience" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-4 text-sm">My Resume</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Real <span className="text-[#BFFF0B]">Problem Solutions</span> Experience
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-[#BFFF0B]/50 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#BFFF0B] transition-colors">
                  <Briefcase className="w-6 h-6 text-white group-hover:text-black" />
                </div>
                <span className="text-sm font-bold text-white/40 uppercase tracking-widest">{exp.period}</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{exp.role}</h4>
              <div className="text-[#BFFF0B] font-medium mb-4">{exp.company}</div>
              <p className="text-white/60 leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
