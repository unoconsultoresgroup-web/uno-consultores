"use client";

import { useEffect, useState } from "react";
import "./Hero.css";
import { useLang, useT } from "../../lib/i18n";

// Cada imagen coincide con su palabra (orden: Talento, Cultura, Tecnología).
const HERO_SHOTS = ["/hero-talento.jpg", "/hero-cultura.jpg", "/hero-tech.jpg"];

export default function Hero() {
  const { lang } = useLang();
  const t = useT();
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState(0);

  // dibuja el subrayado al abrir y lo re-dibuja al cambiar de idioma
  useEffect(() => {
    setDrawn(false);
    const id = setTimeout(() => setDrawn(true), 250);
    return () => clearTimeout(id);
  }, [lang]);

  // carrusel automático
  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % HERO_SHOTS.length),
      3500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <header className="hero" id="inicio">
      <div className="hero-mesh" id="mesh"></div>
      <div className="hero-grid-lines"></div>
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">{t.hero.eyebrow}</span>
          <h1>
            {t.hero.h1a}
            <br />
            {t.hero.h1b}
            <br />
            <span className={`em${drawn ? " drawn" : ""}`}>{t.hero.h1em}</span>.
          </h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="hero-ctas">
            <a href="#contacto" className="btn btn-primary" data-cursor="">
              {t.hero.cta1}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#servicios" className="btn btn-outline" data-cursor="">
              {t.hero.cta2}
            </a>
          </div>
          <div className="hero-tags">
            {t.hero.tags.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>

        {/* Carrusel redondo: Talento / Cultura / Tecnología */}
        <div className="hero-carousel">
          <div className="hc-ring">
            <div className="hc-disc">
              {HERO_SHOTS.map((src, i) => (
                <figure
                  key={src}
                  className={`hc-slide${i === active ? " on" : ""}`}
                  aria-hidden={i === active ? undefined : true}
                >
                  <img src={src} alt={t.hero.cubes[i]} width={560} height={560} />
                  <figcaption className="hc-cap">{t.hero.cubes[i]}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="hc-dots">
            {HERO_SHOTS.map((_, i) => (
              <button
                key={i}
                className={i === active ? "on" : ""}
                onClick={() => setActive(i)}
                aria-label={t.hero.cubes[i]}
                data-cursor=""
              />
            ))}
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        <span className="mouse"></span>
        {t.hero.scroll}
      </div>
    </header>
  );
}
