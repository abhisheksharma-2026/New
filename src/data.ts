import { CinematicTheme, StatItem, NavItem } from "./types";

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About us", href: "#about" },
  { label: "Products", href: "#products", badge: "New" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" }
];

export const STATS_ITEMS: StatItem[] = [
  {
    id: "carbon",
    title: "30%",
    description: "Reduced",
    value: "30%",
    detail: "Carbon Footprint"
  },
  {
    id: "bills",
    title: "20%",
    description: "Reduced",
    value: "20%",
    detail: "Energy Bills"
  },
  {
    id: "users",
    title: "10K+",
    description: "Worldwide Users",
    value: "10K+",
    detail: "Worldwide Users"
  }
];

export const CINEMATIC_THEMES: CinematicTheme[] = [
  {
    id: "emerald",
    name: "Helios Celestial",
    subName: "Future of Autonomy - Editorial Sun",
    videoUrl: "https://player.vimeo.com/external/510850877.hd.mp4?s=d401344400cf94e9f78eedb0fa60431cf9587394&profile_id=174&oauth2_token_id=57447761",
    fallbackUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1920&auto=format&fit=crop",
    accentColor: "#f27d26",
    accentTailwind: "bg-[#f27d26]",
    accentTextTailwind: "text-[#f27d26]",
    accentBorderTailwind: "border-[#f27d26]",
    gradientRange: "from-orange-400 to-amber-600",
    backdropText: "HELIOS",
    ambientGlow: "rgba(242, 125, 38, 0.12)",
    sunGlow: "radial-gradient(circle at 72% 30%, rgba(242, 125, 38, 0.22) 0%, transparent 60%)"
  },
  {
    id: "golden",
    name: "Golden Eclipse",
    subName: "Vast Warm Sunlit Prairie",
    videoUrl: "https://player.vimeo.com/external/510850877.hd.mp4?s=d401344400cf94e9f78eedb0fa60431cf9587394&profile_id=174&oauth2_token_id=57447761",
    fallbackUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1920&auto=format&fit=crop",
    accentColor: "#f59e0b",
    accentTailwind: "bg-amber-500",
    accentTextTailwind: "text-amber-400",
    accentBorderTailwind: "border-amber-400",
    gradientRange: "from-amber-400 to-orange-500",
    backdropText: "POWER",
    ambientGlow: "rgba(245, 158, 11, 0.08)",
    sunGlow: "radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.25) 0%, transparent 60%)"
  },
  {
    id: "horizon",
    name: "Cosmic Horizon",
    subName: "Dawn Over Curved Atmosphere",
    videoUrl: "https://player.vimeo.com/external/384761655.hd.mp4?s=382a316279fbd349c20a4023c93ee09200aa9cb0&profile_id=174&oauth2_token_id=57447761",
    fallbackUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop",
    accentColor: "#06b6d4",
    accentTailwind: "bg-cyan-500",
    accentTextTailwind: "text-cyan-400",
    accentBorderTailwind: "border-cyan-400",
    gradientRange: "from-cyan-400 to-blue-500",
    backdropText: "AURA",
    ambientGlow: "rgba(6, 182, 212, 0.08)",
    sunGlow: "radial-gradient(circle at 10% 30%, rgba(6, 182, 212, 0.25) 0%, transparent 60%)"
  },
  {
    id: "cosmic",
    name: "Deep Nebula",
    subName: "Starlit Solar System",
    videoUrl: "https://player.vimeo.com/external/403780518.hd.mp4?s=4bbfe5f9862828b438258df26d405206385cfcfc&profile_id=174&oauth2_token_id=57447761",
    fallbackUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop",
    accentColor: "#a855f7",
    accentTailwind: "bg-purple-500",
    accentTextTailwind: "text-purple-400",
    accentBorderTailwind: "border-purple-400",
    gradientRange: "from-purple-400 to-indigo-500",
    backdropText: "ZENITH",
    ambientGlow: "rgba(168, 85, 247, 0.08)",
    sunGlow: "radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.20) 0%, transparent 60%)"
  }
];

export const TRUST_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=60&h=60&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&q=80"
];
