import { motion } from "motion/react";
import { Sliders, Check, Eye, Compass, SunDim } from "lucide-react";
import { CINEMATIC_THEMES } from "../data";
import { CinematicTheme, ThemeID } from "../types";

interface LuxurySettingsProps {
  activeTheme: CinematicTheme;
  onThemeChange: (theme: CinematicTheme) => void;
  sensitivity: "low" | "medium" | "high" | "off";
  onSensitivityChange: (s: "low" | "medium" | "high" | "off") => void;
  particleDensity: "low" | "medium" | "high";
  onParticleDensityChange: (d: "low" | "medium" | "high") => void;
}

export default function LuxurySettings({
  activeTheme,
  onThemeChange,
  sensitivity,
  onSensitivityChange,
  particleDensity,
  onParticleDensityChange,
}: LuxurySettingsProps) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
      className="premium-glass-card rounded-2xl p-4 sm:p-5 w-full md:max-w-md lg:max-w-lg shadow-xl border border-white/5 relative group"
    >
      {/* Glow highlight based on theme */}
      <div 
        className="absolute inset-x-8 -top-[1px] h-[1.5px] pointer-events-none transition-all duration-1000"
        style={{ background: `linear-gradient(90deg, transparent, ${activeTheme.accentColor}, transparent)` }}
      />

      <div className="flex flex-col gap-4">
        {/* Header with mini dashboard stats */}
        <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-white/40" />
            <span className="font-tech text-[10px] tracking-widest text-[#f8fafc]/50 uppercase font-semibold">
              Cinematic Directives
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#f8fafc]/30 uppercase flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
            Ready 60FPS
          </span>
        </div>

        {/* 1. Theme Configuration Swap Buttons */}
        <div className="flex flex-col gap-2">
          <label className="font-tech text-[9px] tracking-widest text-white/40 uppercase">
            Environment Matrix
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {CINEMATIC_THEMES.map((theme) => {
              const isActive = theme.id === activeTheme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => onThemeChange(theme)}
                  className={`px-2.5 py-2 rounded-xl text-center flex flex-col justify-center items-center gap-1 transition-all relative border overflow-hidden cursor-pointer ${
                    isActive
                      ? "bg-white/[0.06] border-white/20 shadow-inner"
                      : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                  }`}
                >
                  {/* Theme Accent dot */}
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ 
                      backgroundColor: theme.accentColor,
                      boxShadow: isActive ? `0 0 8px ${theme.accentColor}` : "none" 
                    }} 
                  />
                  <span className="font-sans text-[11px] font-semibold text-white/95 leading-none">
                    {theme.name.split(" ")[1] || theme.name}
                  </span>
                  <span className="text-[8px] font-mono text-white/40 font-light truncate max-w-full">
                    {theme.id}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeThemeOutline"
                      className="absolute inset-0 border border-white/25 rounded-xl pointer-events-none"
                      style={{ borderColor: theme.accentColor }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Secondary Interactive Adjustments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Mouse follow Tilt control */}
          <div className="flex flex-col gap-1.5">
            <span className="font-tech text-[9px] tracking-widest text-white/40 uppercase flex items-center gap-1">
              <Compass className="w-2.5 h-2.5 text-white/30" />
              Rotational Depth
            </span>
            <div className="flex bg-white/[0.01] border border-white/5 rounded-lg p-0.5">
              {(["off", "low", "medium", "high"] as const).map((lvl) => {
                const sActive = sensitivity === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => onSensitivityChange(lvl)}
                    className={`flex-1 text-[10px] py-1 font-mono uppercase rounded-md text-center transition-all cursor-pointer ${
                      sActive
                        ? "bg-white/10 text-white font-bold"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floating light Photons density control */}
          <div className="flex flex-col gap-1.5">
            <span className="font-tech text-[9px] tracking-widest text-white/40 uppercase flex items-center gap-1">
              <SunDim className="w-2.5 h-2.5 text-white/30" />
              Photon Density
            </span>
            <div className="flex bg-white/[0.01] border border-white/5 rounded-lg p-0.5">
              {(["low", "medium", "high"] as const).map((den) => {
                const dActive = particleDensity === den;
                return (
                  <button
                    key={den}
                    onClick={() => onParticleDensityChange(den)}
                    className={`flex-1 text-[10px] py-1 font-mono uppercase rounded-md text-center transition-all cursor-pointer ${
                      dActive
                        ? "bg-white/10 text-white font-bold"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {den}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* HUD Subtitle and status feedback */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[11px] text-white/50 bg-white/[0.01] p-2 rounded-xl border border-white/5">
          <Eye className="w-3.5 h-3.5 shrink-0" style={{ color: activeTheme.accentColor }} />
          <div className="flex flex-col">
            <span className="font-sans font-medium text-white/80 leading-none">{activeTheme.subName}</span>
            <span className="text-[9px] font-mono text-white/40 mt-0.5">MATRIX RESOLUTION COORDINATES SYNCED</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
