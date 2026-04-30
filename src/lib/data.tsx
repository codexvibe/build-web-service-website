import { TranslationKey } from "./translations";

export const getServicesData = (t: (key: string) => string) => [
  {
    id: "vitrine",
    title: t("services.vitrine.title"),
    description: t("services.vitrine.desc"),
    price: {
      fr: "Dès 15 000 DA",
      en: "From 15,000 DA",
      ar: "من 15,000 دج"
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
  },
  {
    id: "ecommerce",
    title: t("services.ecommerce.title"),
    description: t("services.ecommerce.desc"),
    price: {
      fr: "Dès 45 000 DA",
      en: "From 45,000 DA",
      ar: "من 45,000 دج"
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: "agency",
    title: t("services.agency.title"),
    description: t("services.agency.desc"),
    price: {
      fr: "Dès 85 000 DA",
      en: "From 85,000 DA",
      ar: "من 85,000 دج"
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "apps",
    title: t("services.apps.title"),
    description: t("services.apps.desc"),
    price: {
      fr: "Sur Devis",
      en: "Upon Quote",
      ar: "حسب الطلب"
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
  },
  {
    id: "seo",
    title: t("services.seo.title"),
    description: t("services.seo.desc"),
    price: {
      fr: "Dès 10 000 DA",
      en: "From 10,000 DA",
      ar: "من 10,000 دج"
    },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
];
