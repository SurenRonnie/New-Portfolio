'use client';
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
  },
    {
    title: 'Osiz — AI-Powered Platform',
    category: 'Next.js, nodejs, seo',
    image: 'https://picsum.photos/seed/aimodel/800/600'
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
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
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-2">{project.category}</div>
              <h4 className="text-2xl font-semibold text-white">{project.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
