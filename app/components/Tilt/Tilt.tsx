"use client";

import { useEffect } from "react";

/**
 * Efecto 3D: las tarjetas con la clase `.tilt-3d` se inclinan siguiendo el
 * cursor (perspectiva + rotación) y vuelven suavemente al salir el mouse.
 * Se desactiva en dispositivos sin hover (touch).
 */
export default function Tilt() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".tilt-3d")
    );
    if (!els.length) return;

    const MAX = 7; // grados máximos de inclinación
    const cleanups: Array<() => void> = [];

    els.forEach((el) => {
      el.style.transformStyle = "preserve-3d";
      el.style.willChange = "transform";

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = "transform .08s linear";
        el.style.transform =
          `perspective(900px) rotateY(${px * MAX}deg) ` +
          `rotateX(${py * -MAX}deg) translateY(-6px)`;
      };
      const onLeave = () => {
        el.style.transition = "transform .45s cubic-bezier(.22,.61,.36,1)";
        el.style.transform = "";
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
