"use client";

import type { CSSProperties } from "react";

import { useLang, useT } from "../../lib/i18n";
import { getUnit, unitDetailEn } from "../../lib/units";
import CtaWaves from "../../components/CtaWaves/CtaWaves";

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

const heroImg: Record<string, string> = {
  rrhh: "/unit-rrhh.jpg",
  do: "/unit-do.jpg",
  psico: "/unit-psico.jpg",
  legal: "/unit-legal.jpg",
  tech: "/unit-tech.jpg",
};

export default function UnitView({ slug }: { slug: string }) {
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
      {/* ===== Hero de la unidad ===== */}
      <section
        className="u-hero u-hero--photo"
        style={v({ "--hero-img": `url(${heroImg[key]})` })}
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

      {/* ===== Intro + servicios ===== */}
      <section className="section u-services-sec">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{up.solveEyebrow}</span>
            <h2>{c.highlight}</h2>
            <p>{c.intro}</p>
          </div>
          <div className="u-services">
            {c.services.map((s) => (
              <article className="u-service" key={s.title}>
                <span className="u-service-mark" aria-hidden="true" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
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
        <CtaWaves />
        <div className="wrap u-cta-band__content">
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
