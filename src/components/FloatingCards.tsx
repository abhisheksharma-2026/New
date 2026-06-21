import { motion } from "motion/react";
import { Star, ShieldAlert, ArrowDown, Users, Globe } from "lucide-react";
import { TRUST_AVATARS } from "../data";
import { CinematicTheme } from "../types";

interface FloatingCardsProps {
  theme: CinematicTheme;
  mousePos: { x: number; y: number };
}

export default function FloatingCards({ theme, mousePos }: FloatingCardsProps) {
  // Parallax ratios for distinct depth layers
  const dx1 = mousePos.x * 25;
  const dy1 = mousePos.y * 25;

  const dx2 = mousePos.x * -18;
  const dy2 = mousePos.y * -18;

  const dx3 = mousePos.x * 32;
  const dy3 = mousePos.y * 32;

  return (
    <div className="relative w-full h-full flex flex-col sm:flex-row md:flex-col lg:flex-row gap-6 lg:gap-8 justify-center items-center py-6">
      
      {/* CARD 1: 30% Reduced Carbon Footprint */}
      <motion.div
        animate={{ x: dx1, y: dy1 }}
        transition={{ type: "spring", stiffness: 45, damping: 15 }}
        whileHover={{ y: dy1 - 8, scale: 1.03 }}
        className="premium-glass-card rounded-2xl p-5 w-60 relative overflow-hidden group select-none flex flex-col justify-between h-44 shadow-xl border border-white/5 glowing-border-card"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full group-hover:bg-emerald-500/25 transition-all duration-700 pointer-events-none" />
        
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-white/20 transition-all duration-500">
            {/* Custom stylized Leaf / Carbon icon */}
            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 12m0-9c4.97 0 9 4.03 9 9 0 2.12-.74 4.07-1.97 5.61L12 12" />
            </svg>
          </div>
          <span className="font-mono text-[9px] text-white/30 tracking-wider">ANNUAL METRIC</span>
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-black text-4xl text-white tracking-tight leading-none">
              30%
            </span>
            <span className="font-tech font-bold text-[11px] text-white/50 uppercase tracking-widest">
              Reduced
            </span>
          </div>
          <span className="text-[12.5px] font-sans text-neutral-300 font-medium leading-tight">
            Carbon Footprint for Homes
          </span>
        </div>

        {/* Dynamic micro border indicator */}
        <div 
          className="absolute bottom-0 left-0 h-1 transition-all duration-700"
          style={{ backgroundColor: theme.accentColor, width: "30%" }}
        />
      </motion.div>

      {/* CARD 2: 20% Reduced Energy Bills */}
      <motion.div
        animate={{ x: dx2, y: dy2 }}
        transition={{ type: "spring", stiffness: 45, damping: 15 }}
        whileHover={{ y: dy2 - 8, scale: 1.03 }}
        className="premium-glass-card rounded-2xl p-5 w-60 relative overflow-hidden group select-none flex flex-col justify-between h-44 shadow-xl border border-white/5 glowing-border-card"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-2xl rounded-full group-hover:bg-amber-500/25 transition-all duration-700 pointer-events-none" />

        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:border-white/20 transition-all duration-500">
            <ArrowDown className="w-5 h-5" />
          </div>
          <span className="font-mono text-[9px] text-white/30 tracking-wider">SAVINGS</span>
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-black text-4xl text-white tracking-tight leading-none">
              20%
            </span>
            <span className="font-tech font-bold text-[11px] text-white/50 uppercase tracking-widest">
              Reduced
            </span>
          </div>
          <span className="text-[12.5px] font-sans text-neutral-300 font-medium leading-tight">
            Monthly electricity costs
          </span>
        </div>

        {/* Dynamic micro border indicator */}
        <div 
          className="absolute bottom-0 left-0 h-1 transition-all duration-700"
          style={{ backgroundColor: theme.accentColor, width: "20%" }}
        />
      </motion.div>

      {/* CARD 3: 10K+ Worldwide Users */}
      <motion.div
        animate={{ x: dx3, y: dy3 }}
        transition={{ type: "spring", stiffness: 45, damping: 15 }}
        whileHover={{ y: dy3 - 8, scale: 1.03 }}
        className="premium-glass-card rounded-2xl p-5 w-[256px] relative overflow-hidden group select-none flex flex-col justify-between h-44 shadow-xl border border-white/5 glowing-border-card"
      >
        {/* Abstract vector pattern overlay */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full group-hover:bg-cyan-500/25 transition-all duration-700 pointer-events-none" />

        <div className="flex justify-between items-center bg-white/[0.01] border border-white/5 rounded-full px-2.5 py-1">
          {/* Overlapping luxury user avatars */}
          <div className="flex -space-x-2.5 overflow-hidden">
            {TRUST_AVATARS.map((url, i) => (
              <img
                key={i}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-black object-cover"
                src={url}
                alt="Representative User"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
          <div className="flex items-center gap-0.5 text-amber-400 pl-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current stroke-none" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mt-3.5">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
              10K+
            </span>
            <span className="font-tech font-bold text-[10px] text-white/50 uppercase tracking-widest">
              Live
            </span>
          </div>
          <p className="text-[12.5px] font-sans text-neutral-300 font-medium leading-tight">
            Worldwide homes & businesses powered
          </p>
        </div>

        <div 
          className="absolute bottom-0 left-0 h-1 transition-all duration-700"
          style={{ backgroundColor: theme.accentColor, width: "100%" }}
        />
      </motion.div>
    </div>
  );
}
