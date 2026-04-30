import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contactez votre Agence Web à Alger | Devis Gratuit",
  description: "Besoin d'un site web en Algérie ? Contactez ProServices à Alger pour un devis gratuit et personnalisé. Réponse sous 24h garantie.",
  keywords: ["Agence web Alger contact", "Devis site web Algérie", "création site web Alger", "support technique web", "expert digital Algérie", "agence SEO Alger"],
};

export default function ContactPage() {
  return <ContactClient />;
}
