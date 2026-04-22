import { SECTION_IDS } from "./constants";

export const JK_PREFILL_STORAGE = "jk-contact-package-prefill";

export type PackagePrefillKey = "starter" | "growth" | "premium" | "enterprise";

/** Values must match `<option value="...">` in Contact form (service + budget). */
export const packagePrefillMap: Record<PackagePrefillKey, { service: string; budget: string }> = {
  starter: {
    service: "Package: Starter Launch",
    budget: "Starter Launch ($249)",
  },
  growth: {
    service: "Package: Business Growth",
    budget: "Business Growth ($549)",
  },
  premium: {
    service: "Package: Premium Authority",
    budget: "Premium Authority ($1349)",
  },
  enterprise: {
    service: "Package: Enterprise Presence",
    budget: "Enterprise (from $2549)",
  },
};

export function queuePackagePrefill(key: PackagePrefillKey): void {
  try {
    sessionStorage.setItem(JK_PREFILL_STORAGE, key);
  } catch {
    /* ignore */
  }
}

/** Read and clear one-shot prefill from pricing CTAs. */
export function consumePackagePrefill(): { service: string; budget: string } | null {
  try {
    const raw = sessionStorage.getItem(JK_PREFILL_STORAGE);
    if (!raw) return null;
    sessionStorage.removeItem(JK_PREFILL_STORAGE);
    const key = raw as PackagePrefillKey;
    if (key in packagePrefillMap) return packagePrefillMap[key];
  } catch {
    /* ignore */
  }
  return null;
}

export function scrollToContact(): void {
  document.getElementById(SECTION_IDS.contact)?.scrollIntoView({ behavior: "smooth" });
}

export function goToContactWithPackage(key: PackagePrefillKey): void {
  queuePackagePrefill(key);
  scrollToContact();
}
