import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'GDC — Global Digital City',
    category: 'Next.js, Unity WebGL, SEO',
    image: 'https://picsum.photos/seed/gdc/800/600'
  },
  {
    title: 'Parifi — Crypto Trading Platform',
    category: 'React.js, Real-Time Data',
    image: 'https://picsum.photos/seed/parifi/800/600'
  },
  {
    title: 'Afrigomall — E-commerce Platform',
    category: 'React.js, Crypto Wallet',
    image: 'https://picsum.photos/seed/afrigo/800/600'
  },
  {
    title: 'AI Model Integration',
    category: 'Next.js, Ollama AI',
    image: 'https://picsum.photos/seed/aimodel/800/600'
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-4 text-sm">Latest Works</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
              Explore My Popular <span className="text-[#BFFF0B]">Projects</span>
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#BFFF0B] text-black px-8 py-4 rounded-full font-bold"
          >
            View More Projects
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-[#1a1a1a]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#BFFF0B] rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    <ArrowUpRight className="w-8 h-8 text-black" />
                  </div>
                </div>
              </div>
              <div className="text-xs uppercase tracking-widest text-[#BFFF0B] font-bold mb-2">{project.category}</div>
              <h4 className="text-3xl font-bold text-white group-hover:text-[#BFFF0B] transition-colors">{project.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
