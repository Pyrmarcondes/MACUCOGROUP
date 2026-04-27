import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ExternalLink, Egg } from "lucide-react";

interface Startup {
  name: string;
  description: string;
  url: string;
  tag?: string;
}

interface Category {
  name: string;
  icon: string;
  startups: Startup[];
}

const portfolioData: Category[] = [
  {
    name: "Live Shopping, Commerce & Retail Tech",
    icon: "🛒",
    startups: [
      { name: "Mimo Live Sales", description: "Startup pioneira em live shopping na América Latina.", url: "mimo.com.br", tag: "LIVE COMMERCE" },
      { name: "Market4U", description: "Maior rede brasileira de minimercados autônomos em condomínios com 2500 lojas. Tem ainda a Market4U ADS, plataforma de Retail Media.", url: "market4u.com", tag: "MINI MARKETS/ADS" },
    ],
  },
  {
    name: "Data Analytics & Martech",
    icon: "📊",
    startups: [
      { name: "Orbit", description: "Martech de Social Insights que usa IA para análise social.", url: "orbit.com", tag: "DATA SCIENCE" },
      { name: "BigLink", description: "Plataforma de Tech AI Marketing Mix Modeling.", url: "biglink.app" },
      { name: "VentureMetrics Hub", description: "IA aplicada a due diligence, compliance e Screening/Scouting.", url: "venturemetrix.com" },
      { name: "Retize", description: "Única Sports Media Network do Brasil.", url: "retize.com.br" },
    ],
  },
  {
    name: "Influencer & Creator Marketing",
    icon: "⭐",
    startups: [
      { name: "Netcos", description: "Full stack com tecnologia proprietária única no mercado de gestão e ROI de investimentos em social.", url: "netcos.art.br", tag: "INFLUENCER MARKETING" },
      { name: "Clone Social", description: "IA para creators. Conteúdos como 'clone do autor'.", url: "clonesocial.com" },
      { name: "Reverb IA", description: "Identidades verbais humanas com IA.", url: "reverb-ia.com" },
    ],
  },
  {
    name: "Inteligência Artificial Corporativa e Automação",
    icon: "🤖",
    startups: [
      { name: "AL4N", description: "Plataforma de criação e gestão de AI Agents (agentes inteligentes).", url: "al4n.ai" },
      { name: "My Data Agent", description: "Transforma dados em resultados via agentes de generative IA.", url: "mydataagent.ai" },
      { name: "Kuber9", description: "Conselheiros em IA.", url: "kuber9.com", tag: "CONSELHO VIRTUAL" },
    ],
  },
  {
    name: "EdTech & HealthTech",
    icon: "🎓",
    startups: [
      { name: "Templo", description: "Maior plataforma de AI Edutech do Brasil.", url: "templo.pro", tag: "AI EDUCAÇÃO" },
      { name: "Storm Education", description: "Edtech inclusiva de ensino de inglês via WhatsApp.", url: "stormeducation.com" },
      { name: "MyDose App", description: "AI Wellness de comunidades.", url: "mydoseapp.com" },
    ],
  },
  {
    name: "Digital Marketing Automation & Advertising",
    icon: "📡",
    startups: [
      { name: "Zeus", description: "Criação e gestão de campanhas digitais via IA.", url: "zeus.ai" },
      { name: "Zedia", description: "Plataforma CTV 4.0 que transforma TVs conectadas em mídias digitais e Shoppable TVs.", url: "zedia.com.br" },
    ],
  },
  {
    name: "3D, XR, Imersão & Tecnologia Volumétrica",
    icon: "🌐",
    startups: [
      { name: "Mantis-AI", description: "Visual Computing e Visual Data.", url: "mantis-vision.com" },
      { name: "Metakosmos", description: "XR, CGI, IA e 3D para immersive commerce.", url: "metakosmos.com.br" },
      { name: "Complete Magazine", description: "Única Plataforma de editorial imersivo (AR, 3D e IA) do Brasil.", url: "completemagazine.com" },
    ],
  },
  {
    name: "In-House Agency as a Platform e Gestão de Equipes",
    icon: "🏢",
    startups: [
      { name: "Wikimee", description: "Plataforma in-house agency com IA generativa.", url: "wikimee.com" },
    ],
  },
  {
    name: "Sound Branding & Inteligência Sonora",
    icon: "🎵",
    startups: [
      { name: "SoundThinkers", description: "Inteligência sonora.", url: "soundthinkers.co" },
    ],
  },
  {
    name: "Commerce Loyalty Tech Driven",
    icon: "💎",
    startups: [
      { name: "DClube", description: "Commerce tech de benefícios e vantagens.", url: "dclube.com.br" },
    ],
  },
];

const totalStartups = portfolioData.reduce((acc, cat) => acc + cat.startups.length, 0);

export default function Portfolio() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a1628" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Egg className="w-8 h-8 text-[#00d4ff]" />
            <span
              className="text-[#00d4ff] text-sm tracking-[0.3em] uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
            >
              Ecossistema de Inovação
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: "#c9a84c", fontWeight: 700, lineHeight: 1.15 }}
          >
            Os Ovos da Macuco
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#f0ede6", opacity: 0.75, lineHeight: 1.7 }}
          >
            O pássaro macuco coloca raros ovos azuis. Cada startup do nosso portfólio
            é um desses ovos — incubada com visão estratégica, inteligência artificial
            e a convicção de que o futuro é <strong style={{ color: "#00d4ff" }}>IA First</strong>.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { value: totalStartups.toString(), label: "Startups" },
              { value: portfolioData.length.toString(), label: "Categorias" },
              { value: "IA First", label: "Filosofia" },
              { value: "IA Driven", label: "do Zero" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-[#00d4ff]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-xs text-[#f0ede6]/50 uppercase tracking-wider mt-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {portfolioData.map((category) => (
            <div key={category.name}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-3" style={{ borderBottom: "1px solid rgba(201, 168, 76, 0.2)" }}>
                <span className="text-2xl">{category.icon}</span>
                <h2
                  className="text-lg md:text-xl uppercase tracking-wider"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#c9a84c", fontWeight: 600 }}
                >
                  {category.name}
                </h2>
                <span className="ml-auto text-xs text-[#00d4ff]/60" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {category.startups.length} {category.startups.length === 1 ? "empresa" : "empresas"}
                </span>
              </div>

              {/* Startup Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.startups.map((startup) => (
                  <a
                    key={startup.name}
                    href={`https://${startup.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-5 rounded-lg border border-white/5 transition-all duration-300 hover:border-[#00d4ff]/30 no-underline"
                    style={{ background: "rgba(13, 31, 53, 0.6)" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        className="text-base font-semibold text-[#f0ede6] group-hover:text-[#00d4ff] transition-colors"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {startup.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-[#f0ede6]/30 group-hover:text-[#00d4ff] transition-colors flex-shrink-0 mt-0.5" />
                    </div>

                    {startup.tag && (
                      <span
                        className="inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded mb-3"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 600,
                          background: "rgba(0, 212, 255, 0.1)",
                          color: "#00d4ff",
                          border: "1px solid rgba(0, 212, 255, 0.2)",
                        }}
                      >
                        {startup.tag}
                      </span>
                    )}

                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#f0ede6", opacity: 0.65 }}
                    >
                      {startup.description}
                    </p>

                    <span
                      className="text-xs text-[#c9a84c]/60 group-hover:text-[#c9a84c] transition-colors"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {startup.url}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
