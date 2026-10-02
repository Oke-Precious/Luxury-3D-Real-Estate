/**
 * Central Configuration for ATELIER ESTATES
 * All brand metadata, contact touchpoints, and localization settings
 */

export const BRAND_CONFIG = {
  name: "ATELIER ESTATES",
  legalName: "Atelier Estates Architectural Real Estate Ltd",
  shortName: "ATELIER",
  tagline: "Curated residences. Remarkable places.",
  manifestoLead: "WE DON'T SIMPLY LIST PROPERTY.",
  manifestoBody: "WE CURATE PLACES WORTH LIVING IN.",
  subManifesto: "Every residence in our private portfolio represents an uncompromising union of visionary architecture, structural integrity, and emotional depth.",
  
  contact: {
    conciergeEmail: "concierge@atelierestates.com",
    privateClientsEmail: "vip@atelierestates.com",
    phoneDisplay: "+234 (0) 1 800 ATELIER",
    phoneRaw: "+23418002835437",
    whatsappDisplay: "+234 818 800 2835",
    whatsappLink: "https://wa.me/2348188002835",
    offices: [
      {
        city: "Ikoyi, Lagos",
        address: "14 Alexander Avenue, Ikoyi, Lagos, Nigeria",
        type: "Private Client Gallery"
      },
      {
        city: "Mayfair, London",
        address: "28 Berkeley Square, Mayfair, London W1J 6EN",
        type: "International Advisory"
      }
    ]
  },

  socials: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "Architectural Digest", url: "https://architecturaldigest.com" },
    { label: "YouTube", url: "https://youtube.com" }
  ],

  currencies: {
    NGN: { symbol: "₦", rate: 1, label: "NGN (₦)" },
    USD: { symbol: "$", rate: 0.00064, label: "USD ($)" },
    EUR: { symbol: "€", rate: 0.00059, label: "EUR (€)" },
    GBP: { symbol: "£", rate: 0.00051, label: "GBP (£)" }
  },

  defaultLocation: "Ikoyi, Lagos"
};
