import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Création Site Web Algérie | Agence Web ProServices Alger",
  description: "Expert en création de sites web en Algérie. Sites vitrines, e-commerce & SEO à Alger. Boostez votre visibilité avec ProServices. Devis gratuit !",
  keywords: ["Création site web Algérie", "Agence web Alger", "site e-commerce Algérie", "développeur web Algérie", "référencement SEO Alger", "maintenance site web"],
};

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: services } = await supabase.from('services').select('*').order('created_at', { ascending: true });

  return <HomeClient dbServices={services || []} />;
}
