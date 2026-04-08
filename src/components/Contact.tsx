import { motion } from 'motion/react';
import { Send, MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-4 text-sm">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter leading-tight">
              Let's Talk For your <br />
              <span className="text-[#BFFF0B]">Next Projects</span>
            </h3>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#BFFF0B]" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">Location</div>
                  <div className="text-white font-medium">Madurai, Tamil Nadu</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#BFFF0B]" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">Email Address</div>
                  <div className="text-white font-medium">gsurendar23@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#BFFF0B]" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">Phone Number</div>
                  <div className="text-white font-medium">+91 9003633972</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href={i === 3 ? "https://www.linkedin.com/in/surendar-g-a97741276" : "#"} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#BFFF0B] hover:text-black transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-[40px]">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="Surendar G" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#BFFF0B] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Email Address</label>
                  <input type="email" placeholder="gsurendar23@gmail.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#BFFF0B] outline-none transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Phone Number</label>
                  <input type="text" placeholder="+91 9003633972" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#BFFF0B] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Subject</label>
                  <input type="text" placeholder="Project Inquiry" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#BFFF0B] outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Message</label>
                <textarea rows={4} placeholder="Write your message..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#BFFF0B] outline-none transition-all resize-none"></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#BFFF0B] text-black py-5 rounded-full font-bold flex items-center justify-center gap-2"
              >
                Send Us Message <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
