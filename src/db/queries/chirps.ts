import { db } from "../index.js";
import { Chirp, chirps } from "../schema.js";

export const create = async (chirp: Chirp) => {
  const [result] = await db.insert(chirps).values(chirp).onConflictDoNothing().returning()

  return result
}
