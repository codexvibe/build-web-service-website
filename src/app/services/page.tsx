import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services Digitaux en Algérie | Web, E-commerce & SEO",
  description: "Découvrez nos services : création de site vitrine, boutique e-commerce et stratégie SEO en Algérie. Solutions digitales sur mesure à Alger.",
  keywords: ["Services digitaux Algérie", "Site vitrine Alger", "e-commerce Algérie", "application web sur mesure", "audit SEO Algérie", "marketing digital Alger"],
};

export default function ServicesPage() {
  return <ServicesClient />;
}
