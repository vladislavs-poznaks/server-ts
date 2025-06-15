import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { User, users } from "../schema.js";

export const getUserByEmail = async (email: string) => {
  const [result] = await db.select().from(users).where(eq(users.email, email))

  return result
}

export const create = async (user: User) => {
  const [result] = await db.insert(users).values(user).onConflictDoNothing().returning()

  return result
}

export const updateUser = async (userId: string, user: User) => {
  const [result] = await db.update(users).set(user).where(eq(users.id, userId)).returning()

  return result
}

export const markAsChirpyRedById = async (userId: string) => {
  const [result] = await db.update(users).set({isChirpyRed: true}).where(eq(users.id, userId)).returning()

  return result
}

export const truncate = async () => {
    await db.delete(users)
}
