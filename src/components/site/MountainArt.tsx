export function MountainHero() {
  return (
    <svg
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10200f" />
          <stop offset="100%" stopColor="#2f5233" />
        </linearGradient>
        <linearGradient id="m1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a301f" />
          <stop offset="100%" stopColor="#24402a" />
        </linearGradient>
      </defs>
      <rect width="1200" height="500" fill="url(#sky)" />
      <circle cx="1000" cy="110" r="70" fill="#d9a441" opacity="0.85" />
      <path
        d="M0,340 L150,190 L260,290 L400,140 L520,300 L650,170 L800,320 L950,210 L1080,300 L1200,230 L1200,500 L0,500 Z"
        fill="url(#m1)"
        opacity="0.9"
      />
      <path
        d="M0,420 L180,300 L320,380 L480,270 L620,400 L780,290 L940,390 L1100,300 L1200,360 L1200,500 L0,500 Z"
        fill="#10200f"
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
