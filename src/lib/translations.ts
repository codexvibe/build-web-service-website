export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      contact: "Contact",
      quote: "Demander un devis",
    },
    hero: {
      badge: "Agence Digitale Premium",
      title: "Propulsez votre Business en ligne.",
      subtitle: "Nous créons des sites web performants et des expériences digitales uniques pour transformer vos visiteurs en clients fidèles.",
    },
    services: {
      badge: "Nos Prestations",
      title: "Des solutions sur-mesure.",
      subtitle: "Que ce soit pour la visibilité ou la vente, nous avons l'expertise nécessaire pour vous accompagner.",
    },
    footer: {
      description: "Agence digitale spécialisée dans la création de sites web haute performance.",
      expertise: "Expertise",
      company: "Entreprise",
      contact: "Contact",
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      contact: "Contact",
      quote: "Get a Quote",
    },
    hero: {
      badge: "Premium Digital Agency",
      title: "Propel your Business Online.",
      subtitle: "We create high-performance websites and unique digital experiences to turn your visitors into loyal customers.",
    },
    services: {
      badge: "Our Services",
      title: "Tailored Solutions.",
      subtitle: "Whether for visibility or sales, we have the necessary expertise to support you.",
    },
    footer: {
      description: "Digital agency specialized in creating high-performance websites.",
      expertise: "Expertise",
      company: "Company",
      contact: "Contact",
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      services: "خدماتنا",
      contact: "اتصل بنا",
      quote: "طلب عرض سعر",
    },
    hero: {
      badge: "وكالة رقمية متميزة",
      title: "ادفع عملك عبر الإنترنت.",
      subtitle: "نحن نصمم مواقع ويب عالية الأداء وتجارب رقمية فريدة لتحويل زوارك إلى عملاء مخلصين.",
    },
    services: {
      badge: "خدماتنا",
      title: "حلول مخصصة.",
      subtitle: "سواء كان ذلك للظهور أو البيع، لدينا الخبرة اللازمة لدعمك.",
    },
    footer: {
      description: "وكالة رقمية متخصصة في إنشاء مواقع ويب عالية الأداء.",
      expertise: "خبرتنا",
      company: "الشركة",
      contact: "اتصل بنا",
    }
  }
};

export type Language = "fr" | "en" | "ar";
export type TranslationKey = keyof typeof translations.fr;
