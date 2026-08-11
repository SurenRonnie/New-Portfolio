'use client';
import { motion } from 'framer-motion';
import { ImagesScrollingAnimation } from './ui/images-scrolling-animation';

const projects = [
  {
    id: 1,
    title: 'GDC — Global Digital City',
    cat: 'Next.js, Unity WebGL, SEO',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 2,
    title: 'Parifi — Crypto Trading Platform',
    cat: 'React.js, Real-Time Data',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 3,
    title: 'Afrigomall — E-commerce Platform',
    cat: 'React.js, Crypto Wallet',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 4,
    title: 'AI Model Integration',
    cat: 'Next.js, Ollama AI',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center',
  },
  {
    id: 5,
    title: 'Osiz — AI-Powered Platform',
    cat: 'Next.js, Node.js, SEO',
    img: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop&crop=center',
  },
];

export function PortfolioGallerySection() {
  return (
    <section id="portfolio" className="w-full bg-[#0a0a0a] relative z-10">
      {/* Section Header */}
      <div className="sticky top-0 z-20 w-full pt-20 sm:pt-24 pb-6 sm:pb-8 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="shell text-center">
          <motion.span
            className="text-[10px] sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#BFFF0B]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Latest Work
          </motion.span>
          <motion.h2
            className="mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Explore My Popular Projects
          </motion.h2>
        </div>
      </div>

      {/* Scrolling stacked cards */}
      <ImagesScrollingAnimation projects={projects} />
    </section>
  );
}
