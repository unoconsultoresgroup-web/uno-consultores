"use client";

import "./CtaBanner.css";
import { useT } from "../../lib/i18n";

export default function CtaBanner() {
  const t = useT();
  return (
    <section className="section cta-banner">
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

      <div className="wrap cta-inner reveal">
        <span className="eyebrow">{t.cta.eyebrow}</span>
        <h2>{t.cta.h2}</h2>
        <p>{t.cta.p}</p>
        <a href="#contacto" className="btn btn-ghost" data-cursor="">
          {t.cta.btn}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
