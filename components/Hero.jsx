'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Download, Volume2, VolumeX } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: '4+', label: 'Years Of Experience' },
  { value: '8k+', label: 'Hours Of Coding' },
  { value: '99%+', label: 'Success Rate' },
];

// How far the hero stays pinned, per breakpoint. Mobile gets a much shorter
// runway — 3000px of pinned scroll on a phone reads as a frozen page.
const getPinDistance = () => {
  if (typeof window === 'undefined') return 3000;
  if (window.innerWidth >= 1024) return 3000;
  if (window.innerWidth >= 640) return 2000;
  return 1200;
};

export const Hero = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [pinDistance, setPinDistance] = useState(3000);

  const { scrollY } = useScroll();

  // Parallax for the desktop stats column.
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const p = pinDistance;
  const seniorOpacity = useTransform(scrollY, [p * 0.017, p * 0.10, p * 0.183], [0.15, 0.15, 1]);
  const frontendOpacity = useTransform(scrollY, [p * 0.183, p * 0.267, p * 0.35], [0.15, 0.15, 1]);
  const developerOpacity = useTransform(scrollY, [p * 0.35, p * 0.433, p * 0.517], [0.15, 0.15, 1]);
  const descOpacity = useTransform(scrollY, [p * 0.517, p * 0.60, p * 0.683], [0.15, 0.15, 1]);

  const seniorGlow = useTransform(scrollY, [p * 0.10, p * 0.183], ["drop-shadow(0 0 0px rgba(255,255,255,0))", "drop-shadow(0 0 24px rgba(255,255,255,0.55))"]);
  const frontendGlow = useTransform(scrollY, [p * 0.267, p * 0.35], ["drop-shadow(0 0 0px rgba(255,255,255,0))", "drop-shadow(0 0 24px rgba(255,255,255,0.55))"]);
  const developerGlow = useTransform(scrollY, [p * 0.433, p * 0.517], ["drop-shadow(0 0 0px rgba(255,255,255,0))", "drop-shadow(0 0 24px rgba(255,255,255,0.55))"]);
  const descGlow = useTransform(scrollY, [p * 0.60, p * 0.683], ["drop-shadow(0 0 0px rgba(255,255,255,0))", "drop-shadow(0 0 24px rgba(255,255,255,0.55))"]);

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

  // Track breakpoint so the pin distance and the text ramps stay in sync.
  useEffect(() => {
    const sync = () => setPinDistance(getPinDistance());
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  // ─── GSAP: pin + video playback ───────────────────────────────────────────
  useEffect(() => {
    let scrollTimeout = null;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${pinDistance}`,
        pin: true,
        // Let the pinned hero reflow instead of baking in a stale height.
        invalidateOnRefresh: true,
      });

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
              videoRef.current.play().catch(() => { });
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
  }, [pinDistance]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <>
      {/* ── Fixed background video + readability scrim ───────────────────── */}
      <div
        ref={videoContainerRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover transform-gpu [backface-visibility:hidden]"
          src="/intro-new.mp4"
          playsInline
          muted={isMuted}
          preload="auto"
        />
        {/* No scrim — the video plays at full brightness. Hero copy stays
            legible via text-shadow instead of a tint over the footage. */}
      </div>

      {/* Mute toggle — fixed so it stays reachable while the video plays. */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute intro video' : 'Mute intro video'}
        className="fixed bottom-5 right-4 sm:bottom-8 sm:right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 sm:p-4 rounded-full border border-white/20 transition-all cursor-pointer shadow-2xl"
      >
        {isMuted
          ? <VolumeX className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          : <Volume2 className="text-[#BFFF0B] w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

      <section
        id="home"
        ref={sectionRef}
        className="relative min-h-[100svh] flex items-center pt-24 pb-16 sm:pt-28 lg:pt-20 overflow-hidden bg-transparent"
      >
        <div className="shell grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-10 lg:gap-12 items-center w-full relative z-10">
          {/* ── Left: text ─────────────────────────────────────────────── */}
          {/* text-shadow inherits, so one declaration covers the whole column.
              Replaces the old scrim: keeps copy readable without tinting the video. */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="z-10 min-w-0 [text-shadow:0_2px_16px_rgba(0,0,0,0.9),0_1px_3px_rgba(0,0,0,0.8)]"
          >
            <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-3 sm:mb-4 text-xs sm:text-sm">
              Hello, i&apos;m
            </h2>

            <h1 className="text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tighter flex flex-col">
              <span className="text-white">Surendar G</span>

              <motion.span style={{ opacity: seniorOpacity, filter: seniorGlow }} className="text-white">
                Senior
              </motion.span>
              <motion.span style={{ opacity: frontendOpacity, filter: frontendGlow }} className="text-white">
                Frontend
              </motion.span>
              <motion.span style={{ opacity: developerOpacity, filter: developerGlow }} className="text-white">
                Developer
              </motion.span>
            </h1>

            <motion.p
              style={{ opacity: descOpacity, filter: descGlow }}
              className="text-white/90 text-sm sm:text-base md:text-lg max-w-lg mb-7 sm:mb-8 leading-relaxed"
            >
              Results-driven Frontend Developer with 4 years of experience building
              high-performance web applications, specializing in React.js, Next.js,
              and blockchain platforms.
            </motion.p>

            <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#BFFF0B] text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold flex items-center gap-2 group text-sm sm:text-base"
              >
                Hire Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <button
                onClick={handleDownloadResume}
                className="text-white font-medium border-b border-white/20 pb-1 hover:border-[#BFFF0B] transition-colors flex items-center gap-2 bg-transparent cursor-pointer text-sm sm:text-base"
              >
                Download Resume <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile / tablet stat row — replaces the floating desktop column. */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-md lg:hidden">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50 leading-tight mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: desktop-only stats column ───────────────────────── */}
          <motion.div
            style={{ y: y1 }}
            className="hidden lg:flex flex-col gap-10 xl:gap-12 justify-self-end text-right"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl self-end"
            >
              <div className="text-3xl font-bold text-[#BFFF0B]">4+</div>
              <div className="text-[10px] uppercase tracking-widest text-white/60">Years Experience</div>
            </motion.div>

            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl xl:text-5xl font-bold text-white">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/40">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};
