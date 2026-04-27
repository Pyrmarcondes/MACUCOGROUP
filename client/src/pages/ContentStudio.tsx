import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ContentStudio() {
  const { data: contents, isLoading } = trpc.content.list.useQuery();

  return (
    <div className="min-h-screen" style={{ background: "#0a1628" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <p className="text-[#00d4ff] text-sm tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}>
              BIBLIOTECA
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#c9a84c" }}>
              Content Studio
            </h1>
            <p className="text-lg text-[#f0ede6]/70 leading-relaxed" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
              Estudos, artigos e guias estratégicos sobre o impacto da IA no Marketing, Publicidade e Commerce — produzidos pelo Macuco Group.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="pb-20">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-white/5 p-6 animate-pulse" style={{ background: "rgba(15, 34, 64, 0.4)" }}>
                  <div className="h-4 w-20 rounded bg-white/10 mb-4" />
                  <div className="h-6 w-full rounded bg-white/10 mb-3" />
                  <div className="h-4 w-3/4 rounded bg-white/10 mb-2" />
                  <div className="h-4 w-1/2 rounded bg-white/10" />
                </div>
              ))}
            </div>
          ) : !contents || contents.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="mx-auto mb-4 text-[#8a9bb5]/40" size={48} />
              <p className="text-[#8a9bb5] text-lg">Nenhum conteúdo publicado ainda.</p>
              <p className="text-[#8a9bb5]/60 text-sm mt-2">Em breve, novos estudos e artigos estarão disponíveis.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contents.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: i * 0.08 } } }}
                >
                  <Link
                    href={`/content-studio/${item.slug}`}
                    className="block p-6 rounded-xl border border-white/5 hover:border-[#00d4ff]/20 transition-all duration-300 group no-underline h-full"
                    style={{ background: "rgba(15, 34, 64, 0.4)" }}
                  >
                    {item.category && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs mb-4 border border-[#00d4ff]/20 text-[#00d4ff]"
                        style={{ background: "rgba(0, 212, 255, 0.08)", fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
                      >
                        {item.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#00d4ff] transition-colors" style={{ color: "#c9a84c" }}>
                      {item.title}
                    </h3>
                    {item.summary && (
                      <p className="text-sm text-[#8a9bb5] leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                        {item.summary}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-[#8a9bb5]/60 text-xs">
                        <Calendar size={12} />
                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("pt-BR") : ""}
                      </div>
                      <span className="text-[#00d4ff] text-xs flex items-center gap-1 group-hover:gap-2 transition-all" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Ler <ArrowRight size={12} />
                      </span>
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="px-2 py-0.5 rounded text-[10px] text-[#8a9bb5]/60 border border-white/5" style={{ fontFamily: "Montserrat, sans-serif" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
