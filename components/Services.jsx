'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Layout, Globe, Smartphone, Search, Code, Palette } from 'lucide-react';

const services = [
  {
    id: '01',
    letter: 'F',
    title: 'Frontend Development',
    icon: Layout,
    desc: 'Specializing in modern JavaScript frameworks like React.js, Next.js, and Astro.js for high-performance apps.',
    visual: 'from-[#c6ff00] via-[#f1ff89] to-[#ffffff]',
    x: -0.85,
    y: 40
  },
  {
    id: '02',
    letter: 'B',
    title: 'Blockchain Solutions',
    icon: Globe,
    desc: 'Developing NFT marketplaces, crypto exchanges, and DeFi platforms with secure integrations.',
    visual: 'from-[#101010] via-[#7d30ff] to-[#eeeeee]',
    x: 0.4,
    y: 440
  },
  {
    id: '03',
    letter: 'A',
    title: 'AI Integration',
    icon: Smartphone,
    desc: 'Integrating AI models like Ollama AI to create intelligent features, chatbots, and automated insights.',
    visual: 'from-[#d6b46b] via-[#f6dfae] to-[#ffffff]',
    x: -0.94,
    y: 900
  },
  {
    id: '04',
    letter: 'S',
    title: 'SEO Optimization',
    icon: Search,
    desc: 'Technical SEO, site audits, and page speed optimization to improve search engine rankings.',
    visual: 'from-[#ffe14d] via-[#a6e0ff] to-[#fff7a3]',
    x: -0.02,
    y: 1280
  },
  {
    id: '05',
    letter: 'B',
    title: 'Backend Development',
    icon: Code,
    desc: 'Building scalable RESTful APIs and managing databases with Node.js, Express, and MongoDB.',
    visual: 'from-[#121212] via-[#f3f3f3] to-[#cfcfcf]',
    x: 0.71,
    y: 1720
  },
  {
    id: '06',
    letter: 'R',
    title: 'Responsive UI Design',
    icon: Palette,
    desc: 'Ensuring cross-browser compatibility and seamless user experiences across all devices.',
    visual: 'from-[#fff1bc] via-[#f6a33b] to-[#fff7de]',
    x: -0.57,
    y: 2140
  }
];

const ServiceCard = ({ service }) => {
  return (
    <div
      className="absolute left-1/2 z-20 w-[324px]"
      style={{
        // service.x is a fraction of the usable half-width, not a fixed pixel
        // offset — fixed offsets (±860px) pushed cards off-screen on any
        // display narrower than ~1720px.
        transform: `translateX(calc(-50% + ${service.x} * (50vw - 200px)))`,
        top: service.y
      }}
    >
      <div className="min-h-[420px] rounded-[14px] bg-white p-[15px] text-black shadow-[0_24px_80px_rgba(0,0,0,0.36)]">
        <div className="mb-16 flex items-start justify-between gap-6">
          <div className="text-[72px] font-normal leading-none tracking-normal">
            {service.letter}
          </div>
          <div className={`flex h-[146px] w-[140px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-gradient-to-br ${service.visual}`}>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-black/20 bg-white/20 backdrop-blur-sm">
              <service.icon className="h-10 w-10 text-black" strokeWidth={1.8} />
            </div>
          </div>
        </div>

        <h3 className="mb-6 text-[25px] font-normal uppercase leading-none tracking-normal">
          {service.title}
        </h3>

        <p className="text-[13px] leading-[1.45] text-black">
          {service.desc}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between text-[12px] uppercase leading-none text-white">
        <span>Service</span>
        <span>{service.id} / 06</span>
      </div>
    </div>
  );
};

export const Services = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });
  const cardsY = useTransform(scrollYProgress, [0, 1], [180, -1850]);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="relative z-10 bg-black/70 backdrop-blur-sm lg:min-h-[320vh]"
    >
      {/* Section title — static on mobile, sticky full-height from lg up so the
          traveling cards have something to scroll past. */}
      <div className="relative z-10 flex w-full items-center justify-center pt-16 pb-10 lg:pointer-events-none lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div className="relative z-10 px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-3 sm:mb-4 text-xs sm:text-sm">
              Popular Services
            </h2>
            <h3 className="mx-auto max-w-[1280px] text-[2rem] font-normal leading-[1.02] tracking-normal text-white sm:text-[3rem] md:text-[4rem] lg:text-[4.25rem] xl:text-[5.5rem] 2xl:text-[6rem] lg:leading-[0.98]">
              My Special Service For your <br className="hidden sm:block" />
              Business Development.
            </h3>
          </motion.div>
        </div>

        <div className="absolute inset-0 hidden overflow-hidden lg:block">
          <motion.div
            className="absolute inset-x-0 top-0 z-20 h-screen"
            style={{ y: cardsY }}
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet: stack cards vertically */}
      <div className="relative z-40 mx-auto grid w-full max-w-2xl grid-cols-1 gap-8 px-4 pb-20 sm:grid-cols-2 sm:max-w-4xl sm:gap-6 sm:px-6 lg:hidden">
        {services.map((service) => (
          <div key={service.id} className="w-full">
            <div className="h-full rounded-[14px] bg-white p-5 text-black shadow-2xl">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="text-[3.5rem] sm:text-[4rem] font-normal leading-none">
                  {service.letter}
                </div>
                <div className={`flex aspect-square w-[38%] max-w-[132px] shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br ${service.visual}`}>
                  <service.icon className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                </div>
              </div>
              <h3 className="mb-4 text-xl sm:text-2xl font-normal uppercase leading-tight tracking-normal">
                {service.title}
              </h3>
              <p className="text-[13px] leading-[1.45] text-black">
                {service.desc}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] uppercase leading-none text-white/70">
              <span>Service</span>
              <span>{service.id} / 06</span>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Background Elements — desktop only; on phones these are
          pure paint cost and push the layout wider than the viewport. */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#BFFF0B] rounded-full blur-[150px] opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#BFFF0B] rounded-full blur-[150px] opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BFFF0B] rounded-full blur-[200px] opacity-5" />
      </div>
    </section>
  );
};
