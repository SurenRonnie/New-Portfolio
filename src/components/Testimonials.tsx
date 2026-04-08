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
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-4 text-sm">Clients Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter">
              I've <span className="text-[#BFFF0B]">1253+ Clients</span> <br />
              Feedback
            </h3>
            <p className="text-white/60 mb-10 leading-relaxed">
              My commitment to excellence has earned me the trust of clients worldwide. Here's what some of them have to say about our collaboration.
            </p>
            <div className="flex gap-4">
              <button onClick={prev} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#BFFF0B] hover:text-black transition-all">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={next} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#BFFF0B] hover:text-black transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="relative">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 p-10 rounded-[40px] relative"
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#BFFF0B] rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8 text-black" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#BFFF0B] text-[#BFFF0B]" />
                ))}
              </div>

              <p className="text-xl text-white/80 italic mb-10 leading-relaxed">
                "{testimonials[active].content}"
              </p>

              <div className="flex items-center gap-4">
                <img src={testimonials[active].image} alt="" className="w-14 h-14 rounded-full border-2 border-[#BFFF0B]" />
                <div>
                  <div className="text-white font-bold">{testimonials[active].name}</div>
                  <div className="text-white/40 text-sm uppercase tracking-widest">{testimonials[active].role}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
