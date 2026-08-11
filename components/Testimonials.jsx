'use client';
import { motion } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Rodolfo E. Shannon',
    role: 'CEO & Founder',
    content: 'At vero eoset accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti dolores.',
    image: 'https://i.pravatar.cc/150?u=1'
  },
  {
    name: 'Kenneth J. Dutton',
    role: 'Web Developer',
    content: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
    image: 'https://i.pravatar.cc/150?u=2'
  },
  {
    name: 'Sarah L. Miller',
    role: 'Marketing Director',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    image: 'https://i.pravatar.cc/150?u=3'
  }
];

export const Testimonials = () => {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#0a0a0a] relative z-10">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-3 sm:mb-4 text-xs sm:text-sm">Clients Testimonials</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 tracking-tighter">
              I&apos;ve <span className="text-[#BFFF0B]">1253+ Clients</span> <br className="hidden sm:block" />
              Feedback
            </h3>
            <p className="text-white/60 mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base">
              My commitment to excellence has earned me the trust of clients worldwide. Here&apos;s what some of them have to say about our collaboration.
            </p>
            <div className="flex gap-4">
              <button onClick={prev} aria-label="Previous testimonial" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#BFFF0B] hover:text-black transition-all">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={next} aria-label="Next testimonial" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#BFFF0B] hover:text-black transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* pt-8 reserves room for the quote badge, which hangs outside the
              card and used to be clipped at the viewport edge on mobile. */}
          <div className="relative pt-8 lg:pt-0">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-3xl sm:rounded-[40px] relative"
            >
              <div className="absolute -top-6 left-4 sm:-left-6 w-14 h-14 sm:w-16 sm:h-16 bg-[#BFFF0B] rounded-full flex items-center justify-center">
                <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-black" />
              </div>

              <div className="flex gap-1 mb-5 sm:mb-6 mt-4 sm:mt-0">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#BFFF0B] text-[#BFFF0B]" />
                ))}
              </div>

              <p className="text-base sm:text-xl text-white/80 italic mb-8 sm:mb-10 leading-relaxed">
                &ldquo;{testimonials[active].content}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <img src={testimonials[active].image} alt="" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#BFFF0B] shrink-0" />
                <div className="min-w-0">
                  <div className="text-white font-bold text-sm sm:text-base truncate">{testimonials[active].name}</div>
                  <div className="text-white/40 text-[11px] sm:text-sm uppercase tracking-widest truncate">{testimonials[active].role}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
