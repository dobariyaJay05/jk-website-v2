import { motion } from "framer-motion";
import { whatsappHref } from "../scripts/constants";

export function WhatsAppFloat() {
  return (
    <motion.a
      className="jk-wa"
      href={whatsappHref()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.45 }}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="jk-wa__badge" aria-hidden>
        <img src="/assets/whatsapp.png" alt="WhatsApp icon" width={66} height={66} />
      </span>
      <span className="jk-wa__content">
        <strong className="jk-wa__title">Whatsapp</strong>
        <span className="jk-wa__subtitle">click to chat</span>
      </span>
    </motion.a>
  );
}
