import type { Metadata } from "next";

import CursorUI from "../components/CursorUI";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Interactions from "../components/Interactions";
import Faq from "../components/Faq";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Resolvemos las dudas más comunes sobre uno consultores.",
};

export default function FaqPage() {
  return (
    <>
      <CursorUI />
      <Nav />
      <main style={{ paddingTop: "60px" }}>
        <Faq />
      </main>
      <Footer />
      <Interactions />
    </>
  );
}
