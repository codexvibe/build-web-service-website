import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services Digitaux en Algérie | Web, E-commerce & SEO",
  description: "Découvrez nos services : création de site vitrine, boutique e-commerce et stratégie SEO en Algérie. Solutions digitales sur mesure à Alger.",
  keywords: ["Services digitaux Algérie", "Site vitrine Alger", "e-commerce Algérie", "application web sur mesure", "audit SEO Algérie", "marketing digital Alger"],
};

import { createClient } from "@/utils/supabase/server";

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from('services').select('*').order('created_at', { ascending: true });

  return <ServicesClient dbServices={services || []} />;
}
