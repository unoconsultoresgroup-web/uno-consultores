// @ts-nocheck
"use client";

import { useEffect } from "react";

/**
 * Toda la interactividad del sitio original, portada desde el <script> del
 * HTML "Experiencia". Se ejecuta una sola vez tras el montaje, operando sobre
 * el mismo DOM (mismos id/clases) que renderizan las secciones.
 *
 * Cada bloque está protegido con guardas: el home tiene todos los elementos,
 * pero las páginas de detalle (/servicios/[slug]) solo montan nav, cursor y
 * footer, por lo que los bloques sin sus elementos simplemente no se activan.
 */
export default function Interactions() {
  useEffect(() => {
    // Evita doble ejecución (el JS original crea nodos/dots y no es idempotente).
    if ((window as any).__mrInit) return;
    (window as any).__mrInit = true;

    /* ===== Cursor ===== */
    const dot = document.getElementById("cDot"),
      ring = document.getElementById("cRing");
    if (dot && ring) {
      let mx = innerWidth / 2,
        my = innerHeight / 2,
        rx = mx,
        ry = my;
      addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + "px";
        dot.style.top = my + "px";
      });
      (function loop() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
        requestAnimationFrame(loop);
      })();
      document.querySelectorAll("[data-cursor],a,button").forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("grow"));
        el.addEventListener("mouseleave", () => ring.classList.remove("grow"));
      });
    }

    /* ===== Nav + progreso ===== */
    const nav = document.getElementById("nav"),
      prog = document.getElementById("prog");
    if (nav || prog) {
      addEventListener("scroll", () => {
        const sc = scrollY;
        if (nav) nav.classList.toggle("scrolled", sc > 40);
        if (prog) {
          const h = document.body.scrollHeight - innerHeight;
          prog.style.width = (sc / h) * 100 + "%";
        }
      });
    }

    /* El menú móvil ahora lo controla el componente Nav (estado React):
       toggle del burger, cierre con Escape/backdrop/link y bloqueo de scroll. */

    /* ===== Mesh reactivo ===== */
    const mesh = document.getElementById("mesh");
    if (mesh) {
      addEventListener("mousemove", (e) => {
        mesh.style.setProperty("--mx", (e.clientX / innerWidth) * 100 + "%");
        mesh.style.setProperty("--my", (e.clientY / innerHeight) * 100 + "%");
      });
    }

    /* ===== Orbital ===== */
    const orbital = document.getElementById("orbital"),
      links = document.getElementById("links");
    if (orbital && links) {
      const units = [
        {
          c: "#1F1F24",
          label: "RRHH",
          svg: '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 3-5.5 6.5-5.5s6.5 1.9 6.5 5.5"/>',
        },
        {
          c: "#3C3C42",
          label: "Desarrollo",
          svg: '<circle cx="12" cy="12" r="3.2"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/>',
        },
        {
          c: "#9b3cdf",
          label: "Psicología",
          svg: '<path d="M12 4a5 5 0 0 0-5 5c0 1.7.8 2.8.8 4 0 1.3 1.2 2 4.2 2s4.2-.7 4.2-2c0-1.2.8-2.3.8-4a5 5 0 0 0-5-5Z"/>',
        },
        {
          c: "#55555C",
          label: "Legal",
          svg: '<path d="M12 4v16M6 8h12M8 8l-2.5 5h5zM16 8l2.5 5h-5z"/>',
        },
        {
          c: "#2A2A30",
          label: "Tecnología",
          svg: '<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M9 20h6M12 16v4"/>',
        },
      ];
      let nodes = [],
        angle = 0,
        paused = false,
        orbVisible = false;
      units.forEach((u, i) => {
        const n = document.createElement("div");
        n.className = "node";
        n.style.setProperty("--accent", u.c);
        n.innerHTML =
          '<span class="bub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
          u.svg +
          "</svg></span><label>" +
          u.label +
          "</label>";
        n.setAttribute("data-cursor", "");
        n.addEventListener("mouseenter", () => (paused = true));
        n.addEventListener("mouseleave", () => (paused = false));
        n.addEventListener("click", () =>
          document
            .getElementById("servicios")
            ?.scrollIntoView({ behavior: "smooth" })
        );
        orbital.appendChild(n);
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("stroke", u.c);
        line.setAttribute("stroke-width", "1.2");
        line.setAttribute("stroke-opacity", ".4");
        links.appendChild(line);
        nodes.push({ el: n, line: line });
      });
      function placeOrbit() {
        const R = orbital.clientWidth / 2,
          cx = R,
          cy = R,
          rad = R * 0.74;
        units.forEach((u, i) => {
          const a = angle + (i / units.length) * Math.PI * 2,
            x = cx + Math.cos(a) * rad,
            y = cy + Math.sin(a) * rad * 0.82;
          nodes[i].el.style.left = x + "px";
          nodes[i].el.style.top = y + "px";
          nodes[i].line.setAttribute("x1", cx);
          nodes[i].line.setAttribute("y1", cy);
          nodes[i].line.setAttribute("x2", x);
          nodes[i].line.setAttribute("y2", y);
        });
      }
      function orbitLoop() {
        if (orbVisible) {
          if (!paused) angle += 0.0024;
          placeOrbit();
        }
        requestAnimationFrame(orbitLoop);
      }
      new IntersectionObserver(
        (es) => es.forEach((e) => (orbVisible = e.isIntersecting)),
        { threshold: 0.05 }
      ).observe(orbital);
      placeOrbit();
      orbitLoop();
      addEventListener("resize", placeOrbit);
    }

    /* ===== Reveal + contadores + barras ===== */
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    function countUp(el) {
      const to = +el.dataset.to,
        span = el.querySelector("span");
      let c = 0,
        i = 0,
        n = 55;
      const t = setInterval(() => {
        c += to / n;
        i++;
        span.textContent = Math.round(c).toLocaleString("es-AR");
        if (i >= n) {
          span.textContent = to.toLocaleString("es-AR");
          clearInterval(t);
        }
      }, 20);
    }
    const ioStat = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            const num = e.target.querySelector(".num");
            if (num) countUp(num);
            const b = e.target.querySelector(".bar i");
            if (b) b.style.width = b.dataset.w;
            ioStat.unobserve(e.target);
          }
        }),
      { threshold: 0.5 }
    );
    document.querySelectorAll(".stat").forEach((s) => ioStat.observe(s));

    /* ===== Carrusel ===== */
    const track = document.getElementById("cTrack"),
      dotsWrap = document.getElementById("cDots"),
      cNext = document.getElementById("cNext"),
      cPrev = document.getElementById("cPrev");
    if (track && dotsWrap && cNext && cPrev) {
      const cards = [...track.children];
      let idx = 0,
        auto;
      cards.forEach((_, i) => {
        const b = document.createElement("button");
        b.setAttribute("data-cursor", "");
        if (i === 0) b.className = "on";
        b.addEventListener("click", () => {
          go(i);
          restart();
        });
        dotsWrap.appendChild(b);
      });
      const dots = [...dotsWrap.children];
      function go(i) {
        idx = (i + cards.length) % cards.length;
        const card = cards[idx];
        const off =
          card.offsetLeft -
          (track.parentElement.clientWidth - card.clientWidth) / 2;
        track.style.transform = "translateX(" + -off + "px)";
        cards.forEach((c, k) => c.classList.toggle("active", k === idx));
        dots.forEach((d, k) => d.classList.toggle("on", k === idx));
      }
      cNext.addEventListener("click", () => {
        go(idx + 1);
        restart();
      });
      cPrev.addEventListener("click", () => {
        go(idx - 1);
        restart();
      });
      function restart() {
        clearInterval(auto);
        auto = setInterval(() => go(idx + 1), 5000);
      }
      addEventListener("resize", () => go(idx));
      new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            e.isIntersecting ? (go(idx), restart()) : clearInterval(auto);
          }),
        { threshold: 0.2 }
      ).observe(track);
      setTimeout(() => go(0), 100);
    }

    /* ===== Mapa de unidades ===== */
    const mapItems = [...document.querySelectorAll(".map-item")],
      panels = [...document.querySelectorAll(".map-panel")],
      detail = document.getElementById("mapDetail");
    if (mapItems.length && detail) {
      function activate(u) {
        mapItems.forEach((i) => i.classList.toggle("on", i.dataset.u === u));
        panels.forEach((p) => p.classList.toggle("show", p.dataset.p === u));
        detail.style.setProperty(
          "--accent",
          document
            .querySelector('.map-item[data-u="' + u + '"]')
            .style.getPropertyValue("--accent")
        );
      }
      mapItems.forEach((it) => {
        it.addEventListener("mouseenter", () => activate(it.dataset.u));
        it.addEventListener("click", () => activate(it.dataset.u));
      });
    }

    /* ===== Timeline progreso ===== */
    const tl = document.getElementById("timeline"),
      tprog = document.getElementById("tprog");
    if (tl && tprog) {
      const tlItems = [...document.querySelectorAll(".tl-item")];
      addEventListener("scroll", () => {
        const r = tl.getBoundingClientRect(),
          vh = innerHeight;
        let p = (vh * 0.7 - r.top) / r.height;
        p = Math.max(0, Math.min(1, p));
        tprog.style.height = p * 100 + "%";
        // Aditivo: una vez que un paso se reveló, NO se vuelve a ocultar.
        // (El toggle anterior le quitaba `.in` a los pasos por debajo del 70%
        // del viewport, deshaciendo el reveal y dejándolos en opacity:0.)
        tlItems.forEach((it) => {
          if (it.getBoundingClientRect().top < vh * 0.78) it.classList.add("in");
        });
      });
    }

    /* ===== FAQ ===== */
    document.querySelectorAll(".q button").forEach((b) =>
      b.addEventListener("click", () => {
        const q = b.parentElement,
          a = q.querySelector(".a"),
          open = q.classList.contains("open");
        document.querySelectorAll(".q").forEach((x) => {
          x.classList.remove("open");
          x.querySelector(".a").style.maxHeight = null;
        });
        if (!open) {
          q.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      })
    );

    /* El envío del formulario lo maneja el componente Contact (React)
       mediante /api/proposal. */

    /* ===== Año ===== */
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear().toString();
  }, []);

  return null;
}
