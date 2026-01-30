import { count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { needs, participations } from "@/db/schema";
import { CITIES, CATEGORIES, type NeedCity, type NeedCategory } from "@/lib/constants/needs";

export type { NeedCity, NeedCategory };
export { getCities, getCategories } from "@/lib/constants/needs";

export type NeedWithCount = {
  id: string;
  title: string;
  description: string;
  city: string;
  category: string;
  whatsappNumber: string;
  status: "open" | "resolved";
  createdByUserId: string;
  createdAt: Date | null;
  participationCount: number;
};

export async function getNeedsWithCounts(filters: {
  city?: string;
  category?: string;
}): Promise<NeedWithCount[]> {
  const rows = await db
    .select({
      id: needs.id,
      title: needs.title,
      description: needs.description,
      city: needs.city,
      category: needs.category,
      whatsappNumber: needs.whatsappNumber,
      status: needs.status,
      createdByUserId: needs.createdByUserId,
      createdAt: needs.createdAt,
      participationCount: count(participations.id),
    })
    .from(needs)
    .leftJoin(participations, eq(needs.id, participations.needId))
    .groupBy(needs.id)
    .orderBy(desc(needs.createdAt));

  let result = rows.map((r) => ({
    ...r,
    participationCount: Number(r.participationCount),
  }));

  if (filters.city && CITIES.includes(filters.city as NeedCity)) {
    result = result.filter((r) => r.city === filters.city);
  }
  if (filters.category && CATEGORIES.includes(filters.category as NeedCategory)) {
    result = result.filter((r) => r.category === filters.category);
  }

  return result;
}

export async function getUserParticipationNeedIds(
  userId: string,
): Promise<Set<string>> {
  const rows = await db
    .select({ needId: participations.needId })
    .from(participations)
    .where(eq(participations.userId, userId));
  return new Set(rows.map((r) => r.needId));
}

export async function getNeedsCreatedByUser(userId: string) {
  return db
    .select()
    .from(needs)
    .where(eq(needs.createdByUserId, userId))
    .orderBy(desc(needs.createdAt));
}

export async function getNeedsUserParticipatedIn(userId: string) {
  return db
    .select({
      id: needs.id,
      title: needs.title,
      city: needs.city,
      category: needs.category,
      status: needs.status,
      whatsappNumber: needs.whatsappNumber,
    })
    .from(needs)
    .innerJoin(participations, eq(needs.id, participations.needId))
    .where(eq(participations.userId, userId))
    .orderBy(desc(needs.createdAt));
}
