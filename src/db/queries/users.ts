import { db } from "../index.js";
import { User, users } from "../schema.js";

export const create = async (user: User) => {
  const [result] = await db.insert(users).values(user).onConflictDoNothing().returning()

  return result
}

export const truncate = async () => {
    await db.delete(users)
}
