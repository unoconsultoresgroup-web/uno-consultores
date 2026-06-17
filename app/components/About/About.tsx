"use client";

import type { CSSProperties } from "react";
import "./About.css";
import { useT } from "../../lib/i18n";

const v = (vars: Record<string, string>) => vars as CSSProperties;

export default function About() {
  const t = useT();

  return (
    <section className="section" id="nosotros">
      <div className="wrap about-grid">
        {/* Izquierda: imagen corporativa (misma altura que el texto) */}
        <div className="about-visual">
          <div className="about-photo">
            <img
              src="/about-nosotros.png"
              alt={t.about.photoAlt}
              width={1024}
              height={1536}
            />
          </div>
        </div>

        {/* Derecha: contenido */}
        <div className="about-content">
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1.1rem" }}>
            {t.about.h2}
          </h2>
          <p className="about-lead">{t.about.lead}</p>
          <div className="about-blocks">
            <div className="about-block" style={v({ "--accent": "#1F1F24" })}>
              <span className="ab-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M7 14l4-4 4 3 4-6" />
                </svg>
              </span>
              <div>
                <h4>{t.about.b1t}</h4>
                <p>{t.about.b1p}</p>
              </div>
            </div>
            <div className="about-block" style={v({ "--accent": "#3C3C42" })}>
              <span className="ab-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </span>
              <div>
                <h4>{t.about.b2t}</h4>
                <p>{t.about.b2p}</p>
              </div>
            </div>
            <div className="about-block" style={v({ "--accent": "#55555C" })}>
              <span className="ab-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6z" />
                </svg>
              </span>
              <div>
                <h4>{t.about.b3t}</h4>
                <p>{t.about.b3p}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fundadora: banda con el mismo fondo que "Alcance global" */}
      <div className="founder-band">
        <div className="wrap founder">
          <blockquote className="founder-quote">{t.about.quote}</blockquote>
          <figure className="founder-card">
            <div className="founder-photo">
              <img
                src="/micaela.webp"
                alt={t.about.founderAlt}
                width={320}
                height={320}
              />
            </div>
            <figcaption>
              <strong>{t.about.founderName}</strong>
              <span>{t.about.founderRole}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
