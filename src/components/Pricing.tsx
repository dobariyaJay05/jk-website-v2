import { motion } from "framer-motion";
import { Brush, Cloud, FileText, Globe, Image, Laptop2, Settings2, Sparkles, Wrench } from "lucide-react";
import { SECTION_IDS } from "../scripts/constants";
import { goToContactWithPackage, type PackagePrefillKey } from "../scripts/contactPrefill";

type Tier = {
  name: string;
  price: string;
  priceNote?: string;
  desc: string;
  delivery: string;
  bestFor: string;
  items: string[];
  cta: string;
  featured: boolean;
  badge: "popular" | "best-value" | "custom" | null;
  prefillKey: PackagePrefillKey;
};

const tiers: Tier[] = [
  {
    name: "🚀 Starter Launch",
    price: "A$249",
    desc: "Perfect for individuals, startups, or small businesses needing a clean online presence.",
    delivery: "3–5 Days",
    bestFor: "New businesses, tradies, freelancers",
    featured: false,
    badge: null,
    prefillKey: "starter",
    cta: "Get Started",
    items: [
      "1-page responsive website",
      "Mobile-friendly layout",
      "Contact form",
      "WhatsApp integration",
      "Basic CTA setup",
      "Help to get your custom domain (custom quote)",
      "Hosting setup guidance (A$19–A$49 / month)",
      "Up to 3 revisions",
    ],
  },
  {
    name: "📈 Business Growth",
    price: "A$549",
    desc: "For businesses wanting better trust, structure, and conversions.",
    delivery: "5–7 Days",
    bestFor: "Growing businesses, service providers",
    featured: true,
    badge: "popular",
    prefillKey: "growth",
    cta: "Choose Growth",
    items: [
      "Everything in Starter Launch",
      "Up to 4 pages",
      "Improved CTA placement",
      "Testimonials section",
      "Better content structure",
      "Professional service layout",
      "Stronger trust-building sections",
      "Up to 4 revisions",
    ],
  },
  {
    name: "🏆 Premium Authority",
    price: "A$1349",
    desc: "For premium brands wanting a high-converting, modern website.",
    delivery: "7–14 Days",
    bestFor: "Agencies, consultants, premium local brands",
    featured: false,
    badge: "best-value",
    prefillKey: "premium",
    cta: "Book Premium",
    items: [
      "Everything in Business Growth",
      "Up to 8 pages",
      "Premium custom UI design",
      "Advanced conversion-focused sections",
      "FAQ section",
      "Portfolio / gallery",
      "SEO setup",
      "Speed optimization",
      "Social media integration",
      "Priority support",
      "Up to 5 revisions",
    ],
  },
  {
    name: "🏢 Enterprise Presence",
    price: "Starting from A$2549",
    priceNote: "Custom scope & pricing on enquiry",
    desc: "A fully custom website solution built for scalability, performance, and serious business growth.",
    delivery: "2–4 Weeks (Custom Scope)",
    bestFor: "Established businesses, multi-service companies, high-end brands",
    featured: false,
    badge: "custom",
    prefillKey: "enterprise",
    cta: "Request Quote",
    items: [
      "Fully custom website strategy",
      "Custom UI/UX design (no templates)",
      "10+ pages or custom structure",
      "Advanced conversion funnel design",
      "Lead capture system",
      "Google Sheets / CRM integration",
      "On-page SEO structure",
      "Advanced speed optimization",
      "Blog / resource setup",
      "Case studies / portfolio pages",
      "Booking or inquiry system",
      "Launch support + priority handling",
    ],
  },
];

function PriceBadge({ type }: { type: NonNullable<Tier["badge"]> }) {
  if (type === "popular") {
    return <span className="jk-price-badge jk-price-badge--popular">Most popular</span>;
  }
  if (type === "best-value") {
    return <span className="jk-price-badge jk-price-badge--best-value">Best value</span>;
  }
  return <span className="jk-price-badge jk-price-badge--custom">Custom build</span>;
}

function BadgeSlot({ badge }: { badge: Tier["badge"] }) {
  return (
    <div className="jk-price-card__badge-slot">
      {badge ? <PriceBadge type={badge} /> : null}
    </div>
  );
}

export function Pricing() {
  return (
    <section className="jk-section" id={SECTION_IDS.pricing} aria-labelledby="pricing-heading">
      <div className="jk-wrap">
        <div className="jk-reveal" style={{ textAlign: "center", maxWidth: "720px", marginInline: "auto" }}>
          <p className="jk-eyebrow">Pricing</p>
          <h2 id="pricing-heading" className="jk-h2">
            Simple Packages. <span>Powerful Results.</span>
          </h2>
          <p className="jk-lead" style={{ marginInline: "auto", marginBottom: "2.5rem" }}>
            Choose the website package that fits your business stage. Custom domains are quoted to your needs; hosting
            typically runs A$19–A$49 per month. Every package is built with responsive design and a professional setup to
            help you win more enquiries.
          </p>
        </div>
        <div className="jk-pricing__grid">
          {tiers.map((t) => (
            <motion.article
              key={t.name}
              className={`jk-price-card jk-reveal ${t.featured ? "jk-price-card--featured" : ""}`}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <BadgeSlot badge={t.badge} />
              <h3 className="jk-price-card__title">{t.name}</h3>
              <p className={`jk-price ${t.price.startsWith("Starting") ? "jk-price--long" : ""}`}>{t.price}</p>
              {t.priceNote ? (
                <p className="jk-price-card__note">{t.priceNote}</p>
              ) : null}
              <p className="jk-price-card__desc">{t.desc}</p>
              <div className="jk-price-card__meta">
                <p>
                  <span className="jk-price-card__meta-label">Delivery</span>
                  {t.delivery}
                </p>
                <p>
                  <span className="jk-price-card__meta-label">Best for</span>
                  {t.bestFor}
                </p>
              </div>
              <p className="jk-service-num" style={{ marginBottom: "0.5rem" }}>
                Includes
              </p>
              <ul>
                {t.items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <motion.button
                type="button"
                className={`jk-btn ${t.featured ? "jk-btn--primary" : "jk-btn--ghost"}`}
                style={{ width: "100%" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToContactWithPackage(t.prefillKey)}
              >
                {t.cta}
              </motion.button>
            </motion.article>
          ))}
        </div>

        <div className="jk-pricing-custom jk-reveal">
          <p className="jk-pricing-custom__title">Need something custom?</p>
          <p className="jk-pricing-custom__text">
            For advanced features, integrations, or unique requirements, we can create a tailored solution for your
            business.
          </p>
        </div>

        <div className="jk-addons jk-reveal">
          <h3>Add-ons</h3>
          <div className="jk-addons__grid">
            <div className="jk-addon">
              <span className="jk-addon__icon-wrap">
                <FileText className="jk-addon__icon" />
              </span>
              <strong>Additional revision</strong>
              A$50–A$100
            </div>
            <div className="jk-addon">
              <span className="jk-addon__icon-wrap">
                <Sparkles className="jk-addon__icon" />
              </span>
              <strong>Extra page</strong>
              A$100–A$150
            </div>
            <div className="jk-addon">
              <span className="jk-addon__icon-wrap">
                <Brush className="jk-addon__icon" />
              </span>
              <strong>Logo design</strong>
              A$79
            </div>
            <div className="jk-addon">
              <span className="jk-addon__icon-wrap">
                <Image className="jk-addon__icon" />
              </span>
              <strong>Social media poster</strong>
              A$50–A$120 (as per poster)
            </div>
            <div className="jk-addon">
              <span className="jk-addon__icon-wrap">
                <Globe className="jk-addon__icon" />
              </span>
              <strong>Custom domain</strong>
              Custom quote
            </div>
            <div className="jk-addon">
              <span className="jk-addon__icon-wrap">
                <Cloud className="jk-addon__icon" />
              </span>
              <strong>Hosting</strong>
              A$19–A$49 / month
            </div>
            <div className="jk-addon">
              <span className="jk-addon__icon-wrap">
                <Wrench className="jk-addon__icon" />
              </span>
              <strong>Maintenance</strong>
              A$10–A$30 / month
            </div>
            <div className="jk-addon">
              <span className="jk-addon__icon-wrap">
                <Laptop2 className="jk-addon__icon" />
              </span>
              <strong>Mobile application</strong>
              Custom quote
            </div>
            <div className="jk-addon">
              <span className="jk-addon__icon-wrap">
                <Settings2 className="jk-addon__icon" />
              </span>
              <strong>Advanced features</strong>
              Custom quote
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
