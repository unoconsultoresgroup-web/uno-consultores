"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Estallido radial de líneas con puntas, estilo red neuronal / flujo de datos.
 * Three.js sobre canvas transparente, con glow aditivo y colores de marca.
 * Las líneas se apartan del cursor (repulsión). Respeta prefers-reduced-motion.
 */
export default function TechBurst() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const N = 400;
    const ORIGIN_Y = -1; // centro del estallido en el borde inferior

    let w = mount.clientWidth || 1;
    let h = mount.clientHeight || 1;
    let aspect = w / h;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10);
    camera.position.z = 5;

    const group = new THREE.Group();
    group.position.y = ORIGIN_Y;
    scene.add(group);

    // --- Datos de cada rayo ---
    const dirX = new Float32Array(N);
    const dirY = new Float32Array(N);
    const lens = new Float32Array(N);
    const start = new Float32Array(N);

    const A0 = -0.26;
    const A1 = Math.PI + 0.26;
    const maxR = Math.hypot(aspect, 2) * 1.05;

    for (let i = 0; i < N; i++) {
      const a = A0 + (A1 - A0) * (i / (N - 1)) + (Math.random() - 0.5) * 0.05;
      dirX[i] = Math.cos(a);
      dirY[i] = Math.sin(a);
      lens[i] = 0.5 + (maxR - 0.5) * Math.pow(Math.random(), 0.62);
      start[i] = Math.random() * 0.5;
    }

    // --- Colores de marca (púrpura) sobre fondo oscuro ---
    const originColor = new THREE.Color().setHSL(274 / 360, 0.85, 0.8);
    const tipColors: THREE.Color[] = [];
    for (let i = 0; i < N; i++) {
      const hue = (272 + dirX[i] * 14) / 360;
      const light = 0.52 + 0.12 * dirY[i];
      tipColors.push(new THREE.Color().setHSL(hue, 0.82, light));
    }

    // --- Líneas ---
    const linePos = new Float32Array(N * 2 * 3);
    const lineCol = new Float32Array(N * 2 * 3);
    for (let i = 0; i < N; i++) {
      lineCol.set([originColor.r, originColor.g, originColor.b], i * 6);
      lineCol.set([tipColors[i].r, tipColors[i].g, tipColors[i].b], i * 6 + 3);
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    // --- Puntas redondas ---
    const dotPos = new Float32Array(N * 3);
    const dotCol = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      dotCol.set([tipColors[i].r, tipColors[i].g, tipColors[i].b], i * 3);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
    dotGeo.setAttribute("color", new THREE.BufferAttribute(dotCol, 3));

    const tex = (() => {
      const s = 64;
      const cnv = document.createElement("canvas");
      cnv.width = cnv.height = s;
      const ctx = cnv.getContext("2d")!;
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.5, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(cnv);
    })();

    const dotMat = new THREE.PointsMaterial({
      size: 5,
      sizeAttenuation: false,
      map: tex,
      vertexColors: true,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      alphaTest: 0.01,
    });
    group.add(new THREE.Points(dotGeo, dotMat));

    // --- Mouse (en coordenadas locales del grupo) ---
    const mouse = new THREE.Vector2(0, 999); // lejos = sin influencia
    const mouseTarget = new THREE.Vector2(0, 999);
    let amt = 0; // intensidad de la influencia (0..1)
    let amtTarget = 0;
    const REPEL = 0.5; // fuerza
    const RADIUS = 0.6; // alcance

    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      amtTarget = inside ? 1 : 0;
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      // a mundo y luego a local (group está en y = ORIGIN_Y)
      mouseTarget.set(ndcX * aspect, ndcY - ORIGIN_Y);
    };
    window.addEventListener("mousemove", onMove);

    // --- Animación ---
    const clock = new THREE.Clock();
    let raf = 0;
    const LINE_DUR = 0.9;
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouse.lerp(mouseTarget, 0.12);
      amt += (amtTarget - amt) * 0.08;

      for (let i = 0; i < N; i++) {
        const p = reduce
          ? 1
          : ease(Math.min(Math.max((t - start[i]) / LINE_DUR, 0), 1));
        let tx = dirX[i] * lens[i] * p;
        let ty = dirY[i] * lens[i] * p;

        if (!reduce) {
          // leve respiración
          const o = 1 + 0.02 * Math.sin(t * 1.3 + i * 0.7);
          tx *= o;
          ty *= o;
          // repulsión desde el cursor
          if (amt > 0.001) {
            const dx = tx - mouse.x;
            const dy = ty - mouse.y;
            const d2 = dx * dx + dy * dy;
            const infl = amt * REPEL * Math.exp(-d2 / (RADIUS * RADIUS));
            const dl = Math.sqrt(d2) || 1;
            tx += (dx / dl) * infl;
            ty += (dy / dl) * infl;
          }
        }

        linePos[i * 6 + 3] = tx;
        linePos[i * 6 + 4] = ty;
        dotPos[i * 3] = tx;
        dotPos[i * 3 + 1] = ty;
      }
      lineGeo.attributes.position.needsUpdate = true;
      dotGeo.attributes.position.needsUpdate = true;

      if (!reduce) dotMat.size = 5 + Math.sin(t * 1.4) * 0.6;

      renderer.render(scene, camera);
    };
    animate();

    // --- Resize ---
    const onResize = () => {
      w = mount.clientWidth || 1;
      h = mount.clientHeight || 1;
      aspect = w / h;
      renderer.setSize(w, h);
      camera.left = -aspect;
      camera.right = aspect;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      lineGeo.dispose();
      dotGeo.dispose();
      lineMat.dispose();
      dotMat.dispose();
      tex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="tech-burst" ref={mountRef} aria-hidden="true" />;
}
