import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CinematicTheme } from "../types";

interface CinematicBackgroundProps {
  theme: CinematicTheme;
  mousePos: { x: number; y: number };
}

export default function CinematicBackground({
  theme,
  mousePos,
}: CinematicBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Trigger video reload when the source changes
  useEffect(() => {
    setVideoLoaded(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [theme.videoUrl]);

  // Compute slight parallax shifts based on smoothed mouse coordinates
  const parallaxX = mousePos.x * -25; // Subtle shift in direction opposite to mouse
  const parallaxY = mousePos.y * -25;

  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none z-0">
      {/* Absolute base dark backdrop */}
      <div className="absolute inset-0 bg-[#030708]" />

      {/* Parallax Container */}
      <motion.div
        className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)]"
        animate={{
          x: parallaxX,
          y: parallaxY,
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 18,
          mass: 0.6,
        }}
      >
        {/* We use AnimatePresence to cross-fade between themes smoothly */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ 
              opacity: 1, 
              scale: 1.08,
              transition: { duration: 1.8, ease: "easeOut" }
            }}
            exit={{ 
              opacity: 0, 
              scale: 1.02,
              transition: { duration: 1.2, ease: "easeIn" }
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Fallback & Blur-up Image */}
            <img
              src={theme.fallbackUrl}
              alt="Environmental backdrop"
              className={`absolute inset-0 w-full h-full object-cover brightness-[0.35] contrast-[1.1] saturate-[0.8] transition-opacity duration-1000 ${
                videoLoaded ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Video Layer */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              onCanPlayThrough={() => setVideoLoaded(true)}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.30] contrast-[1.1] saturate-[0.85] transition-opacity duration-1000"
            >
              <source src={theme.videoUrl} type="video/mp4" />
            </video>

            {/* Custom Theme Accent Mesh Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-1000 mix-blend-screen"
              style={{ background: theme.sunGlow }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Film Grain Shader / Noise Overlay */}
      <div className="noise-overlay" />

      {/* Luxury Radial Shadow Gradients (Vignette to keep layout very legible) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020506] via-transparent to-[#020506]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,7,8,0)_40%,#030708_95%)] pointer-events-none" />

      {/* Ambient Floating Photons (Solar Particle Engine) */}
      <SolarParticleEngine themeColor={theme.accentColor} />
    </div>
  );
}

/* Floating Solar Photon Particle Engine */
function SolarParticleEngine({ themeColor }: { themeColor: string }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate organic randomized light photons
    const items = Array.from({ length: 18 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * -10,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-40">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: themeColor,
            boxShadow: `0 0 10px ${themeColor}, 0 0 20px ${themeColor}`,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.sin(p.id) * 40, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
