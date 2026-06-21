import React, { useState, useRef } from "react";
import { motion, useSpring } from "motion/react";
import { Zap, Sparkles, ArrowRight } from "lucide-react";
import { CinematicTheme } from "../types";

interface HeroTextProps {
  theme: CinematicTheme;
}

export default function HeroText({ theme }: HeroTextProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Magnetic physics springs for CTA button lock-on
  const xSpring = useSpring(0, { stiffness: 120, damping: 15 });
  const ySpring = useSpring(0, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    // Get mouse offset relative to button center
    const rect = buttonRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - btnCenterX;
    const deltaY = e.clientY - btnCenterY;

    // Pull factor: Move up to 18px towards cursor
    const pullFactor = 0.22;
    xSpring.set(deltaX * pullFactor);
    ySpring.set(deltaY * pullFactor);
  };

  const handleMouseLeave = () => {
    // Return smoothly to center absolute zero
    xSpring.set(0);
    ySpring.set(0);
  };

  return (
    <div className="flex flex-col justify-center items-start text-left max-w-xl h-full select-none">
      
      {/* Upper tag / Trust proof badge in Editorial style */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="flex items-center gap-2 mb-6"
      >
        <Sparkles className="w-4 h-4" style={{ color: theme.accentColor }} />
        <span 
          className="font-tech text-[11px] uppercase tracking-[0.4em] font-semibold"
          style={{ color: theme.accentColor }}
        >
          FUTURE OF AUTONOMY
        </span>
      </motion.div>

      {/* Luxury Layered Mask Title Reveal (Awwwards & Editorial design signature) */}
      <h1 className="flex flex-col gap-1 sm:gap-2 text-[56px] sm:text-7xl md:text-[84px] leading-[0.95] tracking-tighter font-light text-reveal-gradient">
        <span className="block mask-text-reveal">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="block"
          >
            Harness the
          </motion.span>
        </span>
        
        <span className="block mask-text-reveal">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="block"
            style={{ color: theme.accentColor }}
          >
            Power <span className="text-white font-light">of</span>
          </motion.span>
        </span>

        <span className="block mask-text-reveal">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="block text-neutral-300 font-light"
          >
            the Sun.
          </motion.span>
        </span>
      </h1>

      {/* Subheadline slide from left */}
      <motion.p
        initial={{ x: -25, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
        className="mt-6 text-sm sm:text-base md:text-lg text-neutral-400 font-sans leading-relaxed max-w-md font-light"
      >
        Premium Solar Solutions for Homes and Businesses. Engineered for performance, designed for prestige.
      </motion.p>

      {/* MAGNETIC CTA BUTTONS & Mini statistics */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
        className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6"
      >
        {/* MAGNETIC CTA */}
        <motion.button
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ x: xSpring, y: ySpring }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="relative px-9 py-4 rounded-full font-tech font-bold text-xs tracking-[0.2em] uppercase shadow-lg flex items-center gap-2 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
        >
          {/* Subtle accent colored backdrop */}
          <div 
            className="absolute inset-0 bg-white transition-colors duration-500 group-hover:bg-amber-500"
            style={{ backgroundColor: "#ffffff" }}
          />

          {/* Button indicators */}
          <span className="relative z-10 text-neutral-950 flex items-center gap-1.5 font-bold">
            Explore Products
          </span>
        </motion.button>

        {/* Secondary minimalist Action (Watch Story) */}
        <motion.a
          href="#consult"
          className="font-tech text-xs tracking-[0.2em] text-white/95 uppercase flex items-center gap-1.5 px-8 py-4 rounded-full border border-white/25 hover:border-white/60 transition-all duration-300 bg-transparent relative group focus:outline-none"
        >
          <span>Watch Story</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </motion.div>

      {/* Trust statistics under the CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="mt-12 flex items-center gap-4 text-xs font-mono tracking-wide text-white/50 border-t border-white/5 pt-5 w-full max-w-sm"
      >
        <span className="flex items-center gap-1.5 uppercase">
          <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ backgroundColor: theme.accentColor }} />
          Zero Grid Dependency
        </span>
        <span className="h-4 w-[1px] bg-white/10" />
        <span className="uppercase">Net-Positive Output</span>
      </motion.div>

    </div>
  );
}
