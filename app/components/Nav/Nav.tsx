"use client";

import { useEffect, useState } from "react";
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

  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Bloquea el scroll del body mientras el menú está abierto y permite cerrar
  // con la tecla Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
          <button
            className={`burger${open ? " is-open" : ""}`}
            id="burger"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mm"
            onClick={() => setOpen((o) => !o)}
            data-cursor=""
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* ====================== MENÚ MÓVIL ====================== */}
      <div
        className={`mm-backdrop${open ? " open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        className={`mobile-menu${open ? " open" : ""}`}
        id="mm"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        aria-hidden={!open}
      >
        <div className="mm-top">
          <span className="mm-brand">üno</span>
          <button
            className="mm-close"
            onClick={close}
            aria-label={t.nav.closeMenu}
            data-cursor=""
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="mm-body">
          <a href="/" onClick={close}>{t.nav.home}</a>
          <a href="/#nosotros" onClick={close}>{t.nav.nosotros}</a>
          <a href="/#servicios" onClick={close}>{t.nav.unidadesNeg}</a>
          <div className="mm-sub">
            {units.map((u) => (
              <a
                key={u.slug}
                href={`/servicios/${u.slug}`}
                onClick={close}
              >
                <span
                  className="mm-sub-dot"
                  style={{ background: u.accent }}
                  aria-hidden="true"
                />
                {t.unitNames[u.key].name}
              </a>
            ))}
          </div>
          <a href="/#blog" onClick={close}>{t.nav.blog}</a>
          <a href="/preguntas-frecuentes" onClick={close}>{t.faq.eyebrow}</a>
        </nav>

        <div className="mm-foot">
          <a
            href="/#contacto"
            className="btn btn-wine mm-cta"
            onClick={close}
            data-cursor=""
          >
            {t.nav.cta} →
          </a>
          <button className="lang-toggle mm-lang" onClick={toggle}>
            {next}
          </button>
        </div>
      </aside>
    </>
  );
}
