import { useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/content-studio", label: "Content Studio" },
  { href: "/macucobot", label: "MacucoBot", accent: true },
  { href: "/portfolio", label: "Ovos da Macuco" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [location] = useLocation();
  const tabsRef = useRef<HTMLDivElement>(null);

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (tabsRef.current) {
      const activeTab = tabsRef.current.querySelector("[data-active='true']");
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(10, 22, 40, 0.95)", backdropFilter: "blur(12px)" }}>
      {/* Top bar with logo */}
      <div className="container flex items-center justify-between h-14 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span
            className="text-[#c9a84c] font-bold text-lg tracking-[0.3em] uppercase"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            MACUCO
          </span>
          <span
            className="text-[#f0ede6]/50 text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            GROUP
          </span>
        </Link>
        <span
          className="text-[#f0ede6]/30 text-[10px] tracking-[0.15em] uppercase hidden sm:block"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          The DAO Network
        </span>
      </div>

      {/* Tab navigation — horizontal scroll on mobile */}
      <div
        ref={tabsRef}
        className="flex overflow-x-auto scrollbar-hide border-b border-white/5"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="container flex min-w-max">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? location === "/" : location.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={isActive}
                className="relative px-4 py-3 text-xs tracking-wider uppercase no-underline whitespace-nowrap transition-colors duration-200"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  color: isActive
                    ? (link.accent ? "#00d4ff" : "#c9a84c")
                    : (link.accent ? "rgba(0, 212, 255, 0.6)" : "rgba(240, 237, 230, 0.5)"),
                }}
              >
                {link.label}
                {/* Active indicator bar */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                    style={{ background: link.accent ? "#00d4ff" : "#c9a84c" }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </nav>
  );
}
