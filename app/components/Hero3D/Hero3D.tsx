"use client";

import { useEffect, useState } from "react";
import "./Hero3D.css";
import HeroCanvas from "./HeroCanvas";
import { useLang, useT } from "../../lib/i18n";

/**
 * Hero con fondo de animación 3D (three.js) a pantalla completa y títulos que
 * aparecen de a uno al cargar la página. Reemplaza al hero anterior (guardado
 * en components/Hero).
 */
export default function Hero3D() {
  const { lang } = useLang();
  const t = useT();
  const [shown, setShown] = useState(false);

  // Dispara la aparición escalonada al montar y al cambiar de idioma.
  useEffect(() => {
    setShown(false);
    const id = window.setTimeout(() => setShown(true), 80);
    return () => window.clearTimeout(id);
  }, [lang]);

  return (
    <header className={`hero3d${shown ? " in" : ""}`} id="inicio">
      <HeroCanvas />
      <div className="hero3d-veil" aria-hidden="true" />

      <div className="wrap hero3d-inner">
        <span className="hero3d-eyebrow reveal-line d0">{t.hero.eyebrow}</span>
        <h1 className="hero3d-title">
          <span className="reveal-line d1">{t.hero.h1a}</span>
          <span className="reveal-line d2">{t.hero.h1b}</span>
          <span className="reveal-line d3">
            <em>{t.hero.h1em}</em>.
          </span>
        </h1>
        <p className="hero3d-lead reveal-line d4">{t.hero.lead}</p>
        <div className="hero3d-ctas reveal-line d5">
          <a href="#contacto" className="btn btn-primary" data-cursor="">
            {t.hero.cta1}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href="#servicios" className="btn hero3d-ghost" data-cursor="">
            {t.hero.cta2}
          </a>
        </div>
      </div>

      <div className="hero3d-cue reveal-line d6" aria-hidden="true">
        <span className="hero3d-mouse" />
        {t.hero.scroll}
      </div>
    </header>
  );
}
