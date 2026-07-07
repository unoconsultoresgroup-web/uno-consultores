"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fondo 3D del hero: una malla de puntos que ondula como una superficie de
 * datos, en la paleta púrpura de marca, con profundidad por niebla y un leve
 * parallax con el mouse. Canvas transparente sobre el degradado del hero.
 * Respeta prefers-reduced-motion (render estático).
 */
export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = mount.clientWidth || 1;
    let h = mount.clientHeight || 1;

    // En pantallas chicas usamos una malla menos densa (rendimiento).
    const small = w < 700;
    const COLS = small ? 46 : 66;
    const ROWS = small ? 46 : 66;
    const GAP = 0.55;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0710, 0.06);

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 4.2, 9);
    camera.lookAt(0, -1.6, 0);

    // --- Malla de puntos ---
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseX = new Float32Array(count);
    const baseZ = new Float32Array(count);

    const cWine = new THREE.Color("#8a2fd6");
    const cGlow = new THREE.Color("#c98cf0");

    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c - COLS / 2) * GAP;
        const z = (r - ROWS / 2) * GAP;
        baseX[i] = x;
        baseZ[i] = z;
        positions[i * 3] = x;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = z;
        const col = cWine.clone().lerp(cGlow, c / COLS);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
        i++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Textura circular con glow para cada punto.
    const tex = (() => {
      const s = 64;
      const cnv = document.createElement("canvas");
      cnv.width = cnv.height = s;
      const ctx = cnv.getContext("2d")!;
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.4, "rgba(255,255,255,0.85)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(cnv);
    })();

    const mat = new THREE.PointsMaterial({
      size: 0.09,
      map: tex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      alphaTest: 0.01,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // --- Parallax con el mouse ---
    let mx = 0,
      my = 0,
      tmx = 0,
      tmy = 0;
    const onMove = (e: MouseEvent) => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove);

    const updateWave = (t: number) => {
      for (let k = 0; k < count; k++) {
        const x = baseX[k];
        const z = baseZ[k];
        positions[k * 3 + 1] =
          Math.sin(x * 0.55 + t * 0.9) * 0.5 +
          Math.cos(z * 0.5 + t * 0.7) * 0.5 +
          Math.sin((x + z) * 0.28 + t * 0.4) * 0.35;
      }
      geo.attributes.position.needsUpdate = true;
    };

    const clock = new THREE.Clock();
    let raf = 0;

    if (reduce) {
      // Render estático (sin animación).
      updateWave(0);
      renderer.render(scene, camera);
    } else {
      const animate = () => {
        raf = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        updateWave(t);
        points.rotation.y = Math.sin(t * 0.05) * 0.12;
        mx += (tmx - mx) * 0.04;
        my += (tmy - my) * 0.04;
        camera.position.x = mx * 2.4;
        camera.position.y = 4.2 - my * 1.4;
        camera.lookAt(0, -1.6, 0);
        renderer.render(scene, camera);
      };
      animate();
    }

    // --- Resize ---
    const onResize = () => {
      w = mount.clientWidth || 1;
      h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (reduce) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      geo.dispose();
      mat.dispose();
      tex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="hero3d-canvas" ref={mountRef} aria-hidden="true" />;
}
