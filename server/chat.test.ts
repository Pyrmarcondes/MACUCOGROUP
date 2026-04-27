import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("chat.sendMessage", () => {
  it("accepts a valid message and returns a reply string", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.chat.sendMessage({
      sessionId: `test-session-${Date.now()}`,
      message: "O que é o Macuco Group?",
    });
    expect(result).toHaveProperty("reply");
    expect(typeof result.reply).toBe("string");
    expect(result.reply.length).toBeGreaterThan(0);
    expect(result).toHaveProperty("messageCount");
  }, 30000);

  it("rejects empty messages", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.chat.sendMessage({ sessionId: "test-session", message: "" })
    ).rejects.toThrow();
  });
});

describe("chat.submitLead", () => {
  it("rejects lead submission when conversation has fewer than 5 messages", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const sessionId = `test-lead-block-${Date.now()}`;

    // Send only 1 message (not enough for lead capture)
    await caller.chat.sendMessage({ sessionId, message: "Olá" });

    // Attempt lead submission — should fail
    await expect(
      caller.chat.submitLead({
        sessionId,
        name: "Test User",
        email: "test@example.com",
        company: "Test Corp",
      })
    ).rejects.toThrow();
  });

  it("rejects lead submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.chat.submitLead({
        sessionId: "test-session",
        name: "Test",
        email: "not-an-email",
      })
    ).rejects.toThrow();
  });
});
