import { useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { CinematicTheme } from "../types";

interface SolarMatrix3DProps {
  theme: CinematicTheme;
  mousePos: { x: number; y: number };
}

export default function SolarMatrix3D({ theme, mousePos }: SolarMatrix3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for high-end organic physics feel
  const rotateXSpring = useSpring(0, { stiffness: 60, damping: 20 });
  const rotateYSpring = useSpring(0, { stiffness: 60, damping: 20 });
  const translateZSpring = useSpring(0, { stiffness: 100, damping: 25 });

  // Map mouse coordinate ratios (-0.5 to 0.5) to subtle 3D rotational degrees
  // e.g. mapping -0.5..0.5 to -20deg..20deg of rotation
  const xRotation = mousePos.y * -25; // tilting up/down based on mouse Y
  const yRotation = mousePos.x * 25;  // tilting left/right based on mouse X

  rotateXSpring.set(xRotation);
  rotateYSpring.set(yRotation);
  translateZSpring.set(isHovered ? 40 : 0);

  // Highlight gradients to simulate sunlight glint
  const glintX = useTransform(rotateYSpring, [-20, 20], ["120%", "-20%"]);
  const glintY = useTransform(rotateXSpring, [-20, 20], ["120%", "-20%"]);

  return (
    <div
      className="relative w-full aspect-[4/3] max-w-[500px] mx-auto flex items-center justify-center select-none cursor-pointer z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Backing Shadow Glow */}
      <motion.div
        className="absolute w-72 h-72 rounded-full filter blur-[100px] pointer-events-none transition-all duration-1000"
        style={{
          backgroundColor: theme.accentColor,
          opacity: isHovered ? 0.25 : 0.15,
          scale: isHovered ? 1.1 : 0.95,
        }}
      />

      {/* Floating zero-G wrapper (slow vertical oscillation) */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full h-full flex items-center justify-center"
      >
        {/* Interactive 3D Card Panel Container */}
        <motion.div
          style={{
            rotateX: rotateXSpring,
            rotateY: rotateYSpring,
            transformStyle: "preserve-3d",
          }}
          className="w-5/6 h-5/6 relative flex items-center justify-center"
        >
          {/* THE GIANT BACKDROP TEXT ("SOLAR" or "POWER")
              This text sits deeply behind the 3D grid and has high opacity masks */}
          <div
            style={{ transform: "translateZ(-80px)" }}
            className="absolute text-[120px] sm:text-[150px] font-display font-extrabold tracking-[15px] opacity-[0.06] select-none text-white pointer-events-none transition-all duration-1000 flex justify-center items-center h-full w-[150%] left-[-25%]"
          >
            {theme.backdropText}
          </div>

          {/* Core Isometric Stack (Preserving 3D depth) */}
          <div className="relative w-72 h-72 md:w-80 md:h-80" style={{ transformStyle: "preserve-3d" }}>
            
            {/* Level 0: Cybergrid Circuit shadow plane */}
            <motion.div
              style={{
                transform: "translateZ(-30px) rotateX(60deg) rotateZ(45deg)",
              }}
              className="absolute inset-0 border border-white/5 bg-gradient-to-tr from-white/[0.01] to-white/[0.04] rounded-2xl flex items-center justify-center"
            >
              <div className="absolute inset-2 border border-dashed border-white/5 rounded-xl" />
              {/* Laser laser-focused solar collector lines */}
              <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
                <line x1="0" y1="50" x2="100" y2="50" stroke={theme.accentColor} strokeWidth="0.5" />
                <line x1="50" y1="0" x2="50" y2="100" stroke={theme.accentColor} strokeWidth="0.5" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="10" fill="none" stroke={theme.accentColor} strokeWidth="0.5" />
              </svg>
            </motion.div>

            {/* Level 1: Primary Solar Solid glass plate */}
            <motion.div
              style={{
                transform: "translateZ(0px) rotateX(60deg) rotateZ(45deg)",
              }}
              className="absolute inset-0 premium-glass-card rounded-2xl p-4 flex flex-col justify-between overflow-hidden shadow-2xl hover:border-white/20 transition-colors"
            >
              {/* Refractive glint shine moving with mouse */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent w-[200%] h-[200%]"
                style={{
                  left: glintX,
                  top: glintY,
                  transform: "rotate(-45deg)",
                }}
              />

              {/* Silicon matrix solar cells details inside the glass */}
              <div className="grid grid-cols-4 grid-rows-4 gap-2.5 w-full h-full opacity-65">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="border border-white/10 bg-white/[0.02] rounded-md transition-all duration-300 hover:bg-white/[0.12] hover:border-white/30 flex items-center justify-center relative group"
                  >
                    {/* Tiny neon cell core */}
                    <div 
                      className="w-1 h-1 rounded-full opacity-0 transition-opacity duration-300"
                      style={{ 
                        backgroundColor: theme.accentColor,
                        opacity: isHovered ? (i % 3 === 0 ? 0.8 : 0.2) : 0,
                        boxShadow: `0 0 4px ${theme.accentColor}`
                      }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Level 2: Intercepting Floating Glass Receptor Tiles (Advanced 3D Layer) */}
            {Array.from({ length: 3 }).map((_, i) => {
              const offsets = [
                { top: "-10%", left: "10%", z: 45 },
                { top: "60%", left: "75%", z: 65 },
                { top: "50%", left: "-15%", z: 55 },
              ];
              const config = offsets[i];
              return (
                <motion.div
                  key={i}
                  style={{
                    top: config.top,
                    left: config.left,
                    transform: `translateZ(${config.z}px) rotateX(60deg) rotateZ(45deg)`,
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="absolute w-24 h-24 premium-glass-card hover:border-white/30 rounded-xl p-2 flex flex-col justify-between shadow-lg overflow-hidden backdrop-blur-md"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                    </div>
                    <span className="font-mono text-[8px] tracking-tight text-white/40 uppercase">Cell-{i+1}</span>
                  </div>
                  
                  {/* Subtle power transfer indicators */}
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display font-bold text-[14px] text-white">
                      {i === 0 ? "72.4%" : i === 1 ? "+12A" : "OPTIMAL"}
                    </span>
                    <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ backgroundColor: theme.accentColor }}
                        animate={{ width: i === 0 ? "72.4%" : i === 1 ? "90%" : "100%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Tile shimmer line */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
                </motion.div>
              );
            })}

            {/* Level 3: Crown Jewel Glowing Focal Node in the center top */}
            <motion.div
              style={{
                top: "35%",
                left: "35%",
                transform: "translateZ(85px) rotateX(60deg) rotateZ(45deg)",
              }}
              className="absolute w-20 h-20 bg-gradient-to-br from-white to-white/[0.05] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)] pointer-events-none group"
            >
              {/* Dynamic matching backdrop ring */}
              <span 
                className="absolute inset-0 rounded-full border border-dashed opacity-50 blur-[2px]"
                style={{ borderColor: theme.accentColor }}
              />
              <div 
                className="w-8 h-8 rounded-full border border-white/30 bg-black/60 flex items-center justify-center p-0.5 overflow-hidden shadow-inner cursor-pointer"
              >
                {/* Glowing power core */}
                <motion.div 
                  className="w-4 h-4 rounded-full"
                  style={{ 
                    backgroundColor: theme.accentColor,
                    boxShadow: `0 0 15px 5px ${theme.accentColor}`
                  }}
                  animate={{
                    scale: [1, 1.25, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>

      {/* Floating wireframe coordinate helper lines at corner boundaries */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-white/20 tracking-wider flex items-center gap-1.5 pointer-events-none uppercase">
        <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse bg-white/40" />
        RECEPTOR: ONLINE
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-white/20 tracking-wider flex items-center gap-1 pointer-events-none">
        GRID-X: {Math.round(rotateYSpring.get())}° / GRID-Y: {Math.round(rotateXSpring.get())}°
      </div>
    </div>
  );
}
