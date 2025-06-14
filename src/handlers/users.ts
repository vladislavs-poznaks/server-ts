import { Request, Response } from "express"
import { create } from "../db/queries/users.js";
import { jsonResponse } from "./json.js";


export const store = async (req: Request, res: Response) => {
  type parameters = {
    email: string;
  }

  const params: parameters = req.body

  const user = await create(params)

  jsonResponse(res, user, 201)
}
