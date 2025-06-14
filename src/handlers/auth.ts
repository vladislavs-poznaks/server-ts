import { Request, Response } from "express"
import { getUserByEmail } from "../db/queries/users.js";
import { jsonResponse } from "./json.js";
import { checkHashedPassword, getBearerToken, makeJWT, makeRefreshToken } from "../auth.js";
import { User } from "../db/schema.js";
import UnauthenticatedError from "../errors/UnauthenticatedError.js";
import { config } from "../config.js";
import { createRefreshToken, getByToken, revokeRefreshToken } from "../db/queries/refresh_tokens.js";
import { HttpHandler } from "./index.js";

type UserResponse = Omit<User, "password">;

export const login = async (req: Request, res: Response) => {
  type parameters = {
    email: string;
    password: string;
  }

  const params: parameters = req.body

  const user = await getUserByEmail(params.email)

  if (!user) {
    throw new UnauthenticatedError("Incorrect email or password")
  }

  if (!await checkHashedPassword(params.password, user.password)) {
    throw new UnauthenticatedError("Incorrect email or password")
  }

  const token = makeJWT(
    user.id,
    config.defaults.accessTokenExpiresInSeconds,
    config.secret,
  )

  const refreshToken = makeRefreshToken()

  await createRefreshToken(refreshToken, user.id)

  const { password, ...userWithoutPassword } = user

  jsonResponse(res, {...userWithoutPassword, token, refreshToken} as UserResponse, 200)
}

export const refresh: HttpHandler = async (req, res) => {
  const token = await getByToken(getBearerToken(req))

  if (! token) {
    throw new UnauthenticatedError('Refresh token invalid')
  }

  const jwt = makeJWT(token.userId, config.defaults.accessTokenExpiresInSeconds, config.secret)

  jsonResponse(res, {token: jwt})
}

export const revoke: HttpHandler = async (req, res) => {
  await revokeRefreshToken(getBearerToken(req))

  jsonResponse(res, null, 204)
}
