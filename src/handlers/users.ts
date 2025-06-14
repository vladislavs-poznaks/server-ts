import { Request, Response } from "express"
import { create, updateUser } from "../db/queries/users.js";
import { jsonResponse } from "./json.js";
import { getBearerToken, hashPassword, validateJWT } from "../auth.js";
import { User } from "../db/schema.js";
import { HttpHandler } from "./index.js";
import { config } from "../config.js";

type UserResponse = Omit<User, "password">;

export const store = async (req: Request, res: Response) => {
  type parameters = {
    email: string;
    password: string;
  }

  const params: parameters = req.body

  const hash = await hashPassword(params.password)

  const user = await create({...params, password: hash})
  const { password, ...userWithoutPassword } = user

  jsonResponse(res, userWithoutPassword as UserResponse, 201)
}

export const update: HttpHandler = async (req, res) => {
  type parameters = {
    email: string;
    password: string;
  }

  const params: parameters = req.body

  const userId = validateJWT(getBearerToken(req), config.secret)

  const hash = await hashPassword(params.password)

  const user = await updateUser(userId, {...params, password: hash})

  const { password, ...userWithoutPassword } = user

  jsonResponse(res, userWithoutPassword as UserResponse, 200)
}
