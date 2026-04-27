import { CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-[#0a1628] pt-28 pb-20 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="font-['Playfair_Display'] text-3xl text-[#c9a84c] mb-4">
          Pagamento Confirmado!
        </h1>
        <p className="text-gray-300 font-['Source_Sans_3'] mb-8">
          Sua assinatura do MacucoBot Start foi ativada com sucesso.
          Você receberá um e-mail com os próximos passos para configurar seu chatbot.
        </p>
        <div className="space-y-4">
          <Link href="/" className="block w-full py-3 px-6 rounded-xl bg-cyan-400 text-[#0a1628] font-semibold hover:bg-cyan-300 transition-colors">
            Voltar à Homepage
          </Link>
          <Link href="/macucobot" className="block w-full py-3 px-6 rounded-xl border border-gray-600 text-gray-300 font-semibold hover:border-cyan-400/50 transition-colors">
            Falar com o MacucoBot
          </Link>
        </div>
      </div>
    </div>
  );
}
