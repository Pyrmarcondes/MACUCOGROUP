import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles, TrendingUp, Building2, Gem, DollarSign } from "lucide-react";

const kpis = [
  { value: "$6.8T", label: "Economia Digital Global", icon: TrendingUp },
  { value: "85%", label: "Empresas em Transformação Digital no Brasil", icon: Building2 },
  { value: "13", label: "Unicórnios Brasileiros", icon: Gem },
  { value: "$15B", label: "Investimentos VC 2023", icon: DollarSign },
];

const testimonials = [
  {
    name: "Fabio Coelho",
    title: "CEO Google Brasil",
    quote: "Pyr tem contribuído para o desenvolvimento da indústria de marketing e mídia de forma sempre muito comprometida.",
  },
  {
    name: "Gabriela Onofre",
    title: "CEO do Grupo Publicis",
    quote: "Pyr está sempre conectado no futuro e tem uma curadoria precisa de suas investidas. Somos parceiros de algumas delas.",
  },
  {
    name: "Pierre Schurmann",
    title: "Sócio-Fundador e CEO da Nuvini",
    quote: "O Pyr é um parceiro estratégico raro. Consegue combinar visão, execução e uma leitura precisa de mercado.",
  },
  {
    name: "Marcelo Salles Gomes",
    title: "Presidente do Meio & Mensagem",
    quote: "Pyr sempre enxergou mais longe do que todos, vendo tendências se materializando e caminhos surgindo.",
  },
  {
    name: "Márcia Esteves",
    title: "CEO-Sócia da LL/TBWA e Presidente da ABAP",
    quote: "O Pyr une visão e propósito de forma rara. Sua capacidade de transformar complexidade em inspiração faz dele uma referência.",
  },
];

const topicPills = [
  "AI Ventures",
  "MarKommerce",
  "Content Studio",
  "Mergers & Acquisitions",
  "Consulting",
  "DAO Network",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0a1628" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }} />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full opacity-8" style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-[#00d4ff] text-sm tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}>
              MACUCO GROUP — THE DAO NETWORK
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8" style={{ color: "#c9a84c" }}>
              A primeira DAO de Venture Capital do Brasil
            </h1>
            <p className="text-lg md:text-xl text-[#f0ede6]/70 max-w-2xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
              Holding descentralizada focada em MarKommerce — transformando Marketing, Publicidade, Mídia e Commerce com Inteligência Artificial.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/macucobot"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide uppercase no-underline transition-all duration-300 hover:scale-105"
                style={{ background: "#00d4ff", color: "#0a1628", fontFamily: "Montserrat, sans-serif" }}
              >
                <MessageCircle size={18} />
                Fale com o MacucoBot
              </Link>
              <Link
                href="/content-studio"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide uppercase no-underline border transition-all duration-300 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                style={{ borderColor: "rgba(201, 168, 76, 0.4)", color: "#f0ede6", fontFamily: "Montserrat, sans-serif" }}
              >
                Content Studio
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KPIs Section */}
      <section className="py-16 border-y border-white/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: i * 0.1 } } }}
                className="text-center p-6 rounded-xl border border-white/5 hover:border-[#00d4ff]/20 transition-all duration-300"
                style={{ background: "rgba(15, 34, 64, 0.5)" }}
              >
                <kpi.icon className="mx-auto mb-3 text-[#00d4ff]" size={28} />
                <p className="text-3xl md:text-4xl font-bold text-[#00d4ff] mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {kpi.value}
                </p>
                <p className="text-xs text-[#8a9bb5] uppercase tracking-wide" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {kpi.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* A Parábola dos Ovos Azuis */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: "#c9a84c" }}>
                A Parábola dos Ovos Azuis
              </h2>
              <div className="w-16 h-0.5 mx-auto mb-10" style={{ background: "#00d4ff" }} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.2 } } }}
              className="p-8 md:p-12 rounded-2xl border border-white/5"
              style={{ background: "rgba(15, 34, 64, 0.3)" }}
            >
              <p className="text-lg leading-relaxed text-[#f0ede6]/80 mb-6" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                Macuco é uma ave até meio feiinha e muito frágil, que precisa de ambientes sustentáveis para se reproduzir melhor. Anda bastante só, sobrevive porque é resiliente. Coloca <span className="text-[#00d4ff] font-semibold">ovos azuis</span> e sobe sempre nos galhos mais altos para, de lá, observar o ecossistema a sua volta.
              </p>
              <p className="text-lg leading-relaxed text-[#f0ede6]/80 mb-6" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                É um símbolo bonito para uma empresa de ventures e startups, que acredita na resiliência, na sustentabilidade do ecossistema e na raridade dos ovos azuis: propostas de <span className="text-[#c9a84c] font-semibold">beleza única</span>.
              </p>
              <p className="text-lg leading-relaxed text-[#f0ede6]/80 mb-6" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                A <strong className="text-[#c9a84c]">Macuco DAO Group</strong> nasceu da crença de que a tecnologia é a base de sustentação dos ecossistemas de negócios e de sua diferenciação. E que empresas solitárias precisam de apoio para subir nos galhos mais altos do ecossistema.
              </p>
              <p className="text-lg leading-relaxed text-[#f0ede6]/80 mb-8" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                Meu portfólio contempla empresas de blockchain, AR, inteligência artificial, dados, content tech, ad tech, sports tech, retail tech e até de book tech. Somos um total hoje de <span className="text-[#00d4ff] font-bold">R$ 300 milhões</span> em ativos.
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#c9a84c] font-bold text-lg" style={{ background: "rgba(201, 168, 76, 0.15)", fontFamily: "Playfair Display, serif" }}>
                  P
                </div>
                <div>
                  <p className="text-[#c9a84c] font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>Pyr Marcondes</p>
                  <p className="text-[#8a9bb5] text-sm">Founder, Macuco DAO Group</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Os Ninhos da Macuco */}
      <section className="py-16 border-y border-white/5" style={{ background: "rgba(6, 14, 26, 0.5)" }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: "#c9a84c" }}>
              Os Ninhos da Macuco
            </h2>
            <div className="w-16 h-0.5 mx-auto mb-12" style={{ background: "#00d4ff" }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "O Valor Intangível", desc: "O valor econômico que uma marca agrega além dos seus ativos físicos, baseado em reputação, reconhecimento e fidelidade." },
              { title: "AI Ventures & Investments", desc: "AI como arquitetura de funding do futuro. Construindo as bases financeiras das empresas que vão liderar a exponencialidade." },
              { title: "Mergers & Acquisitions", desc: "A IA Generativa e a IA Agente estão transformando os negócios em todos os setores. Entender esse novo padrão é essencial." },
              { title: "AI Business Consulting", desc: "Negócios do futuro exigem arquitetura estratégica, tecnologia proprietária e inteligência preditiva." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: i * 0.1 } } }}
                className="p-6 rounded-xl border border-white/5 hover:border-[#c9a84c]/30 transition-all duration-300 group"
                style={{ background: "rgba(15, 34, 64, 0.4)" }}
              >
                <h3 className="text-lg font-bold mb-3 group-hover:text-[#00d4ff] transition-colors" style={{ color: "#c9a84c" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-[#8a9bb5] leading-relaxed" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: "#c9a84c" }}>
              Depoimentos
            </h2>
            <div className="w-16 h-0.5 mx-auto mb-12" style={{ background: "#00d4ff" }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: i * 0.1 } } }}
                className="p-6 rounded-xl border border-white/5 hover:border-[#c9a84c]/20 transition-all duration-300"
                style={{ background: "rgba(15, 34, 64, 0.3)" }}
              >
                <p className="text-[#f0ede6]/70 text-sm leading-relaxed mb-6 italic" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#c9a84c] text-sm font-bold" style={{ background: "rgba(201, 168, 76, 0.15)" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#c9a84c] text-sm font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>{t.name}</p>
                    <p className="text-[#8a9bb5] text-xs">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA MacucoBot */}
      <section className="py-20 border-t border-white/5" style={{ background: "rgba(6, 14, 26, 0.5)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative p-8 md:p-12 rounded-2xl border border-[#00d4ff]/20 glow-cyan"
              style={{ background: "linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(10, 22, 40, 0.95) 100%)" }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-[#00d4ff]/30" style={{ background: "rgba(0, 212, 255, 0.1)" }}>
                <Sparkles size={14} className="text-[#00d4ff]" />
                <span className="text-[#00d4ff] text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Assistente IA
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#c9a84c" }}>
                Conheça o MacucoBot
              </h2>

              <p className="text-[#f0ede6]/70 text-lg leading-relaxed mb-6 italic" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                "Sou o MacucoBot, inspirado no pássaro macuco — gentil, sagaz e esperto. Posso guiar você por todo o ecossistema do Macuco Group, responder suas dúvidas sobre nossas atividades e ajudar a encontrar o que você precisa."
              </p>

              {/* Topic pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {topicPills.map((pill) => (
                  <span
                    key={pill}
                    className="px-3 py-1 rounded-full text-xs border border-white/10 text-[#8a9bb5]"
                    style={{ background: "rgba(15, 34, 64, 0.5)", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <Link
                href="/macucobot"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide uppercase no-underline transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: "#00d4ff", color: "#0a1628", fontFamily: "Montserrat, sans-serif" }}
              >
                <MessageCircle size={18} />
                Iniciar Conversa
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
