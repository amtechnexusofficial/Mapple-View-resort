export function MountainHero() {
  return (
    <svg
      viewBox="0 0 1200 560"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141210" />
          <stop offset="55%" stopColor="#1c1916" />
          <stop offset="100%" stopColor="#1f5d5a" />
        </linearGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7fc4bd" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#4a938d" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4a938d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ridgeFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#20413f" />
          <stop offset="100%" stopColor="#1a3634" />
        </linearGradient>
        <linearGradient id="ridgeMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#211e1a" />
          <stop offset="100%" stopColor="#2c2822" />
        </linearGradient>
      </defs>

      <rect width="1200" height="560" fill="url(#sky)" />

      {/* stars */}
      <g fill="#f6f3ec">
        <circle cx="120" cy="70" r="1.4" opacity="0.7" />
        <circle cx="230" cy="130" r="1" opacity="0.5" />
        <circle cx="340" cy="60" r="1.6" opacity="0.6" />
        <circle cx="470" cy="150" r="1" opacity="0.4" />
        <circle cx="600" cy="80" r="1.3" opacity="0.6" />
        <circle cx="720" cy="45" r="1" opacity="0.5" />
        <circle cx="180" cy="200" r="1" opacity="0.35" />
        <circle cx="380" cy="180" r="1.2" opacity="0.4" />
        <circle cx="60" cy="150" r="1" opacity="0.45" />
      </g>

      {/* moon with soft glow */}
      <circle cx="1000" cy="130" r="150" fill="url(#moonGlow)" />
      <circle cx="1000" cy="130" r="64" fill="#8fcec7" opacity="0.9" />
      <circle cx="1022" cy="112" r="64" fill="#141210" opacity="0.55" />

      {/* far ridge */}
      <path
        d="M0,380 L140,300 L250,350 L380,270 L520,360 L660,290 L800,370 L940,280 L1080,355 L1200,300 L1200,560 L0,560 Z"
        fill="url(#ridgeFar)"
        opacity="0.75"
      />

      {/* mid ridge */}
      <path
        d="M0,420 L150,320 L260,390 L400,280 L520,400 L650,310 L800,410 L950,320 L1080,400 L1200,340 L1200,560 L0,560 Z"
        fill="url(#ridgeMid)"
        opacity="0.92"
      />

      {/* near ridge, near-silhouette */}
      <path
        d="M0,480 L180,380 L320,450 L480,360 L620,470 L780,380 L940,460 L1100,370 L1200,420 L1200,560 L0,560 Z"
        fill="#141210"
      />
    </svg>
  );
}

export function MountainDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0,80 L120,40 L220,70 L360,20 L480,80 L620,30 L760,75 L900,35 L1040,70 L1200,20 L1200,120 L0,120 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * A topographic contour-line motif used as this site's signature texture
 * wherever a real photograph isn't available yet (room cards, section
 * backdrops). Reads as an intentional mountain-survey map, not a "missing
 * image" placeholder.
 */
export function ContourLines({
  className = "",
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M-20,260 Q60,225 140,250 T300,235 T440,258" opacity="0.9" />
        <path d="M-20,225 Q75,180 155,215 T320,185 T440,215" opacity="0.75" />
        <path d="M-20,188 Q90,138 185,175 T345,135 T440,170" opacity="0.6" />
        <path d="M-20,150 Q100,95 205,135 T365,88 T440,122" opacity="0.45" />
        <path d="M-20,110 Q110,52 225,95 T385,42 T440,75" opacity="0.3" />
      </g>
    </svg>
  );
}

const sceneVariants = {
  dawn: {
    sky: ["#e9e3d3", "#c9dedb", "#7fb3ab"],
    sun: "#e7d9b8",
    sunOpacity: 0.9,
    ridgeFar: ["#8fada7", "#6f9a92"],
    ridgeMid: ["#4a6a63", "#37524c"],
    ridgeNear: "#25423d",
  },
  day: {
    sky: ["#dcecea", "#a9d2cc", "#4a938d"],
    sun: "#f6f3ec",
    sunOpacity: 0.95,
    ridgeFar: ["#3f6b64", "#2f5b54"],
    ridgeMid: ["#24413c", "#1c3430"],
    ridgeNear: "#12211e",
  },
  dusk: {
    sky: ["#141210", "#1c1916", "#1f5d5a"],
    sun: "#8fcec7",
    sunOpacity: 0.9,
    ridgeFar: ["#20413f", "#1a3634"],
    ridgeMid: ["#211e1a", "#2c2822"],
    ridgeNear: "#141210",
  },
} as const;

/**
 * A "view from the room" scene standing in for a real window photograph:
 * layered ridgelines at a time of day, always within the site's own
 * palette rather than arbitrary stock-photo colors. Three variants give
 * visual variety across a set of room cards without implying three
 * different actual views.
 */
export function RoomViewScene({
  variant = "day",
  className = "",
}: {
  variant?: keyof typeof sceneVariants;
  className?: string;
}) {
  const v = sceneVariants[variant];
  const uid = variant;
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={v.sky[0]} />
          <stop offset="55%" stopColor={v.sky[1]} />
          <stop offset="100%" stopColor={v.sky[2]} />
        </linearGradient>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={v.sun} stopOpacity="0.45" />
          <stop offset="100%" stopColor={v.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`ridgeFar-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={v.ridgeFar[0]} />
          <stop offset="100%" stopColor={v.ridgeFar[1]} />
        </linearGradient>
        <linearGradient id={`ridgeMid-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={v.ridgeMid[0]} />
          <stop offset="100%" stopColor={v.ridgeMid[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#sky-${uid})`} />
      <circle cx="290" cy="90" r="70" fill={`url(#glow-${uid})`} />
      <circle cx="290" cy="90" r="20" fill={v.sun} opacity={v.sunOpacity} />
      <path
        d="M-10,190 L60,150 L110,180 L170,130 L230,185 L290,145 L340,190 L410,155 L410,300 L-10,300 Z"
        fill={`url(#ridgeFar-${uid})`}
        opacity="0.85"
      />
      <path
        d="M-10,215 L70,165 L130,205 L200,145 L260,210 L320,160 L410,200 L410,300 L-10,300 Z"
        fill={`url(#ridgeMid-${uid})`}
      />
      <path
        d="M-10,250 L90,195 L160,240 L240,180 L320,245 L410,205 L410,300 L-10,300 Z"
        fill={v.ridgeNear}
      />
    </svg>
  );
}

/** A minimal peak glyph used as this brand's mark, next to the wordmark. */
export function MountainMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 18.5 9 8l3.2 5.1L15 9l6.5 9.5Z" />
      <circle cx="17.2" cy="6.3" r="1.6" />
    </svg>
  );
}
