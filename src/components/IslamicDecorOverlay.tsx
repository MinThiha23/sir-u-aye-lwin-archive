// Component for Islamic corners and sparkles

const GoldGradientDefs = () => (
    <svg width="0" height="0" className="absolute">
        <defs>
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="25%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="75%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <radialGradient id="gold-radial" cx="0%" cy="0%" r="100%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#d97706" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
            </radialGradient>
        </defs>
    </svg>
);

const CornerOrnament = ({ className }: { className: string }) => (
    <svg
        className={`absolute w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 opacity-25 mix-blend-screen transition-opacity ${className}`}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Base geometric web */}
        <path
            d="M0 0 L200 0 C200 40 180 80 150 110 C120 140 80 160 40 170 L0 200 Z"
            fill="url(#gold-radial)"
        />
        <path
            d="M0 0 L150 0 C150 30 130 60 100 80 C70 100 30 110 0 120 Z"
            stroke="url(#gold-grad)" strokeWidth="2" fill="none"
        />
        <circle cx="0" cy="0" r="140" stroke="url(#gold-grad)" strokeWidth="1.strokeDasharray" fill="none" strokeDasharray="4 6" />
        <circle cx="0" cy="0" r="100" stroke="url(#gold-grad)" strokeWidth="3" fill="none" />
        <circle cx="0" cy="0" r="60" stroke="url(#gold-grad)" strokeWidth="1" strokeDasharray="2 4" fill="none" />

        {/* Star 8-point quarter */}
        <path d="M0 100 L15 65 L65 65 L65 15 L100 0" stroke="url(#gold-grad)" strokeWidth="2" fill="none" />
        <path d="M0 60 L10 40 L40 40 L40 10 L60 0" stroke="url(#gold-grad)" strokeWidth="1.5" fill="none" />

        {/* Hanging lamp / ornamental drops */}
        <path d="M80 0 L80 80 M120 0 L120 40" stroke="url(#gold-grad)" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="80" cy="85" r="5" fill="url(#gold-grad)" />
        <circle cx="120" cy="45" r="3" fill="url(#gold-grad)" />
    </svg>
);

const MotifTop = ({ className, flip = false }: { className?: string, flip?: boolean }) => (
  <div className={`absolute opacity-70 ${className} ${flip ? 'scale-x-[-1]' : ''}`}>
    <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          {`
            @keyframes motif-float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
            @keyframes motif-swing {
              0%, 100% { transform: rotate(-5deg); }
              50% { transform: rotate(5deg); }
            }
            .motif-swing { animation: motif-swing 6s ease-in-out infinite; transform-origin: 25px 0px; }
            .motif-float { animation: motif-float 4s ease-in-out infinite; }
            .motif-glow { filter: drop-shadow(0 0 4px rgba(253, 224, 71, 0.6)); }
          `}
        </style>
      </defs>

      {/* Glowing Crescent Moon */}
      <path className="motif-float motif-glow" d="M85 30 A 25 25 0 1 0 50 75 A 32 32 0 1 1 85 30 Z" fill="url(#gold-grad)" opacity="0.9" />
      
      {/* Small floating stars */}
      <circle className="motif-float motif-glow" cx="75" cy="15" r="1.5" fill="#fde047" style={{ animationDelay: '1s' }} />
      <circle className="motif-float motif-glow" cx="90" cy="45" r="1" fill="#fde047" style={{ animationDelay: '2s' }} />
      <circle className="motif-float motif-glow" cx="45" cy="20" r="2" fill="#fde047" style={{ animationDelay: '1.5s' }} />

      {/* Hanging Lantern */}
      <g className="motif-swing">
        <line x1="25" y1="0" x2="25" y2="40" stroke="url(#gold-grad)" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M18 40 L32 40 L36 55 L14 55 Z" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
        <path d="M14 55 L36 55 L28 65 L22 65 Z" fill="url(#gold-grad)" opacity="0.8" />
        <circle cx="25" cy="48" r="4" fill="#fef08a" className="motif-glow" />
        <path d="M20 40 Q25 30 30 40 Z" fill="url(#gold-grad)" />
      </g>
    </svg>
  </div>
);

const MotifBottom = ({ className, flip = false }: { className?: string, flip?: boolean }) => (
  <div className={`absolute opacity-70 ${className} ${flip ? 'scale-x-[-1]' : ''}`}>
    <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glowing Crescent Moon */}
      <path className="motif-float motif-glow" d="M30 40 A 25 25 0 1 0 75 75 A 32 32 0 1 1 30 40 Z" fill="url(#gold-grad)" opacity="0.9" style={{ animationDelay: '2s' }} />
      
      {/* Small floating stars */}
      <circle className="motif-float motif-glow" cx="85" cy="50" r="2" fill="#fde047" style={{ animationDelay: '0.5s' }} />
      <circle className="motif-float motif-glow" cx="20" cy="70" r="1.5" fill="#fde047" style={{ animationDelay: '2.5s' }} />

      {/* Mosque Silhouette resting on bottom */}
      <g className="opacity-90">
        <path d="M40 100 L40 70 Q40 55 50 45 Q60 55 60 70 L60 100 Z" fill="url(#gold-grad)" />
        <rect x="30" y="65" width="4" height="35" fill="url(#gold-grad)" />
        <polygon points="30 65, 32 55, 34 65" fill="url(#gold-grad)" />
        <rect x="66" y="65" width="4" height="35" fill="url(#gold-grad)" />
        <polygon points="66 65, 68 55, 70 65" fill="url(#gold-grad)" />
      </g>
    </svg>
  </div>
);

const IslamicDecorOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <GoldGradientDefs />
      
      {/* Base Geometric Corners */}
      <CornerOrnament className="top-0 left-0" />
      <CornerOrnament className="top-0 right-0 rotate-90" />
      <CornerOrnament className="bottom-0 right-0 rotate-180" />
      <CornerOrnament className="bottom-0 left-0 -rotate-90" />

      {/* Floating Crescent, Lanterns, & Mosques */}
      <MotifTop className="top-4 left-4 lg:top-8 lg:left-8" />
      <MotifTop className="top-4 right-4 lg:top-8 lg:right-8" flip={true} />
      
      <MotifBottom className="bottom-0 left-4 lg:bottom-0 lg:left-8" />
      <MotifBottom className="bottom-0 right-4 lg:bottom-0 lg:right-8" flip={true} />
    </div>
  );
};

export default IslamicDecorOverlay;
