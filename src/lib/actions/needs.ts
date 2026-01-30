"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth/server";
import { db } from "@/db";
import { needs, participations } from "@/db/schema";

const createNeedSchema = z.object({
  title: z.string().min(1, "Titre requis").max(120, "Titre trop long"),
  description: z.string().min(1, "Description requise").max(2000),
  city: z.enum([
    "Casablanca",
    "Agadir",
    "Marrakech",
    "Rabat",
    "Fès",
    "Tanger",
    "Oujda",
    "Meknès",
    "Tétouan",
    "Lagouira",
  ]),
  category: z.enum(["Nettoyage", "Aide scolaire", "Don urgent", "Autre"]),
  whatsappNumber: z.string().min(1, "Numéro WhatsApp requis"),
});

export type CreateNeedInput = z.infer<typeof createNeedSchema>;

export async function createNeed(input: CreateNeedInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) redirect("/login");

  const parsed = createNeedSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten().fieldErrors };
  }

  const id = crypto.randomUUID();
  await db.insert(needs).values({
    id,
    title: parsed.data.title,
    description: parsed.data.description,
    city: parsed.data.city,
    category: parsed.data.category,
    whatsappNumber: parsed.data.whatsappNumber,
    status: "open",
    createdByUserId: session.user.id,
  });

  redirect("/");
}

const participateSchema = z.object({ needId: z.string().uuid() });

export async function participateInNeed(input: { needId: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) redirect("/login");

  const parsed = participateSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "Données invalides" };
  }

  const existing = await db
    .select()
    .from(participations)
    .where(
      and(
        eq(participations.userId, session.user.id),
        eq(participations.needId, parsed.data.needId),
      ),
    );
  if (existing.length > 0) {
    return { ok: false as const, error: "Vous participez déjà à ce besoin." };
  }

  await db.insert(participations).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    needId: parsed.data.needId,
  });

  return { ok: true as const };
}

const markResolvedSchema = z.object({ needId: z.string().uuid() });

export async function markNeedAsResolved(input: { needId: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) redirect("/login");

  const parsed = markResolvedSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "Données invalides" };
  }

  await db
    .update(needs)
    .set({ status: "resolved" })
    .where(
      and(
        eq(needs.id, parsed.data.needId),
        eq(needs.createdByUserId, session.user.id)
      )
    );

  return { ok: true as const };
}
