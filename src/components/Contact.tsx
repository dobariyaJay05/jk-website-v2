import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SECTION_IDS, whatsappHref } from "../scripts/constants";
import { EmailLineIcon, PhoneLineIcon } from "./ContactLineIcons";
import { consumePackagePrefill } from "../scripts/contactPrefill";
import { submitToSheet, type ContactPayload } from "../scripts/submitToSheet";
import { COUNTRY_DIAL_CODES } from "../scripts/countryDialCodes";
import { SubmitSuccessFlight } from "./SubmitSuccessFlight";

const initial: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  business: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PLACEHOLDERS: Record<string, string> = {
  Australia: "412292330",
  India: "9081132042",
  "United States": "4155552671",
  "United Kingdom": "7400123456",
  Canada: "4165550199",
};

function countDigits(s: string): number {
  return (s.match(/\d/g) || []).length;
}

export function Contact() {
  const [form, setForm] = useState(initial);
  const [countryDial, setCountryDial] = useState("+61");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryRef = useRef<HTMLDivElement>(null);

  const selectedCountry = useMemo(
    () => COUNTRY_DIAL_CODES.find((c) => c.dial === countryDial) ?? COUNTRY_DIAL_CODES[0],
    [countryDial]
  );
  const filteredCountries = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return COUNTRY_DIAL_CODES;
    return COUNTRY_DIAL_CODES.filter((c) => {
      return c.name.toLowerCase().includes(q) || c.dial.toLowerCase().includes(q);
    });
  }, [countrySearch]);
  const phonePlaceholder = PHONE_PLACEHOLDERS[selectedCountry.name] ?? "9876543210";

  useLayoutEffect(() => {
    const pre = consumePackagePrefill();
    if (pre) {
      setForm((f) => ({ ...f, service: pre.service, budget: pre.budget }));
    }
  }, []);

  const onChange = (key: keyof ContactPayload, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  };

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!countryRef.current) return;
      if (!countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const validate = (): string | null => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim() || !EMAIL_RE.test(form.email.trim())) return "Please enter a valid email address.";
    if (countDigits(form.phone) < 6) return "Please enter your phone number (include area / mobile digits).";
    if (!form.business.trim()) return "Please enter your business name.";
    if (!form.service.trim()) return "Please select a service.";
    if (!form.budget.trim()) return "Please select a budget range.";
    if (!form.timeline.trim()) return "Please select a timeline.";
    if (!form.message.trim()) return "Please enter a message.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      setStatus("idle");
      return;
    }
    setStatus("loading");
    setError("");
    const fullPhone = `${countryDial} ${form.phone.trim()}`.trim();
    const payload: ContactPayload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: fullPhone,
      business: form.business.trim(),
      message: form.message.trim(),
    };
    try {
      await submitToSheet(payload);
      setStatus("ok");
      setForm(initial);
      setCountryDial("+61");
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section className="jk-section" id={SECTION_IDS.contact} aria-labelledby="contact-heading">
      <div className="jk-wrap">
        <div className="jk-reveal">
          <p className="jk-eyebrow">Contact</p>
          <h2 id="contact-heading" className="jk-h2">
            Tell us about <span>your project</span>.
          </h2>
          <p className="jk-lead" style={{ marginBottom: "2rem" }}>
            Share a few details — we will respond with next steps. Prefer chat? Tap the WhatsApp button anytime.
          </p>
        </div>
        <div className="jk-contact__grid">
          <div className="jk-contact__panel jk-reveal">
            <h3 style={{ margin: "0 0 0.75rem", fontFamily: "var(--jk-font-head)", fontSize: "1.1rem" }}>
              Direct lines
            </h3>
            <p style={{ margin: "0 0 1rem", color: "var(--jk-muted)", fontSize: "0.95rem" }}>
              For fastest replies on scope and availability, message on WhatsApp. For detailed briefs, use the form.
            </p>
            <motion.a
              className="jk-btn jk-btn--primary"
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.98 }}
              style={{ display: "inline-flex", marginBottom: "1rem" }}
            >
              Chat on WhatsApp
            </motion.a>
            <p
              style={{
                margin: "0 0 0.65rem",
                fontSize: "0.92rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <EmailLineIcon style={{ flexShrink: 0, color: "var(--jk-accent)" }} />
              <a href="mailto:info@jaykishansolutions.com.au" style={{ color: "var(--jk-accent)", fontWeight: 600 }}>
                info@jaykishansolutions.com.au
              </a>
            </p>
            <p
              style={{
                margin: "0 0 1rem",
                fontSize: "0.92rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <PhoneLineIcon style={{ flexShrink: 0, color: "var(--jk-neon)" }} />
              <a href="tel:+61412292330" style={{ color: "var(--jk-fg)" }}>
                0412 292 330
              </a>
            </p>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--jk-muted)" }}>
              Prefer email? Send your brief and we will reply with timing and next steps.
            </p>
          </div>

          <form className="jk-contact__panel jk-form jk-reveal" onSubmit={onSubmit} noValidate>
            <div className="jk-form__row">
              <div className="jk-field">
                <label htmlFor="name">
                  Name <span className="jk-field__req">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  aria-required="true"
                />
              </div>
              <div className="jk-field">
                <label htmlFor="email">
                  Email <span className="jk-field__req">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="john@yourbusiness.com"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  aria-required="true"
                />
              </div>
            </div>
            <div className="jk-form__row">
              <div className="jk-field">
                <label htmlFor="phone-local">
                  Phone <span className="jk-field__req">*</span>
                </label>
                <div className="jk-phone-row">
                  <div className="jk-phone-row__country" ref={countryRef}>
                    <button
                      type="button"
                      className="jk-country-trigger"
                      aria-haspopup="listbox"
                      aria-expanded={countryOpen}
                      aria-label={`Selected country ${selectedCountry.name}`}
                      onClick={() => {
                        setCountryOpen((v) => {
                          const next = !v;
                          if (!next) setCountrySearch("");
                          return next;
                        });
                      }}
                    >
                      <span className="jk-country-trigger__flag">{selectedCountry.flag}</span>
                      <span className="jk-country-trigger__name">{selectedCountry.name}</span>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M5 7l5 6 5-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {countryOpen ? (
                      <div className="jk-country-menu" role="listbox" aria-label="Country list">
                        <div className="jk-country-menu__search-wrap">
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Search country or code"
                            className="jk-country-menu__search"
                            aria-label="Search country"
                          />
                        </div>
                        {filteredCountries.map((c) => (
                          <button
                            key={`${c.name}-${c.dial}`}
                            type="button"
                            className={`jk-country-option ${c.dial === countryDial ? "is-active" : ""}`}
                            onClick={() => {
                              setCountryDial(c.dial);
                              setCountryOpen(false);
                              setCountrySearch("");
                              setError("");
                            }}
                          >
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                            <span>{c.dial}</span>
                          </button>
                        ))}
                        {!filteredCountries.length ? <p className="jk-country-menu__empty">No country found.</p> : null}
                      </div>
                    ) : null}
                  </div>
                  <div className="jk-phone-row__input-wrap">
                    <span className="jk-phone-row__code">{selectedCountry.dial}</span>
                    <input
                      id="phone-local"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel-national"
                      placeholder={phonePlaceholder}
                      value={form.phone}
                      onChange={(e) => onChange("phone", e.target.value)}
                      aria-required="true"
                    />
                  </div>
                </div>
              </div>
              <div className="jk-field">
                <label htmlFor="business">
                  Business <span className="jk-field__req">*</span>
                </label>
                <input
                  id="business"
                  name="business"
                  required
                  placeholder="Your business name"
                  value={form.business}
                  onChange={(e) => onChange("business", e.target.value)}
                  aria-required="true"
                />
              </div>
            </div>
            <div className="jk-form__row">
              <div className="jk-field">
                <label htmlFor="service">
                  Service <span className="jk-field__req">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={form.service}
                  onChange={(e) => onChange("service", e.target.value)}
                  aria-required="true"
                >
                  <option value="">Select service</option>
                  <optgroup label="Packages">
                    <option value="Package: Starter Launch">Starter Launch</option>
                    <option value="Package: Business Growth">Business Growth</option>
                    <option value="Package: Premium Authority">Premium Authority</option>
                    <option value="Package: Enterprise Presence">Enterprise Presence</option>
                  </optgroup>
                  <optgroup label="Services">
                    <option value="Website Design">Website Design</option>
                    <option value="Development">Development</option>
                    <option value="Conversion Layouts">Conversion Layouts</option>
                    <option value="Lead Systems">Lead Systems</option>
                    <option value="Redesign">Redesign</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Custom domain + hosting">Custom domain + hosting</option>
                    <option value="Logo Design">Logo Design</option>
                    <option value="Social Media Posters">Social Media Posters</option>
                    <option value="Mobile Application Development">Mobile Application Development</option>
                    <option value="Not sure">Not sure</option>
                  </optgroup>
                </select>
              </div>
              <div className="jk-field">
                <label htmlFor="budget">
                  Budget <span className="jk-field__req">*</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  value={form.budget}
                  onChange={(e) => onChange("budget", e.target.value)}
                  aria-required="true"
                >
                  <option value="">Select budget range</option>
                  <option value="Starter Launch ($249)">Starter Launch ($249)</option>
                  <option value="Business Growth ($549)">Business Growth ($549)</option>
                  <option value="Premium Authority ($1349)">Premium Authority ($1349)</option>
                  <option value="Enterprise (from $2549)">Enterprise (from $2549)</option>
                  <option value="Custom / TBD">Custom / TBD</option>
                </select>
              </div>
            </div>
            <div className="jk-field">
              <label htmlFor="timeline">
                Timeline <span className="jk-field__req">*</span>
              </label>
              <select
                id="timeline"
                name="timeline"
                required
                value={form.timeline}
                onChange={(e) => onChange("timeline", e.target.value)}
                aria-required="true"
              >
                <option value="">Select timeline</option>
                <option value="ASAP">ASAP</option>
                <option value="2–4 weeks">2–4 weeks</option>
                <option value="1–2 months">1–2 months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
            <div className="jk-field">
              <label htmlFor="message">
                Message <span className="jk-field__req">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project goals, pages you need, and preferred launch timeline."
                value={form.message}
                onChange={(e) => onChange("message", e.target.value)}
                aria-required="true"
              />
            </div>

            {status === "ok" ? (
              <p className="jk-form__status jk-form__status--ok" role="status">
                Thanks — your enquiry was sent. We will be in touch shortly.
              </p>
            ) : null}
            {status === "err" || error ? (
              <p className="jk-form__status jk-form__status--err" role="alert">
                {error}
              </p>
            ) : null}

            {status === "ok" ? <SubmitSuccessFlight /> : null}

            <motion.button
              type="submit"
              className="jk-btn jk-btn--primary"
              disabled={status === "loading"}
              whileTap={{ scale: 0.98 }}
            >
              {status === "loading" ? "Sending…" : "Send enquiry"}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
