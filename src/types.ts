export type ThemeID = "emerald" | "golden" | "horizon" | "cosmic";

export interface CinematicTheme {
  id: ThemeID;
  name: string;
  subName: string;
  videoUrl: string;
  fallbackUrl: string;
  accentColor: string;       // e.g. '#c7ff00' for neon lime-green
  accentTailwind: string;    // e.g. 'bg-[#c7ff00]'
  accentTextTailwind: string;// e.g. 'text-[#c7ff00]'
  accentBorderTailwind: string;// e.g. 'border-[#c7ff00]'
  gradientRange: string;     // e.g. 'from-lime-400 to-emerald-500'
  backdropText: string;      // Large text: "SOLARSPHERE" or "ENERGY"
  ambientGlow: string;       // e.g. 'rgba(199, 255, 0, 0.15)'
  sunGlow: string;           // position or style
}

export interface StatItem {
  id: string;
  title: string;
  description: string;
  value: string;
  detail: string;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}
