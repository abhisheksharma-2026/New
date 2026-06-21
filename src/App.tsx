import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Cpu, ShieldCheck, Zap, BatteryCharging, Leaf } from "lucide-react";
import { CINEMATIC_THEMES } from "./data";
import { CinematicTheme } from "./types";

// Modular sub-components
import Navbar from "./components/Navbar";
import CinematicBackground from "./components/CinematicBackground";
import HeroText from "./components/HeroText";
import SolarMatrix3D from "./components/SolarMatrix3D";
import FloatingCards from "./components/FloatingCards";
import LuxurySettings from "./components/LuxurySettings";

export default function App() {
  const [activeTheme, setActiveTheme] = useState<CinematicTheme>(CINEMATIC_THEMES[0]);
  const [sensitivity, setSensitivity] = useState<"low" | "medium" | "high" | "off">("medium");
  const [particleDensity, setParticleDensity] = useState<"low" | "medium" | "high">("medium");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle global mouse movement to update normalized positional ratios [-0.5, 0.5]
  const handleMouseMove = (e: React.MouseEvent) => {
    if (sensitivity === "off") {
      if (mousePos.x !== 0 || mousePos.y !== 0) {
        setMousePos({ x: 0, y: 0 });
      }
      return;
    }
    
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Relative ratios from -0.5 to 0.5
    const rx = (clientX / width) - 0.5;
    const ry = (clientY / height) - 0.5;

    // Apply scale multiplier according to sensitivity setting
    const scale = sensitivity === "low" ? 0.5 : sensitivity === "medium" ? 1.0 : 1.6;
    setMousePos({ x: rx * scale, y: ry * scale });
  };

  // Safe fallback to reset mouse vector on mouse leave
  const handleMouseLeaveGlobal = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative min-h-screen bg-[#030708] text-white overflow-x-hidden selection:bg-white/20 selection:text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveGlobal}
    >
      {/* 1. CINEMATIC INTERACTIVE BACKGROUND */}
      <CinematicBackground 
        theme={activeTheme} 
        mousePos={mousePos} 
      />

      {/* Ambient Editorial Aesthetic Background Elements */}
      <div className="absolute inset-0 solar-glow pointer-events-none z-0" />
      <div className="absolute -top-40 -left-40 w-full h-full cinematic-flare pointer-events-none z-0" />

      {/* 2. THE FLOATING NAV BAR */}
      <Navbar theme={activeTheme} />

      {/* 3. HERO CONTAINER SECTION */}
      <main id="home" className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-24 sm:py-28 md:py-32 z-10">
        
        {/* Rounded Luxury Glass Cage frame */}
        <div 
          id="luxury-glass-cage"
          className="w-full max-w-7xl rounded-3xl premium-glass-card border border-white/[0.05] p-6 sm:p-8 md:p-12 relative flex flex-col justify-between overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
        >
          {/* Accent lighting reflections mapped to theme selection */}
          <div 
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-all duration-1500 opacity-20"
            style={{ backgroundColor: activeTheme.accentColor }}
          />
          <div 
            className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-all duration-1500 opacity-15"
            style={{ backgroundColor: activeTheme.accentColor }}
          />

          {/* Core Interactive Layout Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch pt-6 sm:pt-10">
            
            {/* Left Column (Headline, CTA, and HUD Swapper) */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-12 z-20">
              <HeroText theme={activeTheme} />
              
              {/* Luxury settings hud positioned perfectly inside Left section */}
              <LuxurySettings 
                activeTheme={activeTheme}
                onThemeChange={setActiveTheme}
                sensitivity={sensitivity}
                onSensitivityChange={setSensitivity}
                particleDensity={particleDensity}
                onParticleDensityChange={setParticleDensity}
              />
            </div>

            {/* Right Column (Isometric 3D receptor & stats cards) */}
            <div className="lg:col-span-6 flex flex-col justify-between items-center gap-10 lg:gap-4 relative z-10">
              
              {/* Isometric Receptor Module */}
              <div className="w-full flex items-center justify-center relative">
                {/* Micro tech decorative corner lines */}
                <span className="absolute top-0 left-4 w-4 h-4 border-t border-l border-white/20 rounded-tl-md" />
                <span className="absolute top-0 right-4 w-4 h-4 border-t border-r border-white/20 rounded-tr-md" />
                <span className="absolute bottom-0 left-4 w-4 h-4 border-b border-l border-white/20 rounded-bl-md" />
                <span className="absolute bottom-0 right-4 w-4 h-4 border-b border-r border-white/20 rounded-br-md" />

                <SolarMatrix3D 
                  theme={activeTheme} 
                  mousePos={mousePos} 
                />
              </div>

              {/* Floating Metrics Row */}
              <div className="w-full">
                <FloatingCards 
                  theme={activeTheme} 
                  mousePos={mousePos} 
                />
              </div>

            </div>

          </div>

          {/* Floating dynamic wireline scroll link */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 mt-10 text-center text-white/35 font-mono text-[9px] tracking-[4px] uppercase select-none w-full">
            <span>Scroll for Technical Specifications</span>
            <div className="scroll-indicator-line" />
          </div>

        </div>

      </main>

      {/* 4. TECHNICAL SPECIFICATIONS LOWER FOLD SECTION */}
      <section id="explore" className="relative bg-black/90 border-t border-white/5 py-24 sm:py-32 z-10">
        
        {/* Subtle grid backing line */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="text-[10px] font-tech text-white/40 tracking-[4px] uppercase font-bold">
              Engineering Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mt-3">
              Standard Architecture Specs
            </h2>
            <div className="h-[2px] w-12 mx-auto mt-4" style={{ backgroundColor: activeTheme.accentColor }} />
            <p className="text-sm sm:text-base text-neutral-400 font-sans mt-4">
              Designed from raw silicon block architectures to operate under high physical tolerances, yielding industry-first efficiency conversion rates.
            </p>
          </div>

          {/* Technical Bento Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Spec 1: High Conversion */}
            <div className="premium-glass-card rounded-2xl p-6 flex flex-col gap-4 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center" style={{ color: activeTheme.accentColor }}>
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-semibold text-white">Quantum Absorption</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Utilizes hyper-pure crystalline layers delivering a verified 24.8% power conversion rating, shattering default panel constraints.
              </p>
              <div className="mt-4 font-mono text-xs text-white/30 uppercase flex justify-between">
                <span>RATING</span>
                <span className="font-bold text-white">A++ ULTRA</span>
              </div>
            </div>

            {/* Spec 2: Battery Integration */}
            <div className="premium-glass-card rounded-2xl p-6 flex flex-col gap-4 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center animate-pulse" style={{ color: activeTheme.accentColor }}>
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-semibold text-white">Active Power Balancing</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Integrated micro-inverter circuitry automatically routes output surplus to autonomous lithium backups with zero line loss factors.
              </p>
              <div className="mt-4 font-mono text-xs text-white/30 uppercase flex justify-between">
                <span>LATENCY</span>
                <span className="font-bold text-white">0.02 MS TRANSITION</span>
              </div>
            </div>

            {/* Spec 3: Safe Autonomy */}
            <div className="premium-glass-card rounded-2xl p-6 flex flex-col gap-4 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center" style={{ color: activeTheme.accentColor }}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-semibold text-white">Meteorological Auto-Shear</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Built to resist up to Category 4 typhoons and hail impacts with resilient self-healing transparent glass compositions.
              </p>
              <div className="mt-4 font-mono text-xs text-white/30 uppercase flex justify-between">
                <span>Lifelong Guard</span>
                <span className="font-bold text-white">25-YEAR AUTONOMY</span>
              </div>
            </div>

          </div>

          {/* Bottom Trust Action */}
          <div className="mt-16 text-center border-t border-white/5 pt-12 flex flex-col items-center gap-1.5 font-mono text-xs text-white/40">
            <span className="uppercase tracking-widest">SolarSphere Premium Solid Energy Core v2.4</span>
            <span className="text-[10px] text-white/20">© 2026 SOLARSPHERE INC. ALL RIGHTS RESERVED. CUSTOMIZED IN LUXURY DESIGN STUDIO.</span>
          </div>

        </div>
      </section>
    </div>
  );
}
