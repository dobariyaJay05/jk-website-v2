export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
};

const DEFAULT_GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxFAgHpnWykWhT9XkmgLKYOuVjWZaq9ZfB4tvU5-Ulw33uCDXYKpcVQ-DQiB1rB2SLcNw/exec";

export async function submitToSheet(payload: ContactPayload): Promise<void> {
  const url = (import.meta.env.VITE_GOOGLE_SCRIPT_URL || DEFAULT_GOOGLE_SCRIPT_URL).trim();
  if (!url) {
    throw new Error(
      "Missing VITE_GOOGLE_SCRIPT_URL. Deploy a Google Apps Script web app that appends rows to your sheet, then set the URL in .env"
    );
  }

  // Use text/plain (not application/json) so the browser skips CORS preflight.
  // Google Apps Script web apps do not respond to OPTIONS; preflight + JSON breaks with "Failed to fetch".
  const res = await fetch(url.trim(), {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed (${res.status})`);
  }
}
