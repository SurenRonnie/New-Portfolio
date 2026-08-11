'use client';
import { motion } from 'motion/react';
import { useEffect, useRef, useState, memo } from 'react';

const iconComponents = {
  'React.js': { color: '#61DAFB' },
  'Next.js': { color: '#ffffff' },
  'Astro.js': { color: '#FF5D01' },
  'Vite.js': { color: '#646CFF' },
  'Node.js': { color: '#339933' },
  'Express.js': { color: '#ffffff' },
  'MongoDB': { color: '#47A248' },
  'Tailwind CSS': { color: '#06B6D4' },
  'JavaScript': { color: '#F7DF1E' },
  'Technical SEO': { color: '#4285F4' },
  'Blockchain': { color: '#3C3C3D' },
  'AI Integration': { color: '#10a37f' },
};

const SkillIcon = memo(({ type, url }) => {
  return <img src={url} alt={type} className="w-full h-full object-contain p-1" />;
});
SkillIcon.displayName = 'SkillIcon';

const skillsConfig = [
  // Inner Orbit (Radius 100)
  { id: 'react', orbitRadius: 100, size: 45, speed: 0.8, iconType: 'React.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', phaseShift: 0, glowColor: 'cyan', label: 'React.js', level: 98 },
  { id: 'next', orbitRadius: 100, size: 45, speed: 0.8, iconType: 'Next.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', phaseShift: Math.PI / 2, glowColor: 'cyan', label: 'Next.js', level: 96 },
  { id: 'astro', orbitRadius: 100, size: 45, speed: 0.8, iconType: 'Astro.js', iconUrl: 'https://astro.build/favicon.svg', phaseShift: Math.PI, glowColor: 'cyan', label: 'Astro.js', level: 92 },
  { id: 'vite', orbitRadius: 100, size: 45, speed: 0.8, iconType: 'Vite.js', iconUrl: 'https://vitejs.dev/logo.svg', phaseShift: (3 * Math.PI) / 2, glowColor: 'cyan', label: 'Vite.js', level: 94 },
  
  // Middle Orbit (Radius 170)
  { id: 'node', orbitRadius: 170, size: 40, speed: -0.5, iconType: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', phaseShift: 0, glowColor: 'purple', label: 'Node.js', level: 90 },
  { id: 'express', orbitRadius: 170, size: 40, speed: -0.5, iconType: 'Express.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', phaseShift: Math.PI / 2, glowColor: 'purple', label: 'Express.js', level: 88 },
  { id: 'mongodb', orbitRadius: 170, size: 40, speed: -0.5, iconType: 'MongoDB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', phaseShift: Math.PI, glowColor: 'purple', label: 'MongoDB', level: 85 },
  { id: 'tailwind', orbitRadius: 170, size: 40, speed: -0.5, iconType: 'Tailwind CSS', iconUrl: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', phaseShift: (3 * Math.PI) / 2, glowColor: 'purple', label: 'Tailwind CSS', level: 97 },

  // Outer Orbit (Radius 240)
  { id: 'js', orbitRadius: 240, size: 35, speed: 0.3, iconType: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', phaseShift: 0, glowColor: 'lime', label: 'JavaScript', level: 95 },
  { id: 'seo', orbitRadius: 240, size: 35, speed: 0.3, iconType: 'Technical SEO', iconUrl: 'https://www.vectorlogo.zone/logos/google/google-icon.svg', phaseShift: Math.PI / 2, glowColor: 'lime', label: 'Technical SEO', level: 93 },
  { id: 'blockchain', orbitRadius: 240, size: 35, speed: 0.3, iconType: 'Blockchain', iconUrl: 'https://www.vectorlogo.zone/logos/ethereum/ethereum-icon.svg', phaseShift: Math.PI, glowColor: 'lime', label: 'Blockchain', level: 91 },
  { id: 'ai', orbitRadius: 240, size: 35, speed: 0.3, iconType: 'AI Integration', iconUrl: 'https://www.vectorlogo.zone/logos/openai/openai-icon.svg', phaseShift: (3 * Math.PI) / 2, glowColor: 'lime', label: 'AI Integration', level: 89 },
];

const OrbitingSkill = memo(({ config, angle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, iconUrl, label, level } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-gray-800/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined
        }}
      >
        <SkillIcon type={iconType} url={iconUrl} />
        {isHovered && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/95 backdrop-blur-sm rounded-lg text-xs text-white whitespace-nowrap pointer-events-none border border-white/10 z-50">
            <div className="font-bold">{label}</div>
            <div className="text-[#BFFF0B] text-[10px]">{level}% Proficiency</div>
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.2)',
      secondary: 'rgba(6, 182, 212, 0.1)',
      border: 'rgba(6, 182, 212, 0.15)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.2)',
      secondary: 'rgba(147, 51, 234, 0.1)',
      border: 'rgba(147, 51, 234, 0.15)'
    },
    lime: {
      primary: 'rgba(191, 255, 11, 0.2)',
      secondary: 'rgba(191, 255, 11, 0.1)',
      border: 'rgba(191, 255, 11, 0.15)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 60%, ${colors.secondary} 80%, ${colors.primary} 100%)`,
          boxShadow: `0 0 40px ${colors.primary}, inset 0 0 40px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 10px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// Widest ring (240) + icon + tooltip headroom. The orbit is laid out at this
// intrinsic size and then uniformly scaled to whatever width it actually gets.
const ORBIT_BASE_SIZE = 560;

const OrbitingSkills = () => {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Scale the whole orbit to fit its column instead of letting the fixed-px
  // rings overflow (and get clipped by the section's overflow-hidden).
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const measure = () => {
      const width = el.clientWidth;
      if (width > 0) setScale(Math.min(1, width / ORBIT_BASE_SIZE));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 170, glowColor: 'purple', delay: 1.5 },
    { radius: 240, glowColor: 'lime', delay: 3 }
  ];

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto w-full max-w-[560px]"
      style={{ height: ORBIT_BASE_SIZE * scale }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="absolute top-0 left-1/2 flex items-center justify-center"
        style={{
          width: ORBIT_BASE_SIZE,
          height: ORBIT_BASE_SIZE,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
      <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center z-10 relative shadow-2xl border border-white/10">
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse"></div>
        <div className="absolute inset-0 rounded-full bg-[#BFFF0B]/10 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BFFF0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
      </div>

      {orbitConfigs.map((config) => (
        <GlowingOrbitPath
          key={`path-${config.radius}`}
          radius={config.radius}
          glowColor={config.glowColor}
          animationDelay={config.delay}
        />
      ))}

      {skillsConfig.map((config) => {
        const angle = time * config.speed + (config.phaseShift || 0);
        return (
          <OrbitingSkill
            key={config.id}
            config={config}
            angle={angle}
          />
        );
      })}
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 bg-black relative z-10 overflow-hidden">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-3 sm:mb-4 text-xs sm:text-sm">My Skills</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 tracking-tighter">
              Let&apos;s Explore Popular <br className="hidden sm:block" />
              <span className="text-[#BFFF0B]">Skills &amp; Experience</span>
            </h3>
            <p className="text-white/60 mb-8 sm:mb-10 leading-relaxed max-w-lg text-sm sm:text-base">
              I have mastered a wide range of technologies across the full stack, with a primary focus on modern frontend frameworks and efficient backend architectures.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#BFFF0B] text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base"
            >
              Learn More
            </motion.button>
          </div>

          <div className="relative w-full min-w-0 order-first lg:order-none">
            <OrbitingSkills />
          </div>
        </div>
      </div>
    </section>
  );
};
