import { pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: varchar("password", {length: 256}).notNull().default("unset")
})

export type User = typeof users.$inferInsert

export const chirps = pgTable("chirps", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    body: varchar("body", { length: 150 }).unique().notNull(),
    userId: uuid("user_id").notNull().references(() => users.id, {onDelete: 'cascade'}),
})

export type Chirp = typeof chirps.$inferInsert

export const refreshTokens = pgTable("refresh_tokens", {
  token: varchar("token").primaryKey().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid("user_id").notNull().references(() => users.id, {onDelete: 'cascade'}),
  expiresAt: timestamp("expires_at").notNull(),
  revokedAt: timestamp("revoked_at"),
})

export type RefreshToken = typeof refreshTokens.$inferInsert
