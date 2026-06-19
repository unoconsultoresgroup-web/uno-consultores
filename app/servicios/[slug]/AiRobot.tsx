/* Robot de IA a color (estilo tech) + íconos de capacidades.
   Pura presentación (CSS/SVG), sin estado. Decorativo. */

const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
    <path d="M4 5h16v11H8l-4 3z" />
    <path d="M8 10h8M8 13h5" />
  </svg>
);
const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
    <path d="M13 3L5 13h5l-1 8 8-10h-5z" />
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
  </svg>
);
const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
    <path d="M5 20V10M10 20V5M15 20v-7M20 20v-11" />
  </svg>
);

/** Mismo orden que `aiPoints` en el diccionario, para que las cards matcheen. */
export const cardIcons = [IconChat, IconBolt, IconTarget, IconChart];

export default function AiRobot() {
  return (
    <div className="ai-robot" aria-hidden="true">
      <svg className="ai-robot-svg" viewBox="0 0 200 210" fill="none">
        <defs>
          <linearGradient id="robHead" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c98cf0" />
            <stop offset="0.5" stopColor="#9b3cdf" />
            <stop offset="1" stopColor="#6f23a8" />
          </linearGradient>
          <linearGradient id="robBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9b3cdf" />
            <stop offset="1" stopColor="#5a1a86" />
          </linearGradient>
          <radialGradient id="robEye" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.5" stopColor="#7df0ff" />
            <stop offset="1" stopColor="#22b8d6" />
          </radialGradient>
        </defs>

        <g className="ai-robot-bob">
          {/* antena */}
          <line className="rob-antenna" x1="100" y1="40" x2="100" y2="22" />
          <circle className="rob-bulb" cx="100" cy="17" r="7" />

          {/* brazos */}
          <rect className="rob-arm" x="20" y="120" width="16" height="44" rx="8" />
          <rect className="rob-arm" x="164" y="120" width="16" height="44" rx="8" />

          {/* orejas */}
          <rect className="rob-ear" x="34" y="96" width="12" height="30" rx="5" />
          <rect className="rob-ear" x="154" y="96" width="12" height="30" rx="5" />

          {/* cabeza */}
          <rect x="46" y="44" width="108" height="98" rx="28" fill="url(#robHead)" />
          {/* pantalla / cara */}
          <rect x="60" y="60" width="80" height="66" rx="18" fill="#1a0628" />

          {/* ojos */}
          <g className="rob-eyes">
            <circle cx="84" cy="88" r="9" fill="url(#robEye)" />
            <circle cx="116" cy="88" r="9" fill="url(#robEye)" />
          </g>
          {/* sonrisa */}
          <path
            className="rob-smile"
            d="M86 108 q14 10 28 0"
            stroke="#7df0ff"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* cuerpo */}
          <rect x="58" y="150" width="84" height="50" rx="18" fill="url(#robBody)" />
          {/* panel del pecho */}
          <rect x="80" y="164" width="40" height="22" rx="7" fill="#2a0a40" />
          <circle className="rob-core" cx="100" cy="175" r="6" fill="url(#robEye)" />
        </g>
      </svg>
    </div>
  );
}
