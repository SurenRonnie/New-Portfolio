import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useEffect, useRef } from 'react';

export const ParallaxBackground = () => {
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

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const layer1X = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const layer1Y = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  
  const layer2X = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const layer2Y = useTransform(smoothY, [-0.5, 0.5], [-40, 40]);

  const layer3X = useTransform(smoothX, [-0.5, 0.5], [-60, 60]);
  const layer3Y = useTransform(smoothY, [-0.5, 0.5], [-60, 60]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid Pattern */}
      <motion.div 
        style={{ x: layer1X, y: layer1Y }}
        className="absolute inset-0 opacity-[0.03]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
      >
        <div className="h-full w-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>

      {/* Floating Orbs */}
      <motion.div 
        style={{ x: layer2X, y: layer2Y }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#BFFF0B] rounded-full blur-[150px] opacity-[0.05]"
      />
      <motion.div 
        style={{ x: layer3X, y: layer3Y }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#BFFF0B] rounded-full blur-[200px] opacity-[0.03]"
      />

      {/* Dots Pattern */}
      <motion.div 
        style={{ x: layer2X, y: layer2Y }}
        className="absolute inset-0 opacity-[0.1]"
      >
        <div className="h-full w-full bg-[radial-gradient(#BFFF0B_1px,transparent_1px)] [background-size:32px_32px]" />
      </motion.div>
    </div>
  );
};
