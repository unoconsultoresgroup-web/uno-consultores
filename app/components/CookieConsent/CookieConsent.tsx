"use client";

import { useEffect, useState } from "react";
import "./CookieConsent.css";
import { useT } from "../../lib/i18n";

const STORAGE_KEY = "mr_cookie_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 días

export type ConsentValue = "all" | "essential";

/** Guarda la elección en cookie (legible por el servidor/terceros) y en localStorage. */
function persist(value: ConsentValue) {
  try {
    document.cookie = `${STORAGE_KEY}=${value}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
    localStorage.setItem(STORAGE_KEY, value);
    // Señal para que cualquier integración (analytics/marketing) reaccione.
    window.dispatchEvent(
      new CustomEvent("cookie-consent", { detail: value })
    );
  } catch {
    /* almacenamiento no disponible */
  }
}

export default function CookieConsent() {
  const t = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    if (saved !== "all" && saved !== "essential") {
      // Pequeño delay para no competir con el primer pintado.
      const id = window.setTimeout(() => setVisible(true), 600);
      return () => window.clearTimeout(id);
    }
  }, []);

  const decide = (value: ConsentValue) => {
    persist(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-bar"
      role="dialog"
      aria-live="polite"
      aria-label={t.cookies.title}
    >
      <div className="cookie-bar__inner">
        <div className="cookie-bar__text">
          <strong className="cookie-bar__title">{t.cookies.title}</strong>
          <p>
            {t.cookies.desc}{" "}
            <a href="/politica-de-cookies" className="cookie-bar__link">
              {t.cookies.more}
            </a>
          </p>
        </div>
        <div className="cookie-bar__actions">
          <button
            type="button"
            className="btn cookie-bar__btn cookie-bar__btn--ghost"
            onClick={() => decide("essential")}
            data-cursor=""
          >
            {t.cookies.reject}
          </button>
          <button
            type="button"
            className="btn btn-primary cookie-bar__btn"
            onClick={() => decide("all")}
            data-cursor=""
          >
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
