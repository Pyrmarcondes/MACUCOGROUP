/**
 * Stripe Products & Prices Configuration
 * MacucoBot Start — SaaS Plans
 */

export interface PlanConfig {
  id: string;
  name: string;
  description: string;
  features: string[];
  mode: "subscription" | "payment";
  priceAmountCents: number;
  currency: string;
  interval?: "month" | "year";
  highlighted?: boolean;
}

export const PLANS: PlanConfig[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Para empresas que estão começando com IA conversacional",
    features: [
      "1 chatbot personalizado",
      "1.000 mensagens/mês",
      "Persona customizada",
      "Integração com site",
      "Suporte por e-mail",
    ],
    mode: "subscription",
    priceAmountCents: 19700, // R$ 197,00
    currency: "brl",
    interval: "month",
  },
  {
    id: "growth",
    name: "Growth",
    description: "Para empresas em crescimento que precisam de escala",
    features: [
      "3 chatbots personalizados",
      "10.000 mensagens/mês",
      "Persona customizada",
      "Integração multi-canal",
      "Captura de leads avançada",
      "Analytics e relatórios",
      "Suporte prioritário",
    ],
    mode: "subscription",
    priceAmountCents: 49700, // R$ 497,00
    currency: "brl",
    interval: "month",
    highlighted: true,
  },
  {
    id: "scale",
    name: "Scale",
    description: "Para operações enterprise com necessidades avançadas",
    features: [
      "Chatbots ilimitados",
      "Mensagens ilimitadas",
      "Personas múltiplas",
      "Integração multi-canal + API",
      "Captura de leads + CRM",
      "Analytics avançado + BI",
      "Treinamento com dados próprios",
      "Suporte dedicado 24/7",
      "SLA garantido",
    ],
    mode: "subscription",
    priceAmountCents: 99700, // R$ 997,00
    currency: "brl",
    interval: "month",
  },
];

export function getPlanById(id: string): PlanConfig | undefined {
  return PLANS.find((p) => p.id === id);
}
