import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useParams } from "wouter";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function ContentReader() {
  const { slug } = useParams<{ slug: string }>();
  const { data: content, isLoading, error } = trpc.content.getBySlug.useQuery({ slug: slug || "" });

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "#0a1628" }}>
        <Navbar />
        <div className="pt-32 pb-20 container">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-4 w-24 rounded bg-white/10 mb-6" />
            <div className="h-10 w-3/4 rounded bg-white/10 mb-4" />
            <div className="h-4 w-1/2 rounded bg-white/10 mb-8" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-full rounded bg-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen" style={{ background: "#0a1628" }}>
        <Navbar />
        <div className="pt-32 pb-20 container text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "#c9a84c" }}>Conteúdo não encontrado</h1>
          <p className="text-[#8a9bb5] mb-8">O artigo que você procura não existe ou foi removido.</p>
          <Link href="/content-studio" className="text-[#00d4ff] hover:underline inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Voltar ao Content Studio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0a1628" }}>
      <Navbar />

      <article className="pt-32 pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link href="/content-studio" className="inline-flex items-center gap-2 text-[#00d4ff] text-sm mb-8 no-underline hover:underline" style={{ fontFamily: "Montserrat, sans-serif" }}>
              <ArrowLeft size={14} /> Content Studio
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Category badge */}
              {content.category && (
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs mb-4 border border-[#00d4ff]/20 text-[#00d4ff]"
                  style={{ background: "rgba(0, 212, 255, 0.08)", fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
                >
                  {content.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: "#c9a84c" }}>
                {content.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-white/5">
                {content.authorName && (
                  <div className="flex items-center gap-2 text-[#8a9bb5] text-sm">
                    <User size={14} />
                    <span>{content.authorName}</span>
                  </div>
                )}
                {content.publishedAt && (
                  <div className="flex items-center gap-2 text-[#8a9bb5] text-sm">
                    <Calendar size={14} />
                    <span>{new Date(content.publishedAt).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {content.tags && content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {content.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs border border-white/10 text-[#8a9bb5]" style={{ background: "rgba(15, 34, 64, 0.5)", fontFamily: "Montserrat, sans-serif" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* HTML Content */}
              {content.htmlContent && (
                <div
                  className="content-render"
                  dangerouslySetInnerHTML={{ __html: content.htmlContent }}
                />
              )}

              {/* Summary fallback */}
              {!content.htmlContent && content.summary && (
                <p className="text-lg text-[#f0ede6]/80 leading-relaxed" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                  {content.summary}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
