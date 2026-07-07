"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import "./Units.css";
import { units, specialists } from "../../lib/units";
import { useT } from "../../lib/i18n";

const v = (vars: Record<string, string>) => vars as CSSProperties;

type UnitItem = (typeof units)[number];

/** Pantalla holográfica compartida (mismo estilo que Tecnología). */
function Holo({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="u3d-scene" aria-hidden="true">
      <div className={`holo h-${k}`}>
        <div className="holo-grid" />
        <div className="holo-body">{children}</div>
      </div>
    </div>
  );
}

/** Visual por unidad: Tecnología = pantalla holográfica; el resto = objeto 3D ilustrado. */
function UnitVisual({ u }: { u: UnitItem }) {
  if (u.key === "rrhh") {
    // Personas: grupo de 3 figuras 3D de distinto color
    return (
      <div className="u3d-scene" aria-hidden="true">
        <div className="o-people">
          <div className="fig a">
            <span className="f-head" />
            <span className="f-body" />
          </div>
          <div className="fig b mid">
            <span className="f-head" />
            <span className="f-body" />
          </div>
          <div className="fig c">
            <span className="f-head" />
            <span className="f-body" />
          </div>
        </div>
      </div>
    );
  }

  if (u.key === "seleccion") {
    // Selección: lupa 3D buscando talento
    return (
      <div className="u3d-scene" aria-hidden="true">
        <div className="o-search">
          <span className="os-lens" />
          <span className="os-handle" />
          <span className="os-spark s1" />
          <span className="os-spark s2" />
        </div>
      </div>
    );
  }

  if (u.key === "do") {
    // Formación y desarrollo: 3 columnas 3D en ascenso
    return (
      <div className="u3d-scene" aria-hidden="true">
        <div className="o-cols">
          <span className="o-col c1" />
          <span className="o-col c2" />
          <span className="o-col c3" />
        </div>
      </div>
    );
  }

  // Tecnología y Automatización: única con impronta tecnológica (pantalla holográfica)
  return (
    <Holo k="tech">
      <div className="u3d-bars">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`u3d-bar b${n}`} />
        ))}
      </div>
    </Holo>
  );
}

export default function Units() {
  const t = useT();
  // Acordeón de especialistas (solo actúa en mobile; en desktop se ve todo).
  const [openSpecs, setOpenSpecs] = useState<string[]>([]);
  const toggleSpec = (k: string) =>
    setOpenSpecs((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]
    );
  // Acordeón del mapa (solo mobile): un servicio abierto a la vez.
  const [openUnit, setOpenUnit] = useState<string | null>(null);
  return (
    <section className="section map-sec" id="servicios">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t.units.eyebrow}</span>
          <h2>{t.units.h2}</h2>
          <p>{t.units.p}</p>
        </div>
        <div className="map">
          <div className="map-list" id="mapList">
            {units.map((u, i) => (
              <div
                key={u.key}
                className={`map-item${i === 0 ? " on" : ""}`}
                data-u={u.key}
                style={v({ "--accent": i % 2 === 0 ? "var(--wine)" : u.accent })}
              >
                <span className="mi-ic">
                  <u.Icon />
                </span>
                <div>
                  <h4>{t.unitNames[u.key].name}</h4>
                  <p>{t.unitNames[u.key].short}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="map-detail" id="mapDetail">
            {units.map((u, i) => {
              return (
                <div
                  key={u.key}
                  className={`map-panel${i === 0 ? " show" : ""}`}
                  data-p={u.key}
                  style={v({ "--accent": i % 2 === 0 ? "var(--wine)" : u.accent })}
                >
                  <UnitVisual u={u} />
                  <h3>{t.unitNames[u.key].name}</h3>
                  <p>{u.intro}</p>
                  <div className="chips">
                    {u.services.map((s) => (
                      <span key={s.title}>{s.title}</span>
                    ))}
                  </div>
                  <div className="p-ctas">
                    <a
                      href={`/servicios/${u.slug}`}
                      className="btn btn-primary p-cta"
                      data-cursor=""
                    >
                      {t.units.verUnidad}
                    </a>
                    <a href="#contacto" className="p-link" data-cursor="">
                      {t.units.solicitar}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== Mapa como acordeón (solo mobile) ===== */}
        <div className="map-acc">
          {units.map((u, i) => {
            const open = openUnit === u.key;
            return (
              <div
                key={u.key}
                className={`macc-item${open ? " open" : ""}`}
                style={v({ "--accent": i % 2 === 0 ? "var(--wine)" : u.accent })}
              >
                <button
                  type="button"
                  className="macc-head"
                  onClick={() => setOpenUnit(open ? null : u.key)}
                  aria-expanded={open}
                  data-cursor=""
                >
                  <span className="macc-ic" aria-hidden="true">
                    <u.Icon />
                  </span>
                  <span className="macc-txt">
                    <strong>{t.unitNames[u.key].name}</strong>
                    <small>{t.unitNames[u.key].short}</small>
                  </span>
                  <span className="macc-caret" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div className="macc-panel">
                  <div className="macc-body">
                    <p className="macc-intro">{u.intro}</p>
                    <div className="macc-chips">
                      {u.services.map((s) => (
                        <span key={s.title}>{s.title}</span>
                      ))}
                    </div>
                    <div className="macc-ctas">
                      <a
                        href={`/servicios/${u.slug}`}
                        className="btn btn-primary"
                        data-cursor=""
                      >
                        {t.units.verUnidad}
                      </a>
                      <a href="#contacto" className="macc-link" data-cursor="">
                        {t.units.solicitar}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== Red de especialistas ===== */}
        <div className="specialists">
          <div className="specialists-head">
            <span className="eyebrow">{t.specialists.eyebrow}</span>
            <p>{t.specialists.p}</p>
          </div>
          <div className="specialists-grid">
            {specialists.map((s) => {
              const open = openSpecs.includes(s.key);
              return (
                <article
                  key={s.key}
                  className={`spec-card${open ? " open" : ""}`}
                  style={v({ "--accent": s.accent })}
                >
                  <span className="spec-ic" aria-hidden="true">
                    <s.Icon />
                  </span>
                  <div className="spec-body">
                    <button
                      type="button"
                      className="spec-head"
                      onClick={() => toggleSpec(s.key)}
                      aria-expanded={open}
                      data-cursor=""
                    >
                      <h4>{t.specialists[s.key].name}</h4>
                      <span className="spec-caret" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </button>
                    <div className="spec-panel">
                      <ul className="spec-items">
                        {t.specialists[s.key].items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
