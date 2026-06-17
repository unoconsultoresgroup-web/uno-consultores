"use client";

import "./Cases.css";
import { useT } from "../../lib/i18n";

export default function Cases() {
  const t = useT();
  return (
    <section className="section" id="casos">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t.cases.eyebrow}</span>
          <h2>{t.cases.h2}</h2>
          <p>
            {t.cases.p} <span>{t.cases.pEm}</span>
          </p>
        </div>
        <div className="cases">
          <div className="case reveal tilt-3d" data-d="0">
            <div className="metric">93%</div>
            <h4>{t.cases.c1t}</h4>
            <p>{t.cases.c1p}</p>
            <div className="ph">{t.cases.destacado}</div>
          </div>
          <div className="case reveal tilt-3d" data-d="1">
            <div className="metric">+2.000</div>
            <h4>{t.cases.c2t}</h4>
            <p>{t.cases.c2p}</p>
            <div className="ph">{t.cases.destacado}</div>
          </div>
          <div className="case reveal tilt-3d" data-d="2">
            <div className="metric">∞</div>
            <h4>{t.cases.c3t}</h4>
            <p>{t.cases.c3p}</p>
            <div className="ph">{t.cases.proximo}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
