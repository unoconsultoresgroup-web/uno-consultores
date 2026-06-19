import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CursorUI from "../../components/CursorUI";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Interactions from "../../components/Interactions";
import { units, getUnit } from "../../lib/units";
import UnitView from "./UnitView";
import TechView from "./TechView";
import "./UnitPage.css";

/* Genera las 5 rutas estáticas en build. */
export function generateStaticParams() {
  return units.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) return {};
  const description = `${unit.name} — ${unit.tagline} ${unit.highlight}`;
  return {
    title: unit.name,
    description,
    alternates: { canonical: `/servicios/${unit.slug}` },
    openGraph: {
      title: `${unit.name} · uno consultores`,
      description,
      url: `/servicios/${unit.slug}`,
    },
  };
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) notFound();

  return (
    <>
      <CursorUI />
      <Nav light />
      {unit.key === "tech" ? (
        <TechView slug={slug} />
      ) : (
        <UnitView slug={slug} />
      )}
      <Footer />
      <Interactions />
    </>
  );
}
