import { motion } from 'motion/react';
import { Palette, Globe, Smartphone, Play, Search, Layout } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Frontend Development',
    icon: Layout,
    desc: 'Specializing in modern JavaScript frameworks like React.js, Next.js, and Astro.js for high-performance apps.'
  },
  {
    id: '02',
    title: 'Blockchain Solutions',
    icon: Globe,
    desc: 'Developing NFT marketplaces, crypto exchanges, and DeFi platforms with secure integrations.'
  },
  {
    id: '03',
    title: 'AI Integration',
    icon: Smartphone,
    desc: 'Integrating AI models like Ollama AI to create intelligent features, chatbots, and automated insights.'
  },
  {
    id: '04',
    title: 'SEO Optimization',
    icon: Search,
    desc: 'Technical SEO, site audits, and page speed optimization to improve search engine rankings.'
  },
  {
    id: '05',
    title: 'Backend Development',
    icon: Globe,
    desc: 'Building scalable RESTful APIs and managing databases with Node.js, Express, and MongoDB.'
  },
  {
    id: '06',
    title: 'Responsive UI Design',
    icon: Layout,
    desc: 'Ensuring cross-browser compatibility and seamless user experiences across all devices.'
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-4 text-sm">Popular Services</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            My <span className="text-[#BFFF0B]">Special Service</span> For your <br />
            Business Development
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-[#0a0a0a] border border-white/5 rounded-3xl hover:border-[#BFFF0B]/30 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 text-4xl font-bold text-white/5 group-hover:text-[#BFFF0B]/10 transition-colors">
                {service.id}
              </div>
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#BFFF0B] transition-colors">
                <service.icon className="w-7 h-7 text-white group-hover:text-black" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
              <p className="text-white/40 leading-relaxed">{service.desc}</p>
              
              <div className="mt-8">
                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#BFFF0B] group-hover:border-[#BFFF0B] transition-all">
                  <Globe className="w-4 h-4 text-white group-hover:text-black" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
