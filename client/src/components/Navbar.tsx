import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/content-studio", label: "Content Studio" },
  { href: "/macucobot", label: "MacucoBot" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5" style={{ background: "rgba(10, 22, 40, 0.92)", backdropFilter: "blur(12px)" }}>
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span className="text-[#c9a84c] font-bold text-xl tracking-[0.3em] uppercase" style={{ fontFamily: "Montserrat, sans-serif" }}>
            MACUCO
          </span>
          <span className="text-[#f0ede6]/60 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "Montserrat, sans-serif" }}>
            GROUP
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide uppercase no-underline transition-colors duration-200 ${
                location === link.href
                  ? "text-[#00d4ff]"
                  : "text-[#f0ede6]/70 hover:text-[#c9a84c]"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#f0ede6]/70 hover:text-[#00d4ff] transition-colors"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 py-4 px-4" style={{ background: "rgba(10, 22, 40, 0.98)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm tracking-wide uppercase no-underline transition-colors ${
                location === link.href
                  ? "text-[#00d4ff]"
                  : "text-[#f0ede6]/70 hover:text-[#c9a84c]"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
