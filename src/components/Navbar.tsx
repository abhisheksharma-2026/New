import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAVIGATION_ITEMS } from "../data";
import { CinematicTheme } from "../types";

interface NavbarProps {
  theme: CinematicTheme;
}

export default function Navbar({ theme }: NavbarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="w-full absolute top-0 left-0 z-50 px-6 pt-6"
    >
      <div 
        id="floating-nav-container"
        className="max-w-6xl mx-auto rounded-full premium-glass-card px-4 py-2 sm:py-3 flex items-center justify-between transition-all duration-500 hover:border-white/15 relative"
      >
        {/* Subtle glow underneath */}
        <div 
          className="absolute inset-x-20 -bottom-4 h-[1px] blur-md pointer-events-none transition-all duration-1000"
          style={{ background: `radial-gradient(ellipse at center, ${theme.accentColor} 0%, transparent 80%)`, opacity: 0.3 }}
        />

        {/* LOGO */}
        <a href="#home" className="flex items-center gap-2 group pl-3 select-none">
          {/* Animated luxury Solar Sphere icon */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Outermost solar boundary aura */}
            <motion.div
              className={`absolute inset-0 rounded-full border border-dashed opacity-40 group-hover:opacity-100 transition-opacity ${theme.accentTextTailwind}`}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            {/* Spinning solar cell facets */}
            <motion.div
              className="absolute w-5 h-5 rounded-full border-2 flex items-center justify-center border-white/80 group-hover:scale-110 transition-transform"
              style={{ borderColor: theme.accentColor }}
              animate={{ rotate: -180 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </motion.div>
            <div className="absolute w-1.5 h-1.5 bg-white rounded-full translate-x-1.5 translate-y-1.5" />
          </div>
          
          <span className="font-display font-extrabold tracking-widest text-lg sm:text-xl text-white group-hover:text-white/90 transition-colors uppercase">
            SOLAR<span className="font-light tracking-normal text-white/50">SPHERE</span>
          </span>
        </a>

        {/* DESKTOP NAV ITEMS with sliding bubble hover */}
        <nav className="hidden md:flex items-center gap-1">
          {NAVIGATION_ITEMS.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-4 py-1.5 text-[13px] font-tech font-medium uppercase tracking-wider text-white/75 hover:text-white transition-colors duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {item.label}
                {item.badge && (
                  <span className="text-[9px] font-mono lowercase tracking-normal px-1.5 py-0.5 bg-white/10 text-white rounded-full shadow-inner">
                    {item.badge}
                  </span>
                )}
              </span>
              
              {/* Sliding glass pill indicator */}
              {hoveredIndex === index && (
                <motion.span
                  layoutId="navBubble"
                  className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* RIGHT SIDE BUTTONS (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="#explore"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden group rounded-full bg-white hover:bg-white text-black font-tech uppercase text-xs tracking-wider px-5 py-2.5 shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            {/* Magnetic/animated reflection overlay */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/40 opacity-40 group-hover:animate-shine" />
            
            <span className="font-bold">Get started</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="flex md:hidden pr-1">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER (Glass dropdown) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="md:hidden mt-2 mx-auto max-w-6xl rounded-2xl premium-glass-card border border-white/10 p-5 overflow-hidden backdrop-blur-2xl z-40 relative flex flex-col gap-4 shadow-xl"
          >
            <div className="flex flex-col gap-2">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm text-white/80 hover:text-white font-tech uppercase tracking-wider rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all flex justify-between items-center"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full uppercase font-mono">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>

            <div className="h-[1px] bg-white/10 w-full my-1" />

            <a
              href="#explore"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 w-full bg-white text-black font-tech uppercase font-bold text-xs tracking-widest text-center rounded-xl flex items-center justify-center gap-1 hover:brightness-95 transition-all shadow-md cursor-pointer"
            >
              <span>Get started</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
