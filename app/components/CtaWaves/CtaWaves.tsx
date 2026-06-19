import "./CtaWaves.css";

export default function CtaWaves() {
  return (
    <div className="cta-waves" aria-hidden="true">
      <svg
        className="cta-waves__svg"
        viewBox="0 0 150 40"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="cta-wave"
            d="M-160 20c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v40h-352z"
          />
          <linearGradient id="cta-grad-1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#40bfb4" />
            <stop offset="50%" stopColor="#9b3cdf" />
            <stop offset="100%" stopColor="#727372" />
          </linearGradient>
          <linearGradient id="cta-grad-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9b3cdf" />
            <stop offset="50%" stopColor="#727372" />
            <stop offset="100%" stopColor="#40bfb4" />
          </linearGradient>
        </defs>
        <g className="cta-waves__parallax">
          <use href="#cta-wave" x="48" y="14" fill="url(#cta-grad-2)" fillOpacity="0.45" />
          <use href="#cta-wave" x="48" y="18" fill="url(#cta-grad-1)" fillOpacity="0.7" />
          <use href="#cta-wave" x="48" y="22" fill="url(#cta-grad-1)" fillOpacity="1" />
        </g>
      </svg>
    </div>
  );
}
