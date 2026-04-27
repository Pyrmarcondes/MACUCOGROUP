import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef, useEffect, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, MessageCircle, User, Building2, Mail, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";

interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  "O que é o Macuco Group?",
  "Quais são as áreas de atuação?",
  "Quem é Pyr Marcondes?",
  "Me faça um tour pelo ecossistema",
  "Como funciona a DAO?",
  "Quero saber sobre AI Ventures",
];

const WELCOME_MSG = `Olá! 🐦 Sou o **MacucoBot**, inspirado no pássaro macuco — gentil, sagaz e esperto.

Posso guiar você por todo o ecossistema do **Macuco Group**, responder suas dúvidas sobre nossas atividades em AI Ventures, Consulting, M&A e Content Studio.

O que gostaria de saber? Escolha uma das opções abaixo ou escreva sua pergunta!`;

export default function MacucoBot() {
  const [sessionId] = useState(() => nanoid());
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: "welcome", role: "assistant", content: WELCOME_MSG },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [leadForm, setLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", company: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = trpc.chat.sendMessage.useMutation();
  const leadMutation = trpc.chat.submitLead.useMutation();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, leadForm, scrollToBottom]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMsg = { id: nanoid(), role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowQuickReplies(false);
    setIsTyping(true);
    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);

    try {
      const result = await chatMutation.mutateAsync({
        sessionId,
        message: text.trim(),
      });

      const botMsg: ChatMsg = { id: nanoid(), role: "assistant", content: result.reply };
      setMessages((prev) => [...prev, botMsg]);

      // After 5+ user messages, trigger lead capture if not already done
      if (newCount >= 5 && !leadSubmitted && !leadForm) {
        setTimeout(() => {
          setLeadForm(true);
        }, 1500);
      }
    } catch {
      const errorMsg: ChatMsg = {
        id: nanoid(),
        role: "assistant",
        content: "Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email) return;

    try {
      await leadMutation.mutateAsync({
        sessionId,
        name: leadData.name,
        email: leadData.email,
        company: leadData.company || undefined,
      });
      setLeadSubmitted(true);
      setLeadForm(false);

      const thankMsg: ChatMsg = {
        id: nanoid(),
        role: "assistant",
        content: `Obrigado, **${leadData.name}**! 🐦 Seus dados foram registrados com sucesso. A equipe do Macuco Group entrará em contato em até **72 horas**. Enquanto isso, posso continuar ajudando com qualquer dúvida!`,
      };
      setMessages((prev) => [...prev, thankMsg]);
    } catch {
      // silently fail
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e0c76e">$1</strong>')
      .replace(/\n/g, "<br />");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a1628" }}>
      <Navbar />

      <div className="flex-1 pt-20 pb-4 flex flex-col">
        <div className="container flex-1 flex flex-col max-w-3xl">
          {/* Header */}
          <div className="py-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center glow-cyan" style={{ background: "rgba(0, 212, 255, 0.15)", border: "1px solid rgba(0, 212, 255, 0.3)" }}>
              <Sparkles size={20} className="text-[#00d4ff]" />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "#c9a84c" }}>MacucoBot</h1>
              <p className="text-[#8a9bb5] text-xs" style={{ fontFamily: "Montserrat, sans-serif" }}>Assistente IA do Macuco Group</p>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto rounded-xl border border-white/5 p-4 md:p-6 mb-4" style={{ background: "rgba(15, 34, 64, 0.3)", maxHeight: "calc(100vh - 280px)" }}>
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "rounded-br-sm"
                        : "rounded-bl-sm"
                    }`}
                    style={{
                      background: msg.role === "user" ? "rgba(0, 212, 255, 0.15)" : "rgba(201, 168, 76, 0.08)",
                      border: msg.role === "user" ? "1px solid rgba(0, 212, 255, 0.2)" : "1px solid rgba(201, 168, 76, 0.15)",
                    }}
                  >
                    <div
                      className="text-sm leading-relaxed text-[#f0ede6]/90"
                      style={{ fontFamily: "Source Sans 3, sans-serif" }}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start mb-4">
                <div className="rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2" style={{ background: "rgba(201, 168, 76, 0.08)", border: "1px solid rgba(201, 168, 76, 0.15)" }}>
                  <Loader2 size={14} className="animate-spin text-[#c9a84c]" />
                  <span className="text-[#8a9bb5] text-sm">MacucoBot está pensando...</span>
                </div>
              </motion.div>
            )}

            {/* Lead capture form */}
            {leadForm && !leadSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                <div className="rounded-2xl p-5 border border-[#00d4ff]/20 glow-cyan" style={{ background: "rgba(0, 212, 255, 0.05)" }}>
                  <p className="text-sm text-[#f0ede6]/80 mb-4" style={{ fontFamily: "Source Sans 3, sans-serif" }}>
                    🐦 Estou adorando nossa conversa! Para que a equipe do Macuco Group possa dar continuidade, poderia compartilhar seus dados?
                  </p>
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10" style={{ background: "rgba(15, 34, 64, 0.5)" }}>
                      <User size={14} className="text-[#8a9bb5]" />
                      <input
                        type="text"
                        placeholder="Seu nome *"
                        value={leadData.name}
                        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                        className="flex-1 bg-transparent text-sm text-[#f0ede6] outline-none placeholder:text-[#8a9bb5]/50"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10" style={{ background: "rgba(15, 34, 64, 0.5)" }}>
                      <Mail size={14} className="text-[#8a9bb5]" />
                      <input
                        type="email"
                        placeholder="Seu e-mail *"
                        value={leadData.email}
                        onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                        className="flex-1 bg-transparent text-sm text-[#f0ede6] outline-none placeholder:text-[#8a9bb5]/50"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10" style={{ background: "rgba(15, 34, 64, 0.5)" }}>
                      <Building2 size={14} className="text-[#8a9bb5]" />
                      <input
                        type="text"
                        placeholder="Empresa (opcional)"
                        value={leadData.company}
                        onChange={(e) => setLeadData({ ...leadData, company: e.target.value })}
                        className="flex-1 bg-transparent text-sm text-[#f0ede6] outline-none placeholder:text-[#8a9bb5]/50"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={leadMutation.isPending}
                        className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02] disabled:opacity-50"
                        style={{ background: "#00d4ff", color: "#0a1628", fontFamily: "Montserrat, sans-serif" }}
                      >
                        {leadMutation.isPending ? "Enviando..." : "Enviar"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setLeadForm(false)}
                        className="px-4 py-2 rounded-lg text-sm text-[#8a9bb5] border border-white/10 hover:border-white/20 transition-all"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Depois
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Quick replies */}
            {showQuickReplies && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-2 mt-2">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    className="px-3 py-1.5 rounded-full text-xs border border-[#00d4ff]/20 text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {qr}
                  </button>
                ))}
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-xl px-4 py-3 border border-white/10 focus-within:border-[#00d4ff]/30 transition-colors" style={{ background: "rgba(15, 34, 64, 0.5)" }}>
              <MessageCircle size={16} className="text-[#8a9bb5]/50" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escreva sua mensagem..."
                className="flex-1 bg-transparent text-sm text-[#f0ede6] outline-none placeholder:text-[#8a9bb5]/50"
                style={{ fontFamily: "Source Sans 3, sans-serif" }}
                disabled={isTyping}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 rounded-xl transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
              style={{ background: "#00d4ff", color: "#0a1628" }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
