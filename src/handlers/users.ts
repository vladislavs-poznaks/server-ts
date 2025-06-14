import { Request, Response } from "express"
import { create } from "../db/queries/users.js";
import { jsonResponse } from "./json.js";
import { hashPassword } from "../auth.js";
import { User } from "../db/schema.js";

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
