import { Request, Response } from "express"
import { getUserByEmail } from "../db/queries/users.js";
import { jsonResponse } from "./json.js";
import { checkHashedPassword } from "../auth.js";
import { User } from "../db/schema.js";
import UnauthenticatedError from "../errors/UnauthenticatedError.js";

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

  const { password, ...userWithoutPassword } = user
  
  jsonResponse(res, userWithoutPassword as UserResponse, 200)
}
