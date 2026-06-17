"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";

// Nodos de la red global (lat, lon). Córdoba es la sede / hub.
const CIUDADES: Record<string, [number, number]> = {
  cordoba: [-31.42, -64.18], // sede
  baires: [-34.6, -58.38],
  saopaulo: [-23.55, -46.63],
  santiago: [-33.45, -70.66],
  bogota: [4.71, -74.07],
  mexico: [19.43, -99.13],
  nyc: [40.71, -74.0],
  madrid: [40.42, -3.7],
  londres: [51.51, -0.13],
  paris: [48.85, 2.35],
  dubai: [25.2, 55.27],
  singapur: [1.35, 103.82],
  sidney: [-33.87, 151.21],
};

/**
 * Globo 3D estilo Stripe ("The backbone of global commerce") con cobe (WebGL).
 * El mundo muestra la estructura de los continentes (puntos) y una red de
 * arcos que conecta, desde Córdoba (sede/hub), ciudades de todos los
 * continentes, reforzando el alcance global y la modalidad remota/híbrida.
 */
export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // El ancho real recién está disponible cuando el layout terminó. Si solo
    // midiéramos al montar (offsetWidth puede ser 0 en Next), el globo se
    // degenera en una esquina. Con ResizeObserver el loop siempre toma el
    // ancho vigente y el globo se autocorrige al primer valor > 0.
    const measure = () => {
      width = canvas.offsetWidth;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(canvas);
    window.addEventListener("resize", measure);
    measure();

    const options: COBEOptions = {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.25,
      mapSamples: 30000, // más puntos -> continentes más definidos
      mapBrightness: 9, // continentes visibles sin lavar
      mapBaseBrightness: 0.05, // piso de luz: los puntos se leen aun en el borde
      baseColor: [0.45, 0.47, 0.52], // pizarra: continentes con buen contraste
      markerColor: [0.251, 0.749, 0.706], // champagne apagado (nodos discretos)
      glowColor: [0.4, 0.43, 0.52], // halo tenue para no lavar el mapa
      arcColor: [0.251, 0.749, 0.706], // #40bfb4 (turquesa)
      arcWidth: 0.4,
      arcHeight: 0.28,
      markers: [
        { location: CIUDADES.cordoba, size: 0.11 }, // Córdoba (sede / hub)
        { location: CIUDADES.baires, size: 0.06 },
        { location: CIUDADES.saopaulo, size: 0.06 },
        { location: CIUDADES.santiago, size: 0.05 },
        { location: CIUDADES.bogota, size: 0.05 },
        { location: CIUDADES.mexico, size: 0.06 },
        { location: CIUDADES.nyc, size: 0.06 },
        { location: CIUDADES.madrid, size: 0.06 },
        { location: CIUDADES.londres, size: 0.06 },
        { location: CIUDADES.paris, size: 0.05 },
        { location: CIUDADES.dubai, size: 0.05 },
        { location: CIUDADES.singapur, size: 0.05 },
        { location: CIUDADES.sidney, size: 0.05 },
      ],
      // Red global: hub (Córdoba) -> hubs de cada continente + enlaces cruzados
      // que reparten las líneas por todo el mundo.
      arcs: [
        { from: CIUDADES.cordoba, to: CIUDADES.baires },
        { from: CIUDADES.cordoba, to: CIUDADES.saopaulo },
        { from: CIUDADES.cordoba, to: CIUDADES.santiago },
        { from: CIUDADES.cordoba, to: CIUDADES.bogota },
        { from: CIUDADES.cordoba, to: CIUDADES.mexico },
        { from: CIUDADES.cordoba, to: CIUDADES.nyc },
        { from: CIUDADES.cordoba, to: CIUDADES.madrid },
        { from: CIUDADES.cordoba, to: CIUDADES.dubai },
        { from: CIUDADES.cordoba, to: CIUDADES.singapur },
        { from: CIUDADES.cordoba, to: CIUDADES.sidney },
        { from: CIUDADES.madrid, to: CIUDADES.londres },
        { from: CIUDADES.londres, to: CIUDADES.nyc },
        { from: CIUDADES.paris, to: CIUDADES.dubai },
        { from: CIUDADES.dubai, to: CIUDADES.singapur },
        { from: CIUDADES.singapur, to: CIUDADES.sidney },
        { from: CIUDADES.mexico, to: CIUDADES.nyc },
      ],
    };

    const globe = createGlobe(canvas, options);

    // cobe 2.0.1 NO implementa onRender ni loop interno (el README lo documenta
    // pero el build publicado lo ignora): hay que animarlo manualmente. Cada
    // frame avanzamos phi (rotación) y reenviamos width/height. Como update()
    // redibuja, los continentes aparecen una vez que carga la textura del mapa.
    let raf = 0;
    const tick = () => {
      phi += 0.004;
      globe.update({ phi, width: width * 2, height: width * 2 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 0);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: "1",
        contain: "layout paint",
        opacity: 0,
        transition: "opacity 1s ease",
      }}
    />
  );
}
