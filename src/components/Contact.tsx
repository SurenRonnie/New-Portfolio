import { motion } from 'motion/react';
import { Send, MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9\s\-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSending(true);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.fullName,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          to_email: 'gsurendar23@gmail.com',
        },
        PUBLIC_KEY
      );

      setSuccessMsg('✅ Message sent successfully! I will get back to you soon.');
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      setErrorMsg('❌ Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

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
                  
                  
                  <a   href="mailto:gsurendar23@gmail.com"
                    className="text-white font-medium hover:text-[#BFFF0B] transition-colors">
                    gsurendar23@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#BFFF0B]" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">Phone Number</div>
                  
                    
                  <a href="tel:+919003633972"
                    className="text-white font-medium hover:text-[#BFFF0B] transition-colors">
                    +91 9003633972
                  </a>
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
            <form ref={formRef} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Surendar G"
                    className={`w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:border-[#BFFF0B] outline-none transition-all ${
                      errors.fullName ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="gsurendar23@gmail.com"
                    className={`w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:border-[#BFFF0B] outline-none transition-all ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9003633972"
                    className={`w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:border-[#BFFF0B] outline-none transition-all ${
                      errors.phone ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className={`w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:border-[#BFFF0B] outline-none transition-all ${
                      errors.subject ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className={`w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:border-[#BFFF0B] outline-none transition-all resize-none ${
                    errors.message ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {successMsg && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl px-6 py-4 text-green-400 text-sm">
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-6 py-4 text-red-400 text-sm">
                  {errorMsg}
                </div>
              )}

              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isSending}
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                className={`w-full py-5 rounded-full font-bold flex items-center justify-center gap-2 transition-all ${
                  isSending
                    ? 'bg-[#BFFF0B]/50 text-black/50 cursor-not-allowed'
                    : 'bg-[#BFFF0B] text-black cursor-pointer'
                }`}
              >
                {isSending ? 'Sending...' : 'Send Us Message'} <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};