import { Request, Response } from "express"
import { jsonResponse } from "./json.js";


export const chirp = (req: Request, res: Response) => {
  type parameters = {
    body: string;
  }

  const params: parameters = req.body

  if (params.body.length > 140) {
    jsonResponse(res, {error: "Chirp is too long"}, 400)
  } else {
    jsonResponse(res, {valid: true})
  }
}
