import { useEffect, useRef } from 'react';

export const FluidBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrolled = window.scrollY;
      const rate = scrolled * -0.15;
      
      // Apply subtle parallax effect
      containerRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050914] pointer-events-none w-full h-full">
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-80 will-change-transform"
      >
        <svg 
          className="absolute w-full h-full left-0 top-0"
          preserveAspectRatio="none"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Filter for the glowing line effect matching Mentos Aqua Kiss */}
            <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
              {/* Core white/cyan brightness */}
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ffffff" floodOpacity="1" result="core" />
              {/* Inner bright cyan glow */}
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#00d4ff" floodOpacity="0.8" result="innerGlow" />
              {/* Outer deep blue spread */}
              <feDropShadow dx="0" dy="0" stdDeviation="25" floodColor="#0066cc" floodOpacity="0.6" result="outerGlow" />
              {/* Massive ambient blue glow */}
              <feDropShadow dx="0" dy="0" stdDeviation="60" floodColor="#0044aa" floodOpacity="0.4" result="ambientGlow" />
              
              <feMerge>
                <feMergeNode in="ambientGlow" />
                <feMergeNode in="outerGlow" />
                <feMergeNode in="innerGlow" />
                <feMergeNode in="core" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Wave 1 - Slower, wider, background */}
          <path 
            className="animate-[wave_20s_ease-in-out_infinite_alternate]"
            stroke="rgba(187, 252, 255, 1)"
            strokeWidth="10"
            strokeOpacity="0.8"
            filter="url(#neon-glow)"
            d="M-100 450 C 200 300, 400 650, 720 450 C 1000 250, 1200 650, 1500 450"
          >
            <animate attributeName="d" dur="20s" repeatCount="indefinite"
               values="
                 M-100 450 C 200 300, 400 650, 720 450 C 1000 250, 1200 650, 1500 450;
                 M-100 400 C 200 600, 400 300, 720 450 C 1000 600, 1200 300, 1500 400;
                 M-100 450 C 200 300, 400 650, 720 450 C 1000 250, 1200 650, 1500 450" />
          </path>
          
          {/* Wave 2 - Medium speed, middle intersection */}
          <path 
            className="animate-[wave_15s_ease-in-out_infinite_alternate-reverse]"
            stroke="rgba(184, 251, 255, 1)"
            strokeWidth="14"
            strokeOpacity="0.9"
            filter="url(#neon-glow)"
            d="M-100 550 C 300 400, 500 750, 720 550 C 900 350, 1100 750, 1500 550"
          >
            <animate attributeName="d" dur="15s" repeatCount="indefinite"
               values="
                 M-100 550 C 300 400, 500 750, 720 550 C 900 350, 1100 750, 1500 550;
                 M-100 500 C 300 700, 500 350, 720 550 C 900 700, 1100 350, 1500 500;
                 M-100 550 C 300 400, 500 750, 720 550 C 900 350, 1100 750, 1500 550" />
          </path>
          
          {/* Wave 3 - Faster, sharper, foreground */}
          {/* <path 
            className="animate-[wave_25s_ease-in-out_infinite_alternate]"
            stroke="#ffffff"
            strokeWidth="20"
            strokeOpacity="1"
            filter="url(#neon-glow)"
            d="M-100 600 C 200 750, 500 350, 720 600 C 900 850, 1300 400, 1500 650"
          >
            <animate attributeName="d" dur="25s" repeatCount="indefinite"
               values="
                 M-100 600 C 200 750, 500 350, 720 600 C 900 850, 1300 400, 1500 650;
                 M-100 650 C 200 350, 500 800, 720 600 C 900 400, 1300 800, 1500 600;
                 M-100 600 C 200 750, 500 350, 720 600 C 900 850, 1300 400, 1500 650" />
          </path> */}
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
