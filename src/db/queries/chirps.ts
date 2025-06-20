import { asc, desc, eq } from "drizzle-orm"
import { db } from "../index.js"
import { Chirp, chirps } from "../schema.js"

export const getChirps = async (authorId?: string, sort: string = 'asc') => {
  const order = sort === 'desc' ? desc(chirps.createdAt) : asc(chirps.createdAt)

  const result = db.select().from(chirps)
    .where(authorId ? eq(chirps.userId, authorId) : undefined)
    .orderBy(order)

  return result
}

export const getChirpById = async (id: string) => {
  const [result] = await db.select().from(chirps).where(eq(chirps.id, id))

  return result
}

export const create = async (chirp: Chirp) => {
  const [result] = await db.insert(chirps).values(chirp).onConflictDoNothing().returning()

  return result
}

export const deleteChirpById = async (id: string) => {
  await db.delete(chirps).where(eq(chirps.id, id))
}
