import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MessageCircle, ExternalLink } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Contact() {
  return (
    <div className="min-h-screen" style={{ background: "#0a1628" }}>
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="text-[#00d4ff] text-sm tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}>
                CONTATO
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#c9a84c" }}>
                Fale Conosco
              </h1>
              <p className="text-lg text-[#f0ede6]/70 leading-relaxed mb-12" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                Entre em contato com o Macuco Group para parcerias, investimentos, consultoria ou qualquer outra questão.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <motion.a
                href="mailto:contato@macucogroup.com"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-8 rounded-xl border border-white/5 hover:border-[#c9a84c]/30 transition-all duration-300 group no-underline block"
                style={{ background: "rgba(15, 34, 64, 0.4)" }}
              >
                <Mail className="text-[#c9a84c] mb-4" size={32} />
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#00d4ff] transition-colors" style={{ color: "#c9a84c" }}>
                  E-mail
                </h3>
                <p className="text-[#f0ede6]/70 text-sm" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                  contato@macucogroup.com
                </p>
              </motion.a>

              {/* MacucoBot */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.1 } } }}
              >
                <Link
                  href="/macucobot"
                  className="p-8 rounded-xl border border-[#00d4ff]/20 hover:border-[#00d4ff]/40 transition-all duration-300 group no-underline block glow-cyan"
                  style={{ background: "rgba(0, 212, 255, 0.05)" }}
                >
                  <MessageCircle className="text-[#00d4ff] mb-4" size={32} />
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#00d4ff] transition-colors" style={{ color: "#c9a84c" }}>
                    MacucoBot
                  </h3>
                  <p className="text-[#f0ede6]/70 text-sm" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                    Converse com nosso assistente IA para respostas imediatas.
                  </p>
                </Link>
              </motion.div>

              {/* Macuco Digital */}
              <motion.a
                href="https://macuco.digital"
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.2 } } }}
                className="p-8 rounded-xl border border-white/5 hover:border-[#c9a84c]/30 transition-all duration-300 group no-underline block"
                style={{ background: "rgba(15, 34, 64, 0.4)" }}
              >
                <ExternalLink className="text-[#c9a84c] mb-4" size={32} />
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#00d4ff] transition-colors" style={{ color: "#c9a84c" }}>
                  Macuco Tech Ventures
                </h3>
                <p className="text-[#f0ede6]/70 text-sm" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                  Visite nosso site de ventures e consulting.
                </p>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/pyrmarcondes/"
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.3 } } }}
                className="p-8 rounded-xl border border-white/5 hover:border-[#c9a84c]/30 transition-all duration-300 group no-underline block"
                style={{ background: "rgba(15, 34, 64, 0.4)" }}
              >
                <svg className="text-[#c9a84c] mb-4" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#00d4ff] transition-colors" style={{ color: "#c9a84c" }}>
                  LinkedIn
                </h3>
                <p className="text-[#f0ede6]/70 text-sm" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                  Conecte-se com Pyr Marcondes no LinkedIn.
                </p>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
