import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import UnauthenticatedError from './errors/UnauthenticatedError.js';
import { Request } from 'express';
import crypto from 'crypto';

export type Payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;


export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
}

export const checkHashedPassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash)
}

export const makeJWT = (userId: string, expiresIn: number, secret: string): string => {
    const now = Math.floor(Date.now() / 1000)

    const payload: Payload = {
        iss: "chirpy",
        sub: userId,
        iat: now,
        exp: now + expiresIn
    }

    return jwt.sign(payload, secret)
}

export const makeRefreshToken = () => {
    const token = crypto.randomBytes(32).toString('hex')

    return token
}

export const validateJWT = (token: string, secret: string): string => {
    try {
        const payload = jwt.verify(token, secret) as Payload

        return payload.sub || ''
    } catch (err) {
        throw new UnauthenticatedError('Invalid token')
    }
}

export const getBearerToken = (req: Request): string => {
    const header = req.get('Authorization')

    if (! header) {
        throw new UnauthenticatedError('Bearer token not present')
    }

    const [_, token] = header.split(' ')

    if (! token) {
        throw new UnauthenticatedError('Bearer token not present')
    }

    return token
}
