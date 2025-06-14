import { eq } from "drizzle-orm"
import { db } from "../index.js"
import { Chirp, chirps } from "../schema.js"

export const getChirps = async () => {
  const result = await db.select().from(chirps).orderBy(chirps.createdAt)

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
