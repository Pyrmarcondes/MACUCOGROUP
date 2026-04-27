import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { Check, Zap, Rocket, Crown } from "lucide-react";

export default function Plans() {
  const { user, isAuthenticated } = useAuth();
  const { data: plans } = trpc.stripe.getPlans.useQuery();
  const createCheckout = trpc.stripe.createCheckout.useMutation();

  const planIcons = [Zap, Rocket, Crown];

  const handleSubscribe = async (planId: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    try {
      const result = await createCheckout.mutateAsync({ planId });
      if (result.url) {
        toast.info("Redirecionando para o checkout...");
        window.open(result.url, "_blank");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar sessão de checkout");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">
            MacucoBot Start
          </p>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#c9a84c] mb-6">
            Planos & Assinaturas
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-['Source_Sans_3']">
            Escolha o plano ideal para sua empresa e comece a usar chatbots com IA
            personalizados para seu negócio.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans?.map((plan, index) => {
            const Icon = planIcons[index] || Zap;
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                  isHighlighted
                    ? "border-cyan-400/60 bg-gradient-to-b from-cyan-950/30 to-[#0d1f3c] shadow-[0_0_40px_rgba(0,212,255,0.15)]"
                    : "border-gray-700/50 bg-[#0d1f3c]/60 hover:border-gray-600/70"
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-[#0a1628] text-xs font-bold px-4 py-1 rounded-full">
                    MAIS POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isHighlighted ? "bg-cyan-400/20" : "bg-gray-700/30"
                  }`}>
                    <Icon className={`w-6 h-6 ${isHighlighted ? "text-cyan-400" : "text-gray-400"}`} />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-2xl text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm font-['Source_Sans_3']">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      R$ {(plan.priceAmountCents / 100).toFixed(0)}
                    </span>
                    <span className="text-gray-400 text-sm">/mês</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        isHighlighted ? "text-cyan-400" : "text-[#c9a84c]"
                      }`} />
                      <span className="text-gray-300 text-sm font-['Source_Sans_3']">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={createCheckout.isPending}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    isHighlighted
                      ? "bg-cyan-400 text-[#0a1628] hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                      : "bg-[#c9a84c] text-[#0a1628] hover:bg-[#d4b85c]"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {createCheckout.isPending ? "Processando..." : "Assinar Agora"}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ / Info */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#c9a84c] mb-6">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6 text-left">
            <div className="border border-gray-700/50 rounded-xl p-6 bg-[#0d1f3c]/40">
              <h3 className="text-white font-semibold mb-2">Como funciona o teste gratuito?</h3>
              <p className="text-gray-400 text-sm font-['Source_Sans_3']">
                Todos os planos incluem 7 dias de teste gratuito. Você pode cancelar a qualquer momento
                antes do fim do período de teste sem ser cobrado.
              </p>
            </div>
            <div className="border border-gray-700/50 rounded-xl p-6 bg-[#0d1f3c]/40">
              <h3 className="text-white font-semibold mb-2">Posso mudar de plano depois?</h3>
              <p className="text-gray-400 text-sm font-['Source_Sans_3']">
                Sim! Você pode fazer upgrade ou downgrade a qualquer momento. A diferença será
                calculada proporcionalmente.
              </p>
            </div>
            <div className="border border-gray-700/50 rounded-xl p-6 bg-[#0d1f3c]/40">
              <h3 className="text-white font-semibold mb-2">Quais formas de pagamento são aceitas?</h3>
              <p className="text-gray-400 text-sm font-['Source_Sans_3']">
                Aceitamos cartões de crédito (Visa, Mastercard, Amex), PIX e boleto bancário
                através da plataforma Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
