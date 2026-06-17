"use client";

import "./Faq.css";
import { useState } from "react";
import { useT } from "../../lib/i18n";

export default function Faq() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div
          className="section-head"
          style={{ margin: "0 auto 10px", textAlign: "center" }}
        >
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            {t.faq.eyebrow}
          </span>
          <h2>{t.faq.h2}</h2>
        </div>
        <div className="faq">
          {t.faq.items.map((item, i) => (
            <div className={`q${open === i ? " open" : ""}`} key={item.q}>
              <button
                data-cursor=""
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q} <span className="ic">+</span>
              </button>
              <div className="a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
