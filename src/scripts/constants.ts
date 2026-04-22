export const SECTION_IDS = {
  work: "work",
  services: "services",
  process: "process",
  pricing: "pricing",
  faq: "faq",
  contact: "contact",
} as const;

/** Default chat text when opening WhatsApp from the site (wa.me `text` param). */
export const DEFAULT_WHATSAPP_MESSAGE = "Hey!, I am interested in your Website Service";

/** Australian mobile without leading 0, e.g. 0412292330 → 61412292330 */
export function whatsappHref(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER || "61412292330";
  const digits = raw.replace(/\D/g, "");
  const q = new URLSearchParams({ text: message });
  return `https://wa.me/${digits}?${q.toString()}`;
}
