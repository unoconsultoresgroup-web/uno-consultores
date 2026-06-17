"use client";

import "./Blog.css";
import { useT } from "../../lib/i18n";

export default function Blog() {
  const t = useT();
  return (
    <section
      className="section"
      id="blog"
      style={{ background: "var(--bone)" }}
    >
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{t.blog.eyebrow}</span>
          <h2>{t.blog.h2}</h2>
          <p>{t.blog.p}</p>
        </div>
        <div className="posts">
          <article className="post reveal tilt-3d" data-d="0">
            <div className="cover">
              <span>{t.blog.p1cat}</span>
            </div>
            <div className="body">
              <h4>{t.blog.p1t}</h4>
              <p>{t.blog.p1p}</p>
              <div className="read">{t.blog.read}</div>
            </div>
          </article>
          <article className="post reveal tilt-3d" data-d="1">
            <div className="cover c2">
              <span>{t.blog.p2cat}</span>
            </div>
            <div className="body">
              <h4>{t.blog.p2t}</h4>
              <p>{t.blog.p2p}</p>
              <div className="read">{t.blog.read}</div>
            </div>
          </article>
          <article className="post reveal tilt-3d" data-d="2">
            <div className="cover c3">
              <span>{t.blog.p3cat}</span>
            </div>
            <div className="body">
              <h4>{t.blog.p3t}</h4>
              <p>{t.blog.p3p}</p>
              <div className="read">{t.blog.read}</div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
