"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";

const SHOWCASE_IMAGES = [
  { src: "/images/service-foam-wash.png", alt: "Foam wash process" },
  { src: "/images/bentley-detail.png", alt: "Bentley detailing" },
  { src: "/images/service-interior.png", alt: "Interior steam clean" },
  { src: "/images/service-ceramic.png", alt: "Ceramic coating application" },
  { src: "/images/service-polishing.png", alt: "Paint correction polishing" },
  { src: "/images/porsche-rear.png", alt: "Porsche rear detailing" },
  { src: "/images/package-restoration.png", alt: "Full restoration finish" },
  { src: "/images/package-ceramic.png", alt: "Premium ceramic detail" },
  { src: "/images/package-express.png", alt: "Express wash detail" },
  { src: "/images/package-premium.png", alt: "Premium detailing package" },
  { src: "/images/service-foam-wash.png", alt: "Foam wash detailing" },
  { src: "/images/bentley-detail.png", alt: "Bentley detailing reflection" }
];

export default function ShowcaseBanner() {
  const rotationValue = useMotionValue(0);
  // Smooth spring physics for dynamic gliding/inertia feel
  const smoothRotation = useSpring(rotationValue, { 
    damping: 30, 
    stiffness: 140, 
    mass: 0.6 
  });

  const [isGrabbing, setIsGrabbing] = useState(false);
  const startX = useRef(0);
  const startRotation = useRef(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const lastInteractionTime = useRef(0);

  const galleryRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const [touchAction, setTouchAction] = useState("none");

  useEffect(() => {
    const checkWidth = () => {
      setTouchAction(window.innerWidth > 768 ? "none" : "pan-y");
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Auto-scroll loop using useAnimationFrame (only runs when not dragging or hovered, with interaction delay)
  useAnimationFrame((time, delta) => {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      if (isDragging.current || isHovered.current) {
        lastInteractionTime.current = Date.now();
        return;
      }

      if (Date.now() - lastInteractionTime.current < 2000) {
        return;
      }

      // 4 degrees per second (0.004 degrees per ms) to make it smooth and premium
      const current = rotationValue.get();
      rotationValue.set(current + delta * 0.004);
    } else {
      if (galleryRef.current) {
        if (isDragging.current || isHovered.current) {
          lastInteractionTime.current = Date.now();
          return;
        }

        if (Date.now() - lastInteractionTime.current < 2000) {
          return;
        }

        // Scroll speed: 30px per second (0.03px per ms)
        const scrollAmount = delta * 0.03;
        isProgrammaticScroll.current = true;
        galleryRef.current.scrollLeft += scrollAmount;

        const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth;
        if (galleryRef.current.scrollLeft >= maxScroll - 1) {
          // Wrap around smoothly to the start
          galleryRef.current.scrollLeft = 0;
        }
      }
    }
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || window.innerWidth <= 768) {
      return;
    }
    isDragging.current = true;
    setIsGrabbing(true);
    startX.current = e.clientX;
    startRotation.current = rotationValue.get();
    lastInteractionTime.current = Date.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    // Drag multiplier with corrected rotation direction
    const targetRotation = startRotation.current - deltaX * 0.15;
    rotationValue.set(targetRotation);
    lastInteractionTime.current = Date.now();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsGrabbing(false);
    lastInteractionTime.current = Date.now();
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    // Smooth snapping to the nearest 30-degree increment (card angle)
    const current = rotationValue.get();
    const nearestAngle = Math.round(current / 30) * 30;
    rotationValue.set(nearestAngle);
  };

  const handleScroll = () => {
    if (isProgrammaticScroll.current) {
      isProgrammaticScroll.current = false;
    } else {
      lastInteractionTime.current = Date.now();
    }
  };

  const handleTouchStart = () => {
    isHovered.current = true;
    lastInteractionTime.current = Date.now();
  };

  const handleTouchEnd = () => {
    isHovered.current = false;
    lastInteractionTime.current = Date.now();
  };

  return (
    <section className="showcase-banner-section">
      {/* Header Info */}
      <div className="showcase-header">
        <motion.div 
          className="showcase-badge"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Instagram size={14} />
          <span>Follow Our Work</span>
        </motion.div>
        
        <motion.h2 
          className="showcase-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Spotless Work. Flawless Reflections.
        </motion.h2>
        
        <motion.p 
          className="showcase-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Connect with us on social media for a daily dose of high-end gloss transformations, detailing diaries, and premium community car highlights.
        </motion.p>
        
        <motion.div 
          className="showcase-ctas"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn-showcase-primary">
            Follow Instagram
          </a>
          <a href="#booking" className="btn-showcase-outline">
            Book Detailing
          </a>
        </motion.div>
      </div>

      {/* Draggable 3D Curved Showcase Gallery Track */}
      <div 
        ref={galleryRef}
        className={`showcase-gallery-container ${isGrabbing ? "grabbing" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={() => { isHovered.current = true; }}
        onPointerLeave={() => { isHovered.current = false; }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onScroll={handleScroll}
        style={{ touchAction }}
      >
        <motion.div 
          className="showcase-gallery-track"
          style={{ 
            rotateY: smoothRotation,
            transformStyle: "preserve-3d"
          }}
        >
          {SHOWCASE_IMAGES.map((img, idx) => {
            // Spacing angle is 30 degrees for 12 cards forming a full 360-degree cylinder
            const baseAngle = idx * 30;
            return (
              <div 
                key={idx} 
                className={`showcase-card card-${idx}`}
                style={{ 
                  transform: `rotateY(${-baseAngle}deg) translateZ(-750px)`,
                  position: "absolute"
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="280px"
                  priority={idx === 3}
                  style={{ 
                    objectFit: "cover", 
                    pointerEvents: "none", 
                    userSelect: "none",
                  }}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
