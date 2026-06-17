"use client";

import "./Nav.css";
import { units } from "../../lib/units";
import { useLang, useT } from "../../lib/i18n";

const Caret = () => (
  <svg
    className="nav-caret"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function Nav({ light = false }: { light?: boolean }) {
  const { lang, toggle } = useLang();
  const t = useT();
  const next = lang === "es" ? "EN" : "ES";

  return (
    <>
      {/* ====================== NAV ====================== */}
      <nav className={`nav${light ? " nav-light" : ""}`} id="nav">
        <div className="wrap nav-inner">
          <a href="/" className="brand" data-cursor="">
            <img
              className="brand-logo"
              src="/logo-sin-fondo-ezgif.com-crop.png"
              alt="üno consultores"
              width={120}
              height={96}
            />
          </a>
          <div className="nav-links">
            <a href="/" data-cursor="">{t.nav.home}</a>
            <a href="/#nosotros" data-cursor="">{t.nav.nosotros}</a>
            <div className="nav-drop">
              <a href="/#servicios" className="nav-drop-trigger" data-cursor="">
                {t.nav.unidades}
                <Caret />
              </a>
              <div className="nav-drop-menu" role="menu">
                {units.map((u, i) => (
                  <a key={u.slug} href={`/servicios/${u.slug}`} data-cursor="">
                    <span
                      className="nd-dot"
                      style={{ background: i % 2 === 0 ? "var(--wine)" : u.accent }}
                      aria-hidden="true"
                    />
                    <span>
                      <strong>{t.unitNames[u.key].name}</strong>
                      <small>{t.unitNames[u.key].short}</small>
                    </span>
                  </a>
                ))}
                <a href="/#servicios" className="nd-all" data-cursor="">
                  {t.nav.verMapa}
                </a>
              </div>
            </div>
            <a href="/preguntas-frecuentes" data-cursor="">{t.nav.faq}</a>
            <a href="/#contacto" className="btn btn-wine nav-cta" data-cursor="">
              {t.nav.cta}
            </a>
            <button
              className="lang-toggle"
              onClick={toggle}
              aria-label="Español / English"
              data-cursor=""
            >
              {next}
            </button>
          </div>
          <button className="burger" id="burger" aria-label="Menú">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className="mobile-menu" id="mm">
        <button className="lang-toggle mm-lang" onClick={toggle}>
          {next}
        </button>
        <a href="/">{t.nav.home}</a>
        <a href="/#nosotros">{t.nav.nosotros}</a>
        <a href="/#servicios">{t.nav.unidadesNeg}</a>
        <div className="mm-sub">
          {units.map((u) => (
            <a key={u.slug} href={`/servicios/${u.slug}`}>
              {t.unitNames[u.key].name}
            </a>
          ))}
        </div>
        <a href="/#blog">{t.nav.blog}</a>
        <a href="/preguntas-frecuentes">{t.faq.eyebrow}</a>
        <a href="/#contacto" style={{ color: "var(--clay-soft)" }}>
          {t.nav.cta} →
        </a>
      </div>
    </>
  );
}
