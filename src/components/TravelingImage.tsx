import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import myimg from '../assets/surendar.jpeg';
export const TravelingImage = () => {
  const [targets, setTargets] = useState<{
    hero: { top: number; left: number; width: number; height: number } | null;
    about: { top: number; left: number; width: number; height: number } | null;
  }>({ hero: null, about: null });

  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const mouseSpringConfig = { damping: 20, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, mouseSpringConfig);
  const smoothMouseY = useSpring(mouseY, mouseSpringConfig);

  const mouseParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const mouseParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);

  useEffect(() => {
    const updateTargets = () => {
      const heroTarget = document.querySelector('.hero-image-target')?.getBoundingClientRect();
      const aboutTarget = document.querySelector('.about-image-target')?.getBoundingClientRect();
      
      if (heroTarget && aboutTarget) {
        const currentScroll = window.scrollY;
        setTargets({
          hero: {
            top: heroTarget.top + currentScroll,
            left: heroTarget.left,
            width: heroTarget.width,
            height: heroTarget.height,
          },
          about: {
            top: aboutTarget.top + currentScroll,
            left: aboutTarget.left,
            width: aboutTarget.width,
            height: aboutTarget.height,
          },
        });
      }
    };

    updateTargets();
    window.addEventListener('resize', updateTargets);
    const timer = setTimeout(updateTargets, 1000);
    
    return () => {
      window.removeEventListener('resize', updateTargets);
      clearTimeout(timer);
    };
  }, []);

  const vh = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const scrollRange = [0, vh * 0.2, vh * 0.8, vh * 1.2];
  
  const springConfig = { damping: 35, stiffness: 180 };
  
  const absX = useTransform(scrollY, scrollRange, [
    targets.hero?.left ?? 0,
    targets.hero?.left ?? 0,
    targets.about?.left ?? 0,
    targets.about?.left ?? 0,
  ]);

  const absY = useTransform(scrollY, scrollRange, [
    targets.hero?.top ?? 0,
    targets.hero?.top ?? 0,
    targets.about?.top ?? 0,
    targets.about?.top ?? 0,
  ]);

  const x = useSpring(absX, springConfig);
  const y = useSpring(useTransform([absY, scrollY], ([latestAbsY, latestScrollY]) => (latestAbsY as number) - (latestScrollY as number)), springConfig);

  const width = useSpring(useTransform(scrollY, scrollRange, [
    targets.hero?.width ?? 500,
    targets.hero?.width ?? 500,
    targets.about?.width ?? 0,
    targets.about?.width ?? 0,
  ]), springConfig);

  const height = useSpring(useTransform(scrollY, scrollRange, [
    targets.hero?.height ?? 500,
    targets.hero?.height ?? 500,
    targets.about?.height ?? 0,
    targets.about?.height ?? 0,
  ]), springConfig);

  const borderRadius = useSpring(useTransform(scrollY, scrollRange, [
    999, // Circle
    999,
    48,  // Rounded-3xl
    48,
  ]), springConfig);

  const opacity = useTransform(scrollY, [0, vh * 1.5, vh * 2], [1, 1, 0]);

  const combinedX = useTransform([x, mouseParallaxX], ([latestX, latestMouseX]) => (latestX as number) + (latestMouseX as number));
  const combinedY = useTransform([y, mouseParallaxY], ([latestY, latestMouseY]) => (latestY as number) + (latestMouseY as number));
  
  const boxShadow = useTransform(scrollY, [0, vh * 0.5], [
    '0 0 40px rgba(191, 255, 11, 0.2)',
    '0 0 0px rgba(191, 255, 11, 0)'
  ]);

  const imgScale = useTransform(scrollY, scrollRange, [1.5, 1.5, 1, 1.1]);
  const imgRotate = useTransform(scrollY, scrollRange, [0, 0, 0, 2]);

  if (!targets.hero || !targets.about) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: -42,
        x: combinedX,
        y: combinedY,
        width,
        height,
        borderRadius,
        overflow: 'hidden',
        zIndex: 40,
        pointerEvents: 'none',
        border: '12px solid rgba(255, 255, 255, 0.05)',
        opacity,
        boxShadow,
      }}
    >
      <motion.img
        src={myimg}
        alt="Surendar G"
        className="w-full h-full object-cover transition-all duration-700"
        referrerPolicy="no-referrer"
        style={{
          scale: imgScale,
          rotate: imgRotate,
        }}
      />
    </motion.div>
  );
};
