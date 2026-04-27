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

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      stripeCustomerId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: { origin: "https://macucogroup.one" },
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("stripe.getPlans", () => {
  it("returns an array of 3 plans for public users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const plans = await caller.stripe.getPlans();

    expect(Array.isArray(plans)).toBe(true);
    expect(plans.length).toBe(3);
    expect(plans[0]).toHaveProperty("id");
    expect(plans[0]).toHaveProperty("name");
    expect(plans[0]).toHaveProperty("priceAmountCents");
    expect(plans[0]).toHaveProperty("features");
  });

  it("includes starter, growth, and scale plans", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const plans = await caller.stripe.getPlans();

    const ids = plans.map((p) => p.id);
    expect(ids).toContain("starter");
    expect(ids).toContain("growth");
    expect(ids).toContain("scale");
  });
});

describe("stripe.createCheckout", () => {
  it("rejects unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.stripe.createCheckout({ planId: "starter" })
    ).rejects.toThrow();
  });

  it("rejects invalid plan ID", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.stripe.createCheckout({ planId: "nonexistent" })
    ).rejects.toThrow("Plano não encontrado");
  });
});
