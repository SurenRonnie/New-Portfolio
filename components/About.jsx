'use client';
import { motion } from 'motion/react';
import { CheckCircle2, Mail, Phone } from 'lucide-react';

const highlights = [
  'DeFi & Blockchain',
  'AI Integration',
  'Technical SEO',
  'Full Stack Development',
];

const timeline = [
  {
    period: 'Sep 2021 - Present',
    role: 'Senior Frontend Developer',
    desc: 'Leading the development of high-performance web applications using React.js, Next.js, and Astro.js. Specialized in DeFi and NFT platforms.',
    active: true,
  },
  {
    period: '2023 - 2024',
    role: 'Node.js Developer (Backend)',
    desc: 'Contributed to backend development using Node.js, Express.js, and MongoDB. Integrated RESTful APIs and managed complex state for data-driven applications.',
    active: false,
  },
];

export const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-black/60 backdrop-blur-sm relative">
      <div className="shell grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-3 sm:mb-4 text-xs sm:text-sm">About Me</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 tracking-tighter leading-tight">
            Professional <span className="text-[#BFFF0B]">Problem Solutions</span>{' '}
            <br className="hidden sm:block" />
            For Digital Products
          </h3>

          {/* Flows below the heading at every width — absolutely positioning
              this collided with "For Digital Products" on laptop screens. */}
          <div className="inline-block bg-[#BFFF0B] px-6 py-4 rounded-2xl lg:px-8 lg:py-6 lg:rounded-3xl">
            <div className="text-3xl lg:text-4xl font-bold text-black">100%</div>
            <div className="text-xs lg:text-sm font-bold text-black/60 uppercase tracking-widest">Success Rate</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="min-w-0"
        >
          <p className="text-white/90 text-sm sm:text-base mb-8 leading-relaxed">
            I am a Senior Frontend Developer at Osiz Technologies with a proven track record of
            delivering scalable, user-focused interfaces across NFT ecosystems, crypto exchanges,
            and trading platforms. I excel in modern JavaScript frameworks and AI integration.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/80">
                <CheckCircle2 className="w-5 h-5 text-[#BFFF0B] shrink-0" />
                <span className="font-medium text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:gsurendar23@gmail.com"
              className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:border-[#BFFF0B]/40 transition-colors min-w-0"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#BFFF0B] rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest">Email Us</div>
                <div className="text-white font-medium text-sm truncate">gsurendar23@gmail.com</div>
              </div>
            </a>

            <a
              href="tel:+919003633972"
              className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:border-[#BFFF0B]/40 transition-colors min-w-0"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#BFFF0B] rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-black" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest">Make A Call</div>
                <div className="text-white font-medium text-sm truncate">+91 9003633972</div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Experience Timeline */}
      <div className="shell mt-16 sm:mt-20 lg:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0a0a0a] border border-white/10 rounded-3xl sm:rounded-[40px] p-5 sm:p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <h4 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-2 text-xs sm:text-sm">Experience Timeline</h4>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tighter">Osiz Technologies Journey</h3>
            </div>
            <div className="self-start md:self-auto px-5 py-2 bg-[#BFFF0B]/10 border border-[#BFFF0B]/20 rounded-full text-[#BFFF0B] text-xs sm:text-sm font-bold uppercase tracking-widest whitespace-nowrap">
              4.5+ Years Total
            </div>
          </div>

          <div className="relative space-y-8 sm:space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {timeline.map((item) => (
              <div
                key={item.role}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black text-[#BFFF0B] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-[#BFFF0B] transition-colors duration-500">
                  <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-[#BFFF0B] animate-pulse' : 'bg-white/20'}`} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:border-[#BFFF0B]/30 transition-all duration-500">
                  <time className={`block mb-2 font-bold text-xs sm:text-sm uppercase tracking-widest ${item.active ? 'text-[#BFFF0B]' : 'text-white/40'}`}>
                    {item.period}
                  </time>
                  <div className="text-lg sm:text-xl font-bold text-white mb-2">{item.role}</div>
                  <p className="text-white/40 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
