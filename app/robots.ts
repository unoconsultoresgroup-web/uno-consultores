import type { MetadataRoute } from "next";

const SITE_URL = "https://www.mrconsultores.com"; // TODO: dominio real

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
