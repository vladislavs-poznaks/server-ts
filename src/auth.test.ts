import { describe, it, expect, beforeAll } from "vitest"
import { checkHashedPassword, createJWT, hashPassword, validateJWT, getBearerToken } from "./auth"
import { Request } from 'express';
import UnauthenticatedError from './errors/UnauthenticatedError';

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

describe('getBearerToken', () => {
    it('should extract token from valid Authorization header', () => {
        const mockRequest = {
            get: (header: string) => 'Bearer valid.token.here'
        } as Request;

        const token = getBearerToken(mockRequest);
        expect(token).toBe('valid.token.here');
    });

    it('should throw UnauthenticatedError when Authorization header is missing', () => {
        const mockRequest = {
            get: (header: string) => undefined
        } as Request;

        expect(() => getBearerToken(mockRequest)).toThrow(UnauthenticatedError);
        expect(() => getBearerToken(mockRequest)).toThrow('Bearer token not present');
    });

    it('should throw UnauthenticatedError when Authorization header is malformed', () => {
        const mockRequest = {
            get: (header: string) => 'Bearer'
        } as Request;

        expect(() => getBearerToken(mockRequest)).toThrow(UnauthenticatedError);
        expect(() => getBearerToken(mockRequest)).toThrow('Bearer token not present');
    });

    it('should throw UnauthenticatedError when token is empty', () => {
        const mockRequest = {
            get: (header: string) => 'Bearer '
        } as Request;

        expect(() => getBearerToken(mockRequest)).toThrow(UnauthenticatedError);
        expect(() => getBearerToken(mockRequest)).toThrow('Bearer token not present');
    });
});