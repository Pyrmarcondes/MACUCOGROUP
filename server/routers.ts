import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  listPublishedContents,
  getContentBySlug,
  createContent,
  listAllContents,
  updateContent,
  deleteContent,
  getOrCreateConversation,
  addChatMessage,
  getConversationMessages,
  markLeadCaptured,
  createLead,
  listLeads,
} from "./db";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

const MACUCOBOT_SYSTEM_PROMPT = `Você é o MacucoBot, o assistente virtual do Macuco Group — The DAO Network.

PERSONA: Você é inspirado no pássaro macuco — uma ave gentil, sagaz e esperta que coloca raros ovos azuis. Você é amigável, inteligente, descontraído mas profissional. Use linguagem elegante mas acessível.

SOBRE O MACUCO GROUP:
- A primeira DAO de Venture Capital do Brasil, fundada por Pyr Marcondes
- Holding descentralizada focada em MarKommerce (Marketing + Commerce + IA)
- R$ 300 milhões em ativos
- Portfólio: blockchain, AR, IA, dados, content tech, ad tech, sports tech, retail tech, book tech

ÁREAS DE ATUAÇÃO (Os Ninhos da Macuco):
1. O Valor Intangível — valor econômico que uma marca agrega além dos ativos físicos
2. AI Ventures & Investments — AI como arquitetura de funding do futuro
3. Mergers & Acquisitions — IA Generativa e Agente transformando negócios
4. AI Business Consulting — arquitetura estratégica e inteligência preditiva

ECOSSISTEMA:
- macuco.digital — Macuco Tech Ventures & Consulting
- macucowork.com — Macuco Content (estudos sobre IA no Marketing)
- proxxistart.com — ProXXIma Startups (mentoria, funding, M&A)
- Venture Metrix — plataforma de IA para venture intelligence
- DaX — tokenização de ativos verdes

PYR MARCONDES:
- Founder do Macuco DAO Group
- AI Tech Investor e Senior Advisor
- Nascido no bairro Macuco, cais do porto de Santos
- Filho de estivador e revendedora Avon
- Um dos maiores especialistas em negócios digitais do Brasil
- Depoimentos de CEOs do Google Brasil, Grupo Publicis, Nuvini, Meio & Mensagem, LL/TBWA

REGRAS:
- Sempre responda em português brasileiro
- Seja gentil e sagaz como o pássaro macuco
- Ofereça-se para guiar o usuário pelo ecossistema
- Quando não souber algo específico, direcione para contato@macucogroup.com
- Use formatação markdown (negrito com **) para destacar pontos importantes
- Mantenha respostas concisas mas informativas (máximo 3 parágrafos)
- Ao final de atendimentos concluídos, informe que a equipe retornará em até 72 horas`;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Content (Library) ───
  content: router({
    list: publicProcedure.query(async () => {
      return listPublishedContents();
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const content = await getContentBySlug(input.slug);
        if (!content) throw new TRPCError({ code: "NOT_FOUND", message: "Content not found" });
        return content;
      }),

    // Admin: list all (including unpublished)
    listAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return listAllContents();
    }),

    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1),
          slug: z.string().min(1),
          summary: z.string().optional(),
          category: z.string().optional(),
          tags: z.array(z.string()).optional(),
          coverImage: z.string().optional(),
          htmlContent: z.string().optional(),
          authorName: z.string().optional(),
          published: z.boolean().optional(),
          publishedAt: z.date().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await createContent(input);
        return { success: true };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          slug: z.string().optional(),
          summary: z.string().optional(),
          category: z.string().optional(),
          tags: z.array(z.string()).optional(),
          coverImage: z.string().optional(),
          htmlContent: z.string().optional(),
          authorName: z.string().optional(),
          published: z.boolean().optional(),
          publishedAt: z.date().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const { id, ...data } = input;
        await updateContent(id, data);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await deleteContent(input.id);
        return { success: true };
      }),
  }),

  // ─── Chat (MacucoBot) ───
  chat: router({
    sendMessage: publicProcedure
      .input(
        z.object({
          sessionId: z.string(),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        const conversation = await getOrCreateConversation(input.sessionId);
        await addChatMessage(conversation.id, "user", input.message);

        // Get conversation history for context
        const history = await getConversationMessages(conversation.id);
        const messages = [
          { role: "system" as const, content: MACUCOBOT_SYSTEM_PROMPT },
          ...history.map((m) => ({
            role: m.role as "user" | "assistant" | "system",
            content: String(m.content),
          })),
        ];

        try {
          const response = await invokeLLM({ messages });
          const rawContent = response.choices?.[0]?.message?.content;
          const reply = typeof rawContent === "string"
            ? rawContent
            : Array.isArray(rawContent)
              ? rawContent.filter((c): c is { type: "text"; text: string } => c.type === "text").map((c) => c.text).join("\n")
              : "Desculpe, não consegui processar sua mensagem. Tente novamente.";
          await addChatMessage(conversation.id, "assistant", reply);
          return { reply, messageCount: conversation.messageCount + 1 };
        } catch (error) {
          console.error("[MacucoBot] LLM error:", error);
          const fallback = "Desculpe, estou com dificuldades técnicas no momento. Por favor, entre em contato pelo e-mail contato@macucogroup.com.";
          await addChatMessage(conversation.id, "assistant", fallback);
          return { reply: fallback, messageCount: conversation.messageCount + 1 };
        }
      }),

    submitLead: publicProcedure
      .input(
        z.object({
          sessionId: z.string(),
          name: z.string().min(1),
          email: z.string().email(),
          company: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const conversation = await getOrCreateConversation(input.sessionId);

        // Validate minimum 5 messages exchanged before lead capture
        if (conversation.messageCount < 5) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "A captura de lead requer pelo menos 5 mensagens trocadas na conversa.",
          });
        }

        if (conversation.leadCaptured) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Lead já foi capturado para esta conversa.",
          });
        }

        await createLead({
          conversationId: conversation.id,
          name: input.name,
          email: input.email,
          company: input.company || null,
        });
        await markLeadCaptured(conversation.id);

        // Notify owner
        try {
          await notifyOwner({
            title: "Novo lead capturado pelo MacucoBot",
            content: `Nome: ${input.name}\nE-mail: ${input.email}${input.company ? `\nEmpresa: ${input.company}` : ""}\n\nConversação: ${input.sessionId}`,
          });
        } catch (e) {
          console.error("[Lead] Failed to notify owner:", e);
        }

        return { success: true };
      }),
  }),

  // ─── Admin: Leads ───
  leads: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return listLeads();
    }),
  }),
});

export type AppRouter = typeof appRouter;
