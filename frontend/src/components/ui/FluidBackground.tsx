import { motion, useScroll, useTransform } from 'framer-motion';

export const FluidBackground = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, -300]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#000000] pointer-events-none w-full h-full">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-100 will-change-transform"
      >
        <svg 
          className="absolute w-full h-full left-0 top-0"
          preserveAspectRatio="none"
          // Expand the viewBox vertically so the blur/strokes don't clip at the edges
          viewBox="0 -200 1440 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 3. MATERIALITY: High-Contrast Gradient Mapping (Pitch Black to Neon Cyan) */}
            {/* Smoother gradient mapping for the broader waves */}
            <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="20%" stopColor="#002266" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="80%" stopColor="#0044aa" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>

            {/* Brighter cyan mapping for the core ribbons (replacing the solid white) */}
            <linearGradient id="cyanCoreGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="30%" stopColor="#0066cc" />
              <stop offset="50%" stopColor="#cceeff" /> {/* Soft, bright cyan-white, not harsh white */}
              <stop offset="70%" stopColor="#00ffff" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>

            {/* 3. MATERIALITY: Glassmorphism & Liquid Dynamics */}
            <linearGradient id="glassFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 255, 255, 0.0)" />
              <stop offset="50%" stopColor="rgba(0, 200, 255, 0.15)" />
              <stop offset="100%" stopColor="rgba(0, 255, 255, 0.0)" />
            </linearGradient>

            {/* 2. LIGHTING & COLOR: Gaussian Blur & Soft Falloff */}
            <filter id="mist-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="60" result="blur" />
            </filter>
            
            <filter id="glow-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="25" result="blur" />
            </filter>

            {/* 2. LIGHTING & COLOR: Additive Blending / Bloom */}
            <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="15" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. GEOMETRY: Volumetric Layering - Ambient Mist Base */}
          {/* Subsurface scattering effect expanding beyond the wave */}
          {/* All paths shifted up slightly (y values -50 to -100) to keep them centered in the expanded viewBox */}
          <path 
            className="animate-[wave_24s_ease-in-out_infinite_alternate]"
            fill="none"
            stroke="url(#neonGlow)"
            strokeWidth="160"
            strokeOpacity="0.4"
            filter="url(#mist-blur)"
            style={{ mixBlendMode: 'screen' }}
            d="M-100 350 C 300 150, 500 600, 800 350 C 1100 100, 1300 600, 1600 350"
          >
             <animate attributeName="d" dur="24s" repeatCount="indefinite"
               values="
                 M-100 350 C 300 150, 500 600, 800 350 C 1100 100, 1300 600, 1600 350;
                 M-100 300 C 300 550, 500 150, 800 350 C 1100 550, 1300 150, 1600 300;
                 M-100 350 C 300 150, 500 600, 800 350 C 1100 100, 1300 600, 1600 350" />
          </path>

          {/* 1. GEOMETRY: Volumetric Layering - Wide S-Curve Base Ribbons */}
          <path 
            className="animate-[wave_18s_ease-in-out_infinite_alternate-reverse]"
            fill="none"
            stroke="url(#neonGlow)"
            strokeWidth="80"
            strokeOpacity="0.7"
            filter="url(#glow-blur)"
            style={{ mixBlendMode: 'screen' }}
            d="M-100 400 C 350 250, 550 650, 800 400 C 1050 150, 1250 650, 1600 400"
          >
             <animate attributeName="d" dur="18s" repeatCount="indefinite"
               values="
                 M-100 400 C 350 250, 550 650, 800 400 C 1050 150, 1250 650, 1600 400;
                 M-100 350 C 350 600, 550 200, 800 400 C 1050 600, 1250 200, 1600 350;
                 M-100 400 C 350 250, 550 650, 800 400 C 1050 150, 1250 650, 1600 400" />
          </path>
          
          {/* 3. MATERIALITY: Glassy Liquid Fill (creates thickness and physical structure) */}
          <path 
            className="animate-[wave_16s_ease-in-out_infinite_alternate]"
            fill="url(#glassFill)"
            opacity="0.8"
            style={{ mixBlendMode: 'plus-lighter' }}
            d="M-100 450 C 350 300, 550 700, 800 450 C 1050 200, 1250 700, 1600 450 L 1600 600 C 1250 850, 1050 350, 800 600 C 550 850, 350 450, -100 600 Z"
          >
             <animate attributeName="d" dur="16s" repeatCount="indefinite"
               values="
                 M-100 450 C 350 300, 550 700, 800 450 C 1050 200, 1250 700, 1600 450 L 1600 600 C 1250 850, 1050 350, 800 600 C 550 850, 350 450, -100 600 Z;
                 M-100 380 C 350 650, 550 250, 800 450 C 1050 650, 1250 250, 1600 380 L 1600 530 C 1250 400, 1050 800, 800 600 C 550 400, 350 800, -100 530 Z;
                 M-100 450 C 350 300, 550 700, 800 450 C 1050 200, 1250 700, 1600 450 L 1600 600 C 1250 850, 1050 350, 800 600 C 550 850, 350 450, -100 600 Z" />
          </path>

          {/* Central Soft Core Edge (Replacing harsh white line with soft cyan blend) */}
          <path 
            className="animate-[wave_16s_ease-in-out_infinite_alternate]"
            fill="none"
            stroke="url(#cyanCoreGlow)"
            strokeWidth="35"
            strokeOpacity="0.85"
            filter="url(#bloom)"
            style={{ mixBlendMode: 'screen' }}
            d="M-100 450 C 350 300, 550 700, 800 450 C 1050 200, 1250 700, 1600 450"
          >
             <animate attributeName="d" dur="16s" repeatCount="indefinite"
               values="
                 M-100 450 C 350 300, 550 700, 800 450 C 1050 200, 1250 700, 1600 450;
                 M-100 380 C 350 650, 550 250, 800 450 C 1050 650, 1250 250, 1600 380;
                 M-100 450 C 350 300, 550 700, 800 450 C 1050 200, 1250 700, 1600 450" />
          </path>
          
          {/* Forefront intricate curve adding 3D structure - Softened */}
          <path 
            className="animate-[wave_12s_ease-in-out_infinite_alternate-reverse]"
            fill="none"
            stroke="url(#cyanCoreGlow)"
            strokeWidth="20"
            strokeOpacity="0.75"
            filter="url(#bloom)"
            style={{ mixBlendMode: 'screen' }}
            d="M-100 530 C 450 350, 650 750, 900 530 C 1100 350, 1300 750, 1600 530"
          >
             <animate attributeName="d" dur="12s" repeatCount="indefinite"
               values="
                 M-100 530 C 450 350, 650 750, 900 530 C 1100 350, 1300 750, 1600 530;
                 M-100 460 C 450 700, 650 350, 900 530 C 1100 750, 1300 350, 1600 460;
                 M-100 530 C 450 350, 650 750, 900 530 C 1100 350, 1300 750, 1600 530" />
          </path>
        </svg>

        {/* CSS Glassmorphism & Atmospheric Depth blending over the background elements */}
        <div className="absolute inset-0 backdrop-blur-[1px] opacity-10 pointer-events-none" />
      </motion.div>

      {/* Edge vignettes to naturally blend the wave into the pitch black canvas at top and bottom edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-transparent to-transparent opacity-90 pointer-events-none" />
    </div>
  );
};
