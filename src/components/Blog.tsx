import { motion } from 'motion/react';
import { Calendar, User } from 'lucide-react';

const posts = [
  {
    title: 'Tips For Conducting User Usability Studies',
    category: 'Design',
    date: 'September 25, 2023',
    image: 'https://picsum.photos/seed/blog1/800/600'
  },
  {
    title: 'Keyboard-Only Support Assistive Technology',
    category: 'Development',
    date: 'September 28, 2023',
    image: 'https://picsum.photos/seed/blog2/800/600'
  }
];

export const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-4 text-sm">News & Blog</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Latest News & <span className="text-[#BFFF0B]">Blog</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-[#BFFF0B] text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <div className="p-10">
                <div className="flex gap-6 mb-4 text-white/40 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#BFFF0B]" /> Admin
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#BFFF0B]" /> {post.date}
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-white mb-6 group-hover:text-[#BFFF0B] transition-colors leading-tight">
                  {post.title}
                </h4>
                <button className="text-white font-bold border-b-2 border-[#BFFF0B] pb-1 hover:text-[#BFFF0B] transition-colors">
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
