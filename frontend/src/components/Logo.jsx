export const Logo = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="logo-g" x1="8" y1="6" x2="24" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="30" height="30" rx="9" fill="#09090B" stroke="rgba(255,255,255,0.14)" />
    <path
      d="M11 23.5V9h6.4a4.6 4.6 0 0 1 0 9.2H11"
      stroke="url(#logo-g)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="22.6" cy="22.6" r="2.1" fill="#8B5CF6" />
  </svg>
);

export default Logo;
