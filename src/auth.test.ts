import { describe, it, expect, beforeAll } from "vitest"
import { checkHashedPassword, createJWT, hashPassword, validateJWT } from "./auth"

describe("Password Hashing", () => {
    const password1 = "correctPassword123!"
    const password2 = "anotherPassword456!"
    let hash1: string
    let hash2: string
  
    beforeAll(async () => {
      hash1 = await hashPassword(password1)
      hash2 = await hashPassword(password2)
    })
  
    it("should return true for the correct password", async () => {
      const result = await checkHashedPassword(password1, hash1)
      expect(result).toBe(true)
    })

      
    it("should return false for an incorrect password", async () => {
        const result = await checkHashedPassword(password1, hash2)
        expect(result).toBe(false)
      })
  })

  describe("JWT token", () => {
    it("creates a token and validates it", () => {
        const token = createJWT('test_user_id', 1000, 'secret')

        const userId = validateJWT(token, 'secret')

        expect(userId).toBe('test_user_id')
    })
  })