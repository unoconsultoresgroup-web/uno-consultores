"use client";

import "./CookiePolicy.css";
import { useLang } from "../../lib/i18n";

const STORAGE_KEY = "mr_cookie_consent";

const content = {
  es: {
    eyebrow: "Legal",
    h1: "Política de cookies",
    updated: "Última actualización: junio 2026",
    intro:
      "En uno consultores utilizamos cookies y tecnologías similares para garantizar el correcto funcionamiento del sitio, recordar tus preferencias y entender cómo se utiliza la web. A continuación te explicamos qué son, cuáles usamos y cómo podés gestionarlas.",
    s1h: "¿Qué son las cookies?",
    s1p: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitás un sitio web. Permiten recordar información sobre tu visita, como el idioma elegido, para mejorar tu experiencia.",
    s2h: "¿Qué cookies utilizamos?",
    catNecesarias: "Necesarias",
    catNecesariasP:
      "Imprescindibles para que el sitio funcione. No requieren consentimiento y no se pueden desactivar.",
    catAnaliticas: "Analíticas",
    catAnaliticasP:
      "Nos ayudan a entender cómo navegan los visitantes para mejorar el contenido y la experiencia. Solo se activan si las aceptás.",
    catMarketing: "Marketing",
    catMarketingP:
      "Se utilizan para mostrar contenido y campañas relevantes. Solo se activan si las aceptás.",
    thName: "Cookie",
    thPurpose: "Finalidad",
    thType: "Tipo",
    thDuration: "Duración",
    rows: [
      ["mr_cookie_consent", "Guarda tu elección sobre las cookies.", "Necesaria", "180 días"],
      ["lang", "Recuerda el idioma seleccionado (español / inglés).", "Necesaria", "Persistente"],
      ["_ga / _gid", "Medición de uso del sitio (Google Analytics), en caso de aceptarlas.", "Analítica", "Hasta 2 años"],
      ["_fbp / ads", "Cookies de campañas y remarketing, en caso de aceptarlas.", "Marketing", "Hasta 90 días"],
    ],
    s3h: "¿Cómo gestionar tus cookies?",
    s3p: "Podés aceptar o rechazar las cookies no esenciales desde el aviso que aparece al ingresar. También podés cambiar tu elección en cualquier momento desde aquí, o eliminar las cookies almacenadas desde la configuración de tu navegador.",
    reset: "Cambiar mis preferencias de cookies",
    s4h: "Contacto",
    s4p: "Si tenés dudas sobre esta política, escribinos a ",
  },
  en: {
    eyebrow: "Legal",
    h1: "Cookie policy",
    updated: "Last updated: June 2026",
    intro:
      "At uno consultores we use cookies and similar technologies to ensure the site works properly, remember your preferences and understand how the website is used. Below we explain what they are, which ones we use and how you can manage them.",
    s1h: "What are cookies?",
    s1p: "Cookies are small text files stored on your device when you visit a website. They let us remember information about your visit, such as your chosen language, to improve your experience.",
    s2h: "Which cookies do we use?",
    catNecesarias: "Necessary",
    catNecesariasP:
      "Essential for the site to work. They do not require consent and cannot be disabled.",
    catAnaliticas: "Analytics",
    catAnaliticasP:
      "Help us understand how visitors browse so we can improve content and experience. Only enabled if you accept them.",
    catMarketing: "Marketing",
    catMarketingP:
      "Used to show relevant content and campaigns. Only enabled if you accept them.",
    thName: "Cookie",
    thPurpose: "Purpose",
    thType: "Type",
    thDuration: "Duration",
    rows: [
      ["mr_cookie_consent", "Stores your choice about cookies.", "Necessary", "180 days"],
      ["lang", "Remembers the selected language (Spanish / English).", "Necessary", "Persistent"],
      ["_ga / _gid", "Site usage measurement (Google Analytics), if accepted.", "Analytics", "Up to 2 years"],
      ["_fbp / ads", "Campaign and remarketing cookies, if accepted.", "Marketing", "Up to 90 days"],
    ],
    s3h: "How to manage your cookies",
    s3p: "You can accept or reject non-essential cookies from the notice shown when you arrive. You can also change your choice at any time from here, or delete stored cookies from your browser settings.",
    reset: "Change my cookie preferences",
    s4h: "Contact",
    s4p: "If you have questions about this policy, write to us at ",
  },
} as const;

export default function CookiePolicy() {
  const { lang } = useLang();
  const c = content[lang];

  const reset = () => {
    try {
      document.cookie = `${STORAGE_KEY}=; path=/; max-age=0; SameSite=Lax`;
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    window.location.reload();
  };

  return (
    <section className="section cookie-policy">
      <div className="wrap">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1>{c.h1}</h1>
        <p className="cookie-policy__updated">{c.updated}</p>
        <p className="cookie-policy__intro">{c.intro}</p>

        <h2>{c.s1h}</h2>
        <p>{c.s1p}</p>

        <h2>{c.s2h}</h2>
        <div className="cookie-policy__cats">
          <div className="cookie-policy__cat">
            <strong>{c.catNecesarias}</strong>
            <p>{c.catNecesariasP}</p>
          </div>
          <div className="cookie-policy__cat">
            <strong>{c.catAnaliticas}</strong>
            <p>{c.catAnaliticasP}</p>
          </div>
          <div className="cookie-policy__cat">
            <strong>{c.catMarketing}</strong>
            <p>{c.catMarketingP}</p>
          </div>
        </div>

        <div className="cookie-policy__table-wrap">
          <table className="cookie-policy__table">
            <thead>
              <tr>
                <th>{c.thName}</th>
                <th>{c.thPurpose}</th>
                <th>{c.thType}</th>
                <th>{c.thDuration}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r[0]}>
                  <td><code>{r[0]}</code></td>
                  <td>{r[1]}</td>
                  <td>{r[2]}</td>
                  <td>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>{c.s3h}</h2>
        <p>{c.s3p}</p>
        <button type="button" className="btn btn-primary" onClick={reset} data-cursor="">
          {c.reset}
        </button>

        <h2>{c.s4h}</h2>
        <p>
          {c.s4p}
          <a href="mailto:unoconsultoresgroup@gmail.com" className="cookie-policy__mail">
            unoconsultoresgroup@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
