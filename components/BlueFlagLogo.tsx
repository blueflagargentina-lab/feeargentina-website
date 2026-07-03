export default function BlueFlagLogo({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Blue Flag"
      className={className}
    >
      <rect width="200" height="200" rx="20" fill="#0072BC" />
      <circle cx="100" cy="92" r="76" fill="#ffffff" />
      <clipPath id="bf-circle-clip">
        <circle cx="100" cy="92" r="76" />
      </clipPath>
      <g clipPath="url(#bf-circle-clip)">
        <path d="M18 122 Q100 86 182 122" stroke="#0072BC" strokeWidth="15" fill="none" strokeLinecap="round" />
        <path d="M8 148 Q100 104 192 148" stroke="#0072BC" strokeWidth="17" fill="none" strokeLinecap="round" />
        <path d="M-2 174 Q100 122 202 174" stroke="#0072BC" strokeWidth="19" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
