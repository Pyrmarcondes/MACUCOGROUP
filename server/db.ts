import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, contents, chatConversations, chatMessages, leads } from "../drizzle/schema";
import type { InsertContent, InsertChatConversation, InsertChatMessage, InsertLead } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── User helpers ───
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Content helpers ───
export async function listPublishedContents() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: contents.id,
      title: contents.title,
      slug: contents.slug,
      summary: contents.summary,
      category: contents.category,
      tags: contents.tags,
      coverImage: contents.coverImage,
      authorName: contents.authorName,
      publishedAt: contents.publishedAt,
    })
    .from(contents)
    .where(eq(contents.published, true))
    .orderBy(desc(contents.publishedAt));
}

export async function getContentBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(contents).where(eq(contents.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createContent(data: InsertContent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contents).values(data);
}

export async function listAllContents() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contents).orderBy(desc(contents.createdAt));
}

export async function updateContent(id: number, data: Partial<InsertContent>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contents).set(data).where(eq(contents.id, id));
}

export async function deleteContent(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(contents).where(eq(contents.id, id));
}

// ─── Chat helpers ───
export async function getOrCreateConversation(sessionId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select().from(chatConversations).where(eq(chatConversations.sessionId, sessionId)).limit(1);
  if (existing.length > 0) return existing[0];
  await db.insert(chatConversations).values({ sessionId });
  const created = await db.select().from(chatConversations).where(eq(chatConversations.sessionId, sessionId)).limit(1);
  return created[0];
}

export async function addChatMessage(conversationId: number, role: "user" | "assistant" | "system", content: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(chatMessages).values({ conversationId, role, content });
  await db.update(chatConversations)
    .set({ messageCount: sql`${chatConversations.messageCount} + 1` })
    .where(eq(chatConversations.id, conversationId));
}

export async function getConversationMessages(conversationId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatMessages).where(eq(chatMessages.conversationId, conversationId)).orderBy(chatMessages.createdAt);
}

export async function markLeadCaptured(conversationId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(chatConversations).set({ leadCaptured: true }).where(eq(chatConversations.id, conversationId));
}

// ─── Lead helpers ───
export async function createLead(data: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(leads).values(data);
}

export async function listLeads() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}
