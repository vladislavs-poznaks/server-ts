import { Request, Response } from "express"
import { jsonResponse } from "./json.js"
import BadRequestError from "../errors/BadRequestError.js"

const profane = ['kerfuffle', 'sharbert', 'fornax']


export const chirp = (req: Request, res: Response) => {
  type parameters = {
    body: string;
  }

  const params: parameters = req.body

  if (params.body.length > 140) {
    throw new BadRequestError("Chirp is too long. Max length is 140")
  }

  const cleanedBody = params.body.split(' ').map(word => profane.includes(word.toLocaleLowerCase()) ? '****' : word).join(' ')

  jsonResponse(res, {cleanedBody})
}
