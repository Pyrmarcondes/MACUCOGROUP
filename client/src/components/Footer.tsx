import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12" style={{ background: "#060e1a" }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-[#c9a84c] text-lg tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
              MACUCO GROUP
            </h3>
            <p className="text-[#8a9bb5] text-sm leading-relaxed">
              The DAO Network — A primeira DAO de Venture Capital do Brasil. Transformando Marketing, Publicidade, Mídia e Commerce com IA.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#c9a84c] text-sm tracking-[0.15em] uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Navegação
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-[#8a9bb5] hover:text-[#00d4ff] text-sm no-underline transition-colors">Home</Link>
              <Link href="/content-studio" className="text-[#8a9bb5] hover:text-[#00d4ff] text-sm no-underline transition-colors">Content Studio</Link>
              <Link href="/macucobot" className="text-[#8a9bb5] hover:text-[#00d4ff] text-sm no-underline transition-colors">MacucoBot</Link>
              <Link href="/contato" className="text-[#8a9bb5] hover:text-[#00d4ff] text-sm no-underline transition-colors">Contato</Link>
            </div>
          </div>

          {/* Ecossistema */}
          <div>
            <h4 className="text-[#c9a84c] text-sm tracking-[0.15em] uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Ecossistema
            </h4>
            <div className="flex flex-col gap-2">
              <a href="https://macuco.digital" target="_blank" rel="noopener noreferrer" className="text-[#8a9bb5] hover:text-[#00d4ff] text-sm no-underline transition-colors">
                Macuco Tech Ventures
              </a>
              <a href="https://macucowork.com" target="_blank" rel="noopener noreferrer" className="text-[#8a9bb5] hover:text-[#00d4ff] text-sm no-underline transition-colors">
                Macuco Content
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8a9bb5]/60 text-xs">
            &copy; {new Date().getFullYear()} Macuco DAO Group. Todos os direitos reservados.
          </p>
          <p className="text-[#8a9bb5]/40 text-xs">
            contato@macucogroup.com
          </p>
        </div>
      </div>
    </footer>
  );
}
