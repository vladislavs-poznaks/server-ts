import { Request, Response } from "express"
import { jsonResponse } from "./json.js";

const profane = ['kerfuffle', 'sharbert', 'fornax']


export const chirp = (req: Request, res: Response) => {
  type parameters = {
    body: string;
  }

  const params: parameters = req.body

  if (params.body.length > 140) {
    jsonResponse(res, {error: "Chirp is too long"}, 400)

    return
  }

  const cleanedBody = params.body.split(' ').map(word => profane.includes(word.toLocaleLowerCase()) ? '****' : word).join(' ')

  jsonResponse(res, {cleanedBody})
}
