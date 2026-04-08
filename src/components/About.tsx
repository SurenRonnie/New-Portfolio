import { motion } from 'motion/react';
import { CheckCircle2, Mail, Phone } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="about-image-target relative"
        >
          <div className="aspect-[4/5] bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/10 opacity-0">
            {/* Image will be rendered by TravelingImage component */}
          </div>
          <div className="absolute -bottom-10 -right-10 bg-[#BFFF0B] p-8 rounded-3xl hidden md:block">
            <div className="text-4xl font-bold text-black">100%</div>
            <div className="text-sm font-bold text-black/60 uppercase tracking-widest">Success Rate</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-4 text-sm">About Me</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter leading-tight">
            Professional <span className="text-[#BFFF0B]">Problem Solutions</span> <br />
            For Digital Products
          </h3>
          <p className="text-white/60 mb-8 leading-relaxed">
            I am a Senior Frontend Developer at Osiz Technologies with a proven track record of delivering scalable, user-focused interfaces across NFT ecosystems, crypto exchanges, and trading platforms. I excel in modern JavaScript frameworks and AI integration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              'DeFi & Blockchain',
              'AI Integration',
              'Technical SEO',
              'Full Stack Development'
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/80">
                <CheckCircle2 className="w-5 h-5 text-[#BFFF0B]" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="w-12 h-12 bg-[#BFFF0B] rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Email Us</div>
                <div className="text-white font-medium">gsurendar23@gmail.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="w-12 h-12 bg-[#BFFF0B] rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-xs text-white/40 uppercase tracking-widest">Make A Call</div>
                <div className="text-white font-medium">+91 9003633972</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Experience Timeline */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0a0a0a] border border-white/10 rounded-[40px] p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h4 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-2 text-sm">Experience Timeline</h4>
              <h3 className="text-3xl font-bold text-white tracking-tighter">Osiz Technologies Journey</h3>
            </div>
            <div className="px-6 py-2 bg-[#BFFF0B]/10 border border-[#BFFF0B]/20 rounded-full text-[#BFFF0B] text-sm font-bold uppercase tracking-widest">
              4.5+ Years Total
            </div>
          </div>

          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {/* Frontend Role */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black text-[#BFFF0B] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-[#BFFF0B] transition-colors duration-500">
                <div className="w-2 h-2 bg-[#BFFF0B] rounded-full animate-pulse" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#BFFF0B]/30 transition-all duration-500">
                <div className="flex items-center justify-between mb-2">
                  <time className="font-bold text-[#BFFF0B] text-sm uppercase tracking-widest">Sep 2021 - Present</time>
                </div>
                <div className="text-xl font-bold text-white mb-2">Senior Frontend Developer</div>
                <p className="text-white/40 text-sm leading-relaxed">
                  Leading the development of high-performance web applications using React.js, Next.js, and Astro.js. Specialized in DeFi and NFT platforms.
                </p>
              </div>
            </div>

            {/* Backend Role */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black text-[#BFFF0B] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-[#BFFF0B] transition-colors duration-500">
                <div className="w-2 h-2 bg-white/20 rounded-full" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#BFFF0B]/30 transition-all duration-500">
                <div className="flex items-center justify-between mb-2">
                  <time className="font-bold text-white/40 text-sm uppercase tracking-widest">2023 - 2024</time>
                </div>
                <div className="text-xl font-bold text-white mb-2">Node.js Developer (Backend)</div>
                <p className="text-white/40 text-sm leading-relaxed">
                  Contributed to backend development using Node.js, Express.js, and MongoDB. Integrated RESTful APIs and managed complex state for data-driven applications.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
