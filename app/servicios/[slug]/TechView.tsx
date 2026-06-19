"use client";

import type { CSSProperties } from "react";

import { useLang, useT } from "../../lib/i18n";
import { getUnit, unitDetailEn } from "../../lib/units";

const v = (vars: Record<string, string>) => vars as CSSProperties;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

/* Celular 3D con captura de app (se mueve solo) */
const Phone = () => (
  <div className="u-phone-stage" aria-hidden="true">
    <div className="u-phone">
      <span className="u-phone-notch" />
      <div className="u-phone-screen app">
        <div className="app-status">
          <span>9:41</span>
          <span className="app-status-dots">
            <i /><i /><i />
          </span>
        </div>
        <div className="app-head">
          <div>
            <span className="app-hi">Hola, equipo 👋</span>
            <span className="app-sub">Panel del proyecto</span>
          </div>
          <span className="app-av" />
        </div>
        <div className="app-hero-card">
          <span className="app-hero-label">Sprint actual</span>
          <span className="app-hero-num">87%</span>
          <span className="app-hero-foot">12 tareas · 3 en revisión</span>
          <span className="app-live">● en vivo</span>
        </div>
        <div className="app-chart">
          {[44, 72, 56, 90, 64, 80].map((h, i) => (
            <span key={i} style={{ "--h": `${h}%` } as CSSProperties} />
          ))}
        </div>
        <div className="app-list">
          {["API Gateway", "Auth service", "Dashboard"].map((r) => (
            <div className="app-row" key={r}>
              <span className="app-row-ic" />
              <span className="app-row-name">{r}</span>
              <span className="app-row-tag" />
            </div>
          ))}
        </div>
        <div className="app-tabs">
          <i className="on" /><i /><i /><i />
        </div>
      </div>
    </div>
  </div>
);

/* Página de detalle dedicada a Tecnología y Producto. */
export default function TechView({ slug }: { slug: string }) {
  const { lang } = useLang();
  const t = useT();
  const unit = getUnit(slug);
  if (!unit) return null;

  const { Icon, key, accent } = unit;
  const name = t.unitNames[key].name;
  const up = t.unitPage;

  // ES vive en `units`; EN en `unitDetailEn`.
  const c =
    lang === "en"
      ? unitDetailEn[key]
      : {
          tagline: unit.tagline,
          intro: unit.intro,
          highlight: unit.highlight,
          services: unit.services,
          deliverables: unit.deliverables,
        };

  return (
    <main
      className="unit-page"
      style={v({ "--accent": "var(--wine)", "--accent-2": accent })}
    >
      {/* ===== Hero ===== */}
      <section
        className="u-hero u-hero--photo"
        style={v({ "--hero-img": `url(/unit-tech.jpg)` })}
      >
        <div className="u-hero-lines" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="u-crumbs" aria-label="Breadcrumb">
            <a href="/" data-cursor="">
              {up.crumbHome}
            </a>
            <span>/</span>
            <a href="/#servicios" data-cursor="">
              {up.crumbServices}
            </a>
            <span>/</span>
            <strong>{name}</strong>
          </nav>
          <div className="u-hero-grid">
            <div className="u-hero-copy">
              <span className="eyebrow">
                {up.serviceLabel} · {name}
              </span>
              <h1>{name}</h1>
              <p className="u-tagline">{c.tagline}</p>
              <div className="u-hero-ctas">
                <a href="/#contacto" className="btn btn-primary" data-cursor="">
                  {up.ctaProposal}
                  <Arrow />
                </a>
                <a href="/#servicios" className="btn u-btn-ghost" data-cursor="">
                  {up.ctaAll}
                </a>
              </div>
            </div>
            <div className="u-hero-icon" aria-hidden="true">
              <Icon />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Qué resolvemos: capacidades + celular ===== */}
      <section className="section u-services-sec">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{up.solveEyebrow}</span>
            <h2>{c.highlight}</h2>
            <p>{c.intro}</p>
          </div>
          <div className="u-solve-grid">
            <div className="u-solve-caps">
              {up.techCaps.map((s) => (
                <article className="u-ai-card" key={s.t}>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                </article>
              ))}
            </div>
            <Phone />
          </div>
        </div>
      </section>

      {/* ===== IA (imagen + copy) ===== */}
      <section className="section u-ai-sec">
        <div className="wrap u-ai-grid">
          <div className="u-ai-visual">
            <img
              className="u-ai-photo"
              src="/pexels-divinetechygirl-1181673.jpg"
              alt=""
              width={560}
              height={700}
            />
          </div>
          <div className="u-ai-copy">
            <span className="eyebrow">{up.aiEyebrow}</span>
            <h2>{up.aiH2}</h2>
            <p>{up.aiP}</p>
            <div className="u-ai-cards">
              {up.aiPoints.map((p) => (
                <article className="u-ai-card" key={p.t}>
                  <h3>{p.t}</h3>
                  <p>{p.p}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Qué incluye (entregables) ===== */}
      <section className="section u-incluye-sec">
        <div className="wrap">
          <div className="u-incluye-grid">
            <div className="u-incluye-head">
              <span className="eyebrow">{up.includeEyebrow}</span>
              <h2>{up.includeH2}</h2>
              <p>{up.includeP}</p>
              <a href="/#contacto" className="btn btn-primary" data-cursor="">
                {up.includeCta}
                <Arrow />
              </a>
            </div>
            <ul className="u-incluye-list">
              {c.deliverables.map((d) => (
                <li key={d}>
                  <span className="u-check" aria-hidden="true">
                    <Check />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="u-cta-band">
        <div className="wrap">
          <h2>
            {up.ctaBandPre} {name}?
          </h2>
          <p>{up.ctaBandP}</p>
          <a href="/#contacto" className="btn btn-primary" data-cursor="">
            {up.ctaProposal}
            <Arrow />
          </a>
        </div>
      </section>
    </main>
  );
}
