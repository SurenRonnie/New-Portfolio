'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Download, Volume2, VolumeX } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Hero = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // ─── Scroll tracker ───────────────────────────────────────────────────────
  // Hero is GSAP-pinned for 3000px. scrollY goes 0 → 3000 while hero is visible.
  const { scrollY } = useScroll();

  // Parallax for right column
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // ─── Word-by-word bright white highlight ─────────────────────────────────
  // "Surendar G" is always full white.
  // Each remaining word gets a 500px scroll window to fade dim → bright.
  // [start-hold, fade-start, fade-end]
  const seniorOpacity    = useTransform(scrollY, [50,  300,  550],  [0.15, 0.15, 1]);
  const frontendOpacity  = useTransform(scrollY, [550, 800,  1050], [0.15, 0.15, 1]);
  const developerOpacity = useTransform(scrollY, [1050,1300, 1550], [0.15, 0.15, 1]);
  const descOpacity      = useTransform(scrollY, [1550,1800, 2050], [0.15, 0.15, 1]);

  // Glow filter synced with opacity ramp
  const seniorGlow    = useTransform(scrollY, [300,  550],  ["drop-shadow(0 0 0px rgba(255,255,255,0))",  "drop-shadow(0 0 24px rgba(255,255,255,0.55))"]);
  const frontendGlow  = useTransform(scrollY, [800,  1050], ["drop-shadow(0 0 0px rgba(255,255,255,0))",  "drop-shadow(0 0 24px rgba(255,255,255,0.55))"]);
  const developerGlow = useTransform(scrollY, [1300, 1550], ["drop-shadow(0 0 0px rgba(255,255,255,0))",  "drop-shadow(0 0 24px rgba(255,255,255,0.55))"]);
  const descGlow      = useTransform(scrollY, [1800, 2050], ["drop-shadow(0 0 0px rgba(255,255,255,0))",  "drop-shadow(0 0 24px rgba(255,255,255,0.55))"]);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Surendar_G_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      if (videoRef.current) videoRef.current.muted = !prev;
      return !prev;
    });
  };

  // ─── GSAP: pin + video only (NO text animation) ───────────────────────────
  useEffect(() => {
    let scrollTimeout = null;

    const ctx = gsap.context(() => {
      // Pin hero for 3000px of scroll space
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=3000',
        pin: true,
      });

      // Video playback control
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: () => {
          const portfolio = document.querySelector('#portfolio');
          return portfolio ? portfolio.offsetTop : '+=6000';
        },
        onUpdate: (self) => {
          if (!videoRef.current) return;
          if (self.direction === 1) {
            if (videoRef.current.paused && !videoRef.current.ended) {
              videoRef.current.play().catch(() => {});
            }
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              if (videoRef.current && !videoRef.current.paused) {
                videoRef.current.pause();
              }
            }, 150);
          } else if (self.direction === -1) {
            if (!videoRef.current.paused) videoRef.current.pause();
            if (window.scrollY < 100) videoRef.current.currentTime = 0;
          }
        },
        onLeave: () => {
          if (videoContainerRef.current) {
            gsap.to(videoContainerRef.current, { opacity: 0, duration: 0.3 });
          }
          if (videoRef.current) videoRef.current.pause();
        },
        onEnterBack: () => {
          if (videoContainerRef.current) {
            gsap.to(videoContainerRef.current, { opacity: 1, duration: 0.3 });
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <>
      {/* Fixed background video */}
      <div
        ref={videoContainerRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black/90"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover transform-gpu [backface-visibility:hidden]"
          src="/intro-new.mp4"
          playsInline
          muted={isMuted}
          preload="auto"
        />
      </div>

      <section
        id="home"
        ref={sectionRef}
        className="relative h-screen flex items-center pt-20 overflow-hidden bg-transparent"
      >
        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-16 right-37 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/20 transition-all cursor-pointer shadow-2xl"
        >
          {isMuted
            ? <VolumeX className="text-white w-6 h-6" />
            : <Volume2 className="text-[#BFFF0B] w-6 h-6" />}
        </button>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative z-10">
          {/* ── Left: text ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="z-10"
          >
            <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-4 text-sm">
              Hello, i'm
            </h2>

            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter leading-none flex flex-col">

              {/* ── Always fully bright white ─────────────────────────── */}
              <span className="text-white">Surendar G</span>

              {/* ── Lights up on scroll ───────────────────────────────── */}
              <motion.span
                style={{ opacity: seniorOpacity, filter: seniorGlow }}
                className="text-white"
              >
                Senior
              </motion.span>

              <motion.span
                style={{ opacity: frontendOpacity, filter: frontendGlow }}
                className="text-white"
              >
                Frontend
              </motion.span>

              <motion.span
                style={{ opacity: developerOpacity, filter: developerGlow }}
                className="text-white"
              >
                Developer
              </motion.span>
            </h1>

            <motion.p
              style={{ opacity: descOpacity, filter: descGlow }}
              className="text-white text-lg max-w-lg mb-8 leading-relaxed"
            >
              Results-driven Frontend Developer with 4 years of experience building
              high-performance web applications, specializing in React.js, Next.js,
              and blockchain platforms.
            </motion.p>

            <div className="flex flex-wrap gap-6 items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#BFFF0B] text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 group"
              >
                Hire Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <button
                onClick={handleDownloadResume}
                className="text-white font-medium border-b border-white/20 pb-1 hover:border-[#BFFF0B] transition-colors flex items-center gap-2 bg-transparent cursor-pointer"
              >
                Download Resume <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* ── Right: badges + stats ──────────────────────────────────── */}
          <div className="relative flex justify-center items-center h-[500px]">
            <motion.div
              style={{ y: y2 }}
              className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] z-10"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl"
              >
                <div className="text-3xl font-bold text-[#BFFF0B]">4+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Years Experience</div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: y1 }}
              className="absolute right-[-16px] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 z-0"
            >
              <div className="text-right">
                <div className="text-5xl font-bold text-white">4+</div>
                <div className="text-xs uppercase tracking-widest text-white/40">Years Of Experience</div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-white">8k+</div>
                <div className="text-xs uppercase tracking-widest text-white/40">Hours Of Coding</div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-white">99%+</div>
                <div className="text-xs uppercase tracking-widest text-white/40">Success Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
