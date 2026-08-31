'use client';
import { motion } from 'motion/react';
import { Send, MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState, useRef } from 'react';
import { validateContact } from '@/lib/contactSchema';

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  website: '', // honeypot — must stay empty
};

export const Contact = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    // Validate on the client for instant feedback; the API re-validates with
    // this exact schema, so the server never trusts what arrives.
    const { success, errors: validationErrors } = validateContact(formData);
    if (!success) {
      setErrors(validationErrors);
      return;
    }

    setIsSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Field-level errors from the server take precedence over a banner.
        if (payload.errors) setErrors(payload.errors);
        setErrorMsg(payload.message || 'Failed to send message. Please try again later.');
        return;
      }

      setSuccessMsg(payload.message || 'Message sent successfully! I will get back to you soon.');
      setFormData(EMPTY_FORM);
      setErrors({});
    } catch {
      setErrorMsg('Network error. Check your connection and try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-[#0a0a0a] relative z-10">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-3 sm:mb-4 text-xs sm:text-sm">Get In Touch</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 tracking-tighter leading-tight">
              Let&apos;s Talk For your <br className="hidden sm:block" />
              <span className="text-[#BFFF0B]">Next Projects</span>
            </h3>

            <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#BFFF0B]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest">Location</div>
                  <div className="text-white font-medium text-sm sm:text-base">Madurai, Tamil Nadu</div>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#BFFF0B]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest">Email Address</div>
                  <a
                    href="mailto:gsurendar23@gmail.com"
                    className="block text-white font-medium hover:text-[#BFFF0B] transition-colors text-sm sm:text-base truncate"
                  >
                    gsurendar23@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#BFFF0B]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest">Phone Number</div>
                  <a
                    href="tel:+919003633972"
                    className="block text-white font-medium hover:text-[#BFFF0B] transition-colors text-sm sm:text-base"
                  >
                    +91 9003633972
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href={i === 3 ? "https://www.linkedin.com/in/surendar-g-a97741276" : "#"} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#BFFF0B] hover:text-black transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[40px]">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Honeypot: hidden from people, irresistible to bots. A filled
                  value fails server validation and the request is rejected. */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Surendar G"
                    className={`w-full bg-white/5 border rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 text-base text-white focus:border-[#BFFF0B] outline-none transition-all ${
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
                    className={`w-full bg-white/5 border rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 text-base text-white focus:border-[#BFFF0B] outline-none transition-all ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Phone Number</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9003633972"
                    className={`w-full bg-white/5 border rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 text-base text-white focus:border-[#BFFF0B] outline-none transition-all ${
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
                    className={`w-full bg-white/5 border rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 text-base text-white focus:border-[#BFFF0B] outline-none transition-all ${
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
                  className={`w-full bg-white/5 border rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 text-base text-white focus:border-[#BFFF0B] outline-none transition-all resize-none ${
                    errors.message ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {successMsg && (
                <div role="status" aria-live="polite" className="bg-green-500/10 border border-green-500/30 rounded-2xl px-6 py-4 text-green-400 text-sm">
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div role="alert" aria-live="assertive" className="bg-red-500/10 border border-red-500/30 rounded-2xl px-6 py-4 text-red-400 text-sm">
                  {errorMsg}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                className={`w-full py-4 sm:py-5 rounded-full font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base ${
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
