"use client";

import "./Footer.css";
import { units } from "../../lib/units";
import { useT } from "../../lib/i18n";

export default function Footer() {
  const t = useT();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a href="/" className="brand" data-cursor="">
              <img
                className="brand-logo"
                src="/logo-sin-fondo-ezgif.com-crop.png"
                alt="üno consultores"
                width={120}
                height={96}
              />
            </a>
            <p className="ab">{t.footer.about}</p>
            <div className="socials">
              <a
                className="cs-link"
                href="mailto:unoconsultoresgroup@gmail.com"
                aria-label="Correo"
                data-cursor=""
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </a>
              <a
                className="cs-link"
                href="https://wa.me/541176661157"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                data-cursor=""
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.2-.2-1.2-1.5-1.2-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.1.1.7-.1 1.3Z" />
                </svg>
              </a>
              <a
                className="cs-link"
                href="https://www.linkedin.com/company/mr-consultores"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                data-cursor=""
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4 0 4.74 2.5 4.74 5.8V21h-4v-5.2c0-1.24-.02-2.84-1.9-2.84-1.9 0-2.2 1.36-2.2 2.75V21h-4z" />
                </svg>
              </a>
              <a
                className="cs-link"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-cursor=""
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h5>{t.footer.unidades}</h5>
            <ul>
              {units.map((u) => (
                <li key={u.slug}>
                  <a href={`/servicios/${u.slug}`}>{t.unitNames[u.key].name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{t.footer.navegacion}</h5>
            <ul>
              <li><a href="/#nosotros">{t.footer.nosotros}</a></li>
              <li><a href="/#servicios">{t.footer.unidades}</a></li>
              <li><a href="/#casos">{t.footer.casos}</a></li>
              <li><a href="/#blog">{t.footer.blog}</a></li>
              <li><a href="/preguntas-frecuentes">{t.footer.faq}</a></li>
              <li><a href="/politica-de-cookies">{t.footer.politicaCookies}</a></li>
            </ul>
          </div>
          <div>
            <h5>{t.footer.contacto}</h5>
            <ul>
              <li><a href="mailto:unoconsultoresgroup@gmail.com">unoconsultoresgroup@gmail.com</a></li>
              <li><a href="tel:+541176661157">+54 11 7666 1157</a></li>
              <li><a href="#">Argentina</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © <span id="year"></span> {t.footer.rights}
          </span>
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
