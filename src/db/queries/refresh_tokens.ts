import { db } from "../index.js"
import { refreshTokens } from "../schema.js"
import { config } from "../../config.js"
import { and, eq, isNull } from "drizzle-orm"

export const getByToken = async (token: string) => {
  const [result] = await db.select().from(refreshTokens)
    .where(
      and(
        eq(refreshTokens.token, token),
        isNull(refreshTokens.revokedAt)
      )
    )
    
  return result
}

export const createRefreshToken = async (token: string, userId: string) => {
  const expiresAt = new Date(Date.now() + config.defaults.refreshTokenExpiresInSeconds)

  const [result] = await db.insert(refreshTokens).values({token, userId, expiresAt}).returning()

  return result
}

export const revokeRefreshToken = async (token: string) => {
  const now = new Date()

  await db.update(refreshTokens)
    .set({
      revokedAt: now,
      updatedAt: now
    })
    .where(eq(refreshTokens.token, token))
}
