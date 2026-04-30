import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio Création Web Algérie | Nos Réalisations",
  description: "Découvrez nos projets de création de sites web en Algérie. E-commerce, vitrine et applications web réalisés par ProServices à Alger.",
  keywords: ["Portfolio agence web Algérie", "Exemples sites web Alger", "réalisations e-commerce Algérie", "projets digitaux Alger", "étude de cas web", "design web Algérie"],
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
