/** @type {import('next').NextConfig} */
const nextConfig = {
  // El JS original (orbital, carrusel, observers) no es idempotente:
  // crea nodos y dots en el DOM. StrictMode lo ejecutaría dos veces en dev
  // y duplicaría esos elementos. Lo desactivamos para mantener el
  // comportamiento 100% idéntico al HTML original.
  reactStrictMode: false,

  // Sirve imágenes en formatos modernos (mucho más livianos) cuando el
  // navegador los soporta, vía next/image.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // La ruta /unidades/[slug] pasó a llamarse /servicios/[slug].
  // Redirigimos permanentemente los enlaces viejos para no perder SEO ni
  // romper marcadores existentes.
  async redirects() {
    return [
      {
        source: "/unidades/:slug",
        destination: "/servicios/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
