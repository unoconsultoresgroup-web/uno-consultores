"use client";

import { useEffect } from "react";

const GTM_ID = "GTM-WWNGJQ2P";
const STORAGE_KEY = "mr_cookie_consent";

/**
 * Carga Google Tag Manager únicamente cuando el usuario aceptó TODAS las
 * cookies ("all") en el banner de consentimiento. Reacciona tanto al estado
 * ya guardado (visitas posteriores) como al evento "cookie-consent" que emite
 * el componente CookieConsent cuando el usuario decide.
 */
export default function GtmConsent() {
  useEffect(() => {
    let loaded = false;

    const loadGtm = () => {
      if (loaded || window.__gtmLoaded) return;
      loaded = true;
      window.__gtmLoaded = true;

      // Snippet oficial de GTM (equivalente al <script> del <head>).
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);

      // Equivalente al <noscript><iframe> que va tras <body>.
      const noscript = document.createElement("noscript");
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
      iframe.height = "0";
      iframe.width = "0";
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      noscript.appendChild(iframe);
      document.body.appendChild(noscript);
    };

    // ¿Ya había aceptado en una visita anterior?
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* almacenamiento no disponible */
    }
    if (saved === "all") loadGtm();

    // Reaccionar a la decisión en vivo desde el banner.
    const onConsent = (e: Event) => {
      const value = (e as CustomEvent).detail;
      if (value === "all") loadGtm();
    };
    window.addEventListener("cookie-consent", onConsent);
    return () => window.removeEventListener("cookie-consent", onConsent);
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    __gtmLoaded?: boolean;
  }
}
