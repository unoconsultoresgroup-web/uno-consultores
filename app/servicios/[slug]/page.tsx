import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";

import CursorUI from "../../components/CursorUI";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Interactions from "../../components/Interactions";
import { units, getUnit } from "../../lib/units";
import "./UnitPage.css";

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

/* Genera las 5 rutas estáticas en build. */
export function generateStaticParams() {
  return units.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) return {};
  const description = `${unit.name} — ${unit.tagline} ${unit.highlight}`;
  return {
    title: unit.name,
    description,
    alternates: { canonical: `/servicios/${unit.slug}` },
    openGraph: {
      title: `${unit.name} · uno consultores`,
      description,
      url: `/servicios/${unit.slug}`,
    },
  };
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) notFound();

  const { Icon } = unit;
  const others = units.filter((u) => u.slug !== unit.slug);
  const isTech = unit.key === "tech";
  const heroImg: Record<string, string> = {
    rrhh: "/unit-rrhh.jpg",
    do: "/unit-do.jpg",
    psico: "/unit-psico.jpg",
    legal: "/unit-legal.jpg",
    tech: "/unit-tech.jpg",
  };
  // Encuadre del fondo por unidad (imágenes verticales se enfocan en el sujeto)
  const heroPos: Record<string, string> = {};

  return (
    <>
      <CursorUI />
      <Nav light />
      <main
        className="unit-page"
        style={v({ "--accent": "var(--wine)", "--accent-2": unit.accent })}
      >
        {/* ===== Hero de la unidad ===== */}
        <section
          className="u-hero u-hero--photo"
          style={v({
            "--hero-img": `url(${heroImg[unit.key]})`,
            ...(heroPos[unit.key] ? { "--hero-pos": heroPos[unit.key] } : {}),
          })}
        >
          <div className="u-hero-lines" aria-hidden="true"></div>
          <div className="wrap">
            <nav className="u-crumbs" aria-label="Migas de pan">
              <a href="/" data-cursor="">
                Inicio
              </a>
              <span>/</span>
              <a href="/#servicios" data-cursor="">
                Servicios
              </a>
              <span>/</span>
              <strong>{unit.name}</strong>
            </nav>
            <div className="u-hero-grid">
              <div className="u-hero-copy">
                <span className="eyebrow">{unit.eyebrow}</span>
                <h1>{unit.name}</h1>
                <p className="u-tagline">{unit.tagline}</p>
                <div className="u-hero-ctas">
                  <a
                    href="/#contacto"
                    className="btn btn-primary"
                    data-cursor=""
                  >
                    Solicitar propuesta
                    <Arrow />
                  </a>
                  <a href="/#servicios" className="btn u-btn-ghost" data-cursor="">
                    Ver todos los servicios
                  </a>
                </div>
              </div>
              <div className="u-hero-icon" aria-hidden="true">
                <Icon />
              </div>
            </div>
          </div>
        </section>

        {isTech && (
          /* ===== Modalidades: ingenieros senior de Argentina (arriba de Qué resolvemos) ===== */
          <section className="section u-modes-sec">
            <div className="wrap u-modes-grid">
              <div className="u-modes-copy">
                <span className="eyebrow">Software Factory</span>
                <h2>Construimos las aplicaciones que tu negocio necesita.</h2>
                <p>
                  Somos tu software factory: tomamos tu producto de punta a
                  punta. Desarrollamos aplicaciones a medida para web, mobile y
                  desktop, con inteligencia artificial integrada donde suma
                  valor real.
                </p>
                <div className="u-modes">
                  <article className="u-mode">
                    <h3>De la idea al producto</h3>
                    <p>
                      Diseño, desarrollo, QA y entrega: te acompañamos en todo
                      el ciclo con un equipo completo y metodología propia.
                    </p>
                  </article>
                  <article className="u-mode">
                    <h3>Multiplataforma + IA</h3>
                    <p>
                      Web, mobile y desktop sobre un mismo stack moderno, con
                      integración de inteligencia artificial a tus procesos.
                    </p>
                  </article>
                </div>
              </div>
              {/* Celular 3D con una captura de app (se mueve solo) */}
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
            </div>
          </section>
        )}

        {/* ===== Intro + servicios ===== */}
        <section className="section u-services-sec">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Qué resolvemos</span>
              <h2>{unit.highlight}</h2>
              <p>{unit.intro}</p>
            </div>
            <div className="u-services">
              {unit.services.map((s) => (
                <article className="u-service" key={s.title}>
                  <span className="u-service-mark" aria-hidden="true" />
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {isTech && (
          /* ===== IA (imagen + copy) ===== */
          <section className="section u-ai-sec">
            <div className="wrap u-ai-grid">
              <div className="u-ai-visual">
                <img
                  className="u-ai-photo"
                  src="/pexels-divinetechygirl-1181673.jpg"
                  alt="Equipo trabajando con inteligencia artificial"
                  width={560}
                  height={700}
                />
              </div>
              <div className="u-ai-copy">
                <span className="eyebrow">Inteligencia Artificial</span>
                <h2>IA donde realmente aporta valor</h2>
                <p>
                  Detectamos dónde la inteligencia artificial mueve la aguja del
                  negocio y la implementamos de forma segura y medible: agentes
                  que asisten y ejecutan tareas, automatización de procesos y
                  capacidades nuevas conectadas a tu información.
                </p>
                <div className="u-ai-cards">
                  <article className="u-ai-card">
                    <h3>Agentes de IA</h3>
                    <p>
                      Asisten, responden y ejecutan tareas conectados a tus
                      sistemas y datos.
                    </p>
                  </article>
                  <article className="u-ai-card">
                    <h3>Automatización con IA</h3>
                    <p>
                      Flujos y procesos repetitivos resueltos combinando IA con
                      tus herramientas actuales.
                    </p>
                  </article>
                  <article className="u-ai-card">
                    <h3>IA aplicada al negocio</h3>
                    <p>
                      Oportunidades detectadas y soluciones a medida, con foco
                      en resultados concretos.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== Qué incluye (entregables) ===== */}
        <section className="section u-incluye-sec">
          <div className="wrap">
            <div className="u-incluye-grid">
              <div className="u-incluye-head">
                <span className="eyebrow">Qué incluye</span>
                <h2>Herramientas listas para implementar</h2>
                <p>
                  Cada proyecto se diseña según las necesidades de tu empresa.
                  Estos son algunos de los entregables concretos que recibirás
                  al finalizar este servicio.
                </p>
                <a href="/#contacto" className="btn btn-primary" data-cursor="">
                  Armar mi propuesta
                  <Arrow />
                </a>
              </div>
              <ul className="u-incluye-list">
                {unit.deliverables.map((d) => (
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
              ¿Listo para resolver {unit.name.toLowerCase()} con respaldo
              profesional?
            </h2>
            <p>
              Contanos tu desafío y armamos juntos una propuesta a la medida de
              tu organización.
            </p>
            <a href="/#contacto" className="btn btn-primary" data-cursor="">
              Solicitar propuesta
              <Arrow />
            </a>
          </div>
        </section>

        {/* ===== Otras unidades (Mapa de soluciones) ===== */}

      </main>
      <Footer />
      <Interactions />
    </>
  );
}
