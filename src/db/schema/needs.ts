import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const needCityEnum = pgEnum("need_city", [
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
]);

export const needCategoryEnum = pgEnum("need_category", [
  "Nettoyage",
  "Aide scolaire",
  "Don urgent",
  "Autre",
]);

export const needStatusEnum = pgEnum("need_status", ["open", "resolved"]);

export const needs = pgTable("needs", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  city: needCityEnum("city").notNull(),
  category: needCategoryEnum("category").notNull(),
  whatsappNumber: text("whatsappNumber").notNull(),
  status: needStatusEnum("status").notNull().default("open"),
  createdByUserId: text("createdByUserId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const participations = pgTable(
  "participations",
  {
    id: text("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    needId: text("needId")
      .notNull()
      .references(() => needs.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow(),
  },
  (t) => [
    unique("participations_user_need_unique").on(t.userId, t.needId),
  ]
);

export type Need = typeof needs.$inferSelect;
export type NewNeed = typeof needs.$inferInsert;
export type Participation = typeof participations.$inferSelect;
