import { Request, Response } from "express"
import { getUserByEmail } from "../db/queries/users.js";
import { jsonResponse } from "./json.js";
import { checkHashedPassword, createJWT } from "../auth.js";
import { User } from "../db/schema.js";
import UnauthenticatedError from "../errors/UnauthenticatedError.js";
import { config } from "../config.js";

type UserResponse = Omit<User, "password">;

export const login = async (req: Request, res: Response) => {
  type parameters = {
    email: string;
    password: string;
    expiresInSeconds?: number;
  }

  const params: parameters = req.body

  const user = await getUserByEmail(params.email)

  if (!user) {
    throw new UnauthenticatedError("Incorrect email or password")
  }

  if (!await checkHashedPassword(params.password, user.password)) {
    throw new UnauthenticatedError("Incorrect email or password")
  }

  const expiresIn = params.expiresInSeconds || config.defaults.expiresInSeconds

  const token = createJWT(user.id, expiresIn, config.secret)

  const { password, ...userWithoutPassword } = user

  jsonResponse(res, {...userWithoutPassword, token} as UserResponse, 200)
}
