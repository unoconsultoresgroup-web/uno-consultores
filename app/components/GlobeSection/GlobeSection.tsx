"use client";

import "./GlobeSection.css";
import Globe from "./Globe";
import { useT } from "../../lib/i18n";

const ICONS = [
  // cobertura nacional e internacional
  <svg key="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </svg>,
  // modalidad remota e híbrida
  <svg key="remote" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>,
  // tecnología y cercanía
  <svg key="tech" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10Z" />
    <circle cx="12" cy="11" r="2.5" />
  </svg>,
];

export default function GlobeSection() {
  const t = useT();
  return (
    <section className="section globe-sec">
      <div className="wrap globe-grid">
        <div className="globe-copy reveal">
          <span className="eyebrow on-dark">{t.globe.eyebrow}</span>
          <h2>{t.globe.h2}</h2>
          <p>{t.globe.p}</p>
          <ul className="globe-points">
            {t.globe.points.map((point, i) => (
              <li key={point} className="globe-card" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className="gc-ic" aria-hidden="true">
                  {ICONS[i % ICONS.length]}
                </span>
                <span className="gc-txt">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="globe-stage">
          <Globe />
        </div>
      </div>
    </section>
  );
}
