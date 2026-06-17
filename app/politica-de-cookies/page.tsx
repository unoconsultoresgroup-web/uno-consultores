import type { Metadata } from "next";

import CursorUI from "../components/CursorUI";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Interactions from "../components/Interactions";
import CookiePolicy from "../components/CookiePolicy";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Información sobre las cookies que utiliza uno consultores y cómo gestionarlas.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <CursorUI />
      <Nav />
      <main style={{ paddingTop: "60px" }}>
        <CookiePolicy />
      </main>
      <Footer />
      <Interactions />
    </>
  );
}
