"use client";

import "./Stats.css";
import { useT } from "../../lib/i18n";

export default function Stats() {
  const t = useT();
  return (
    <section className="stats">
      <div className="wrap stats-grid">
        <div className="stat reveal" data-d="0">
          <div className="num" data-to="6" data-suf="+">
            <span>0</span>
            <span className="suf">+</span>
          </div>
          <div className="lbl">{t.stats.exp}</div>
          <div className="bar"><i data-w="70%"></i></div>
        </div>
        <div className="stat reveal" data-d="1">
          <div className="num" data-to="93" data-suf="%">
            <span>0</span>
            <span className="suf">%</span>
          </div>
          <div className="lbl">{t.stats.gptw}</div>
          <div className="bar"><i data-w="93%"></i></div>
        </div>
        <div className="stat reveal" data-d="2">
          <div className="num" data-to="2000" data-suf="+">
            <span>0</span>
            <span className="suf">+</span>
          </div>
          <div className="lbl">{t.stats.colab}</div>
          <div className="bar"><i data-w="85%"></i></div>
        </div>
        <div className="stat reveal" data-d="3">
          <div className="num" data-to="5" data-suf="">
            <span>0</span>
          </div>
          <div className="lbl">{t.stats.unidades}</div>
          <div className="bar"><i data-w="100%"></i></div>
        </div>
      </div>
    </section>
  );
}
