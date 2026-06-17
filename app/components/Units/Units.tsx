"use client";

import type { CSSProperties, ReactNode } from "react";
import "./Units.css";
import { units } from "../../lib/units";
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

  if (u.key === "do") {
    // Crecimiento organizacional: 3 columnas 3D de distinto color
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

  if (u.key === "psico") {
    // Mente: cerebro ilustrado (SVG) con sinapsis, animado
    return (
      <div className="u3d-scene" aria-hidden="true">
        <div className="o-brain">
          <svg className="brain-svg" viewBox="0 0 200 160">
            <defs>
              <radialGradient id="brainGrad" cx="34%" cy="26%" r="86%">
                <stop offset="0" stopColor="#fbeaff" />
                <stop offset="0.42" stopColor="#B266F0" />
                <stop offset="0.78" stopColor="#7A35D6" />
                <stop offset="1" stopColor="#4A1C9E" />
              </radialGradient>
              <linearGradient id="brainStemGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7A35D6" />
                <stop offset="1" stopColor="#4A1C9E" />
              </linearGradient>
              <radialGradient id="brainGloss" cx="34%" cy="24%" r="50%">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* tronco encefálico */}
            <path className="brain-stem" d="M120,104 C116,124 138,126 136,106 Z" />

            {/* cerebelo (lóbulo estriado, atrás-abajo) */}
            <path className="brain-cere" d="M150,86 C170,86 172,112 151,114 C139,115 132,104 137,95 C140,89 145,86 150,86 Z" />
            <path className="brain-line cere-l" d="M147,90 C156,92 158,100 150,103" />
            <path className="brain-line cere-l" d="M146,99 C153,101 155,108 148,110" />

            {/* cerebro (perfil lateral, frente a la izquierda) */}
            <path
              className="brain-body"
              d="M46,96
                 C24,86 28,58 50,52
                 C46,32 70,24 84,38
                 C92,22 116,26 120,44
                 C132,28 160,32 158,56
                 C176,62 175,88 153,90
                 C156,104 138,114 124,104
                 C112,114 92,112 86,100
                 C70,110 50,108 46,96 Z"
            />

            {/* brillo glossy */}
            <path
              className="brain-gloss"
              d="M46,96 C24,86 28,58 50,52 C46,32 70,24 84,38 C92,22 116,26 120,44 C132,28 160,32 158,56 C176,62 175,88 153,90 C156,104 138,114 124,104 C112,114 92,112 86,100 C70,110 50,108 46,96 Z"
            />

            {/* circunvoluciones en espiral (gyri) */}
            <path className="brain-line" d="M54,88 C38,76 44,54 66,50 C86,46 98,60 92,74" />
            <path className="brain-line" d="M70,64 C82,59 94,68 89,80" />
            <path className="brain-line" d="M92,44 C106,42 118,54 113,68 C110,78 98,80 91,73" />
            <path className="brain-line" d="M122,46 C140,48 150,64 140,76 C134,83 123,82 119,72" />
            <path className="brain-line" d="M58,78 C68,73 79,79 81,90" />
            <path className="brain-line" d="M100,86 C110,82 120,88 119,98" />

            {/* sinapsis */}
            <circle className="syn s1" cx="70" cy="58" r="3.2" />
            <circle className="syn s2" cx="118" cy="60" r="3.2" />
            <circle className="syn s3" cx="96" cy="92" r="3.2" />
          </svg>
        </div>
      </div>
    );
  }

  if (u.key === "legal") {
    // Justicia: mano con toga sosteniendo el martillo y golpeando
    return (
      <div className="u3d-scene" aria-hidden="true">
        <div className="o-gavel">
          <span className="gv-block" />
          <span className="gv-spark" />
          <div className="gv-tool">
            <span className="gv-head" />
            <span className="gv-handle" />
            <span className="gv-sleeve" />
            <span className="gv-fist" />
          </div>
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
      </div>
    </section>
  );
}
