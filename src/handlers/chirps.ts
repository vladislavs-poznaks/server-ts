import { Request, Response } from "express"
import { create } from "../db/queries/chirps.js";
import { jsonResponse } from "./json.js";
import BadRequestError from "../errors/BadRequestError.js";

const profane = ['kerfuffle', 'sharbert', 'fornax']


export const store = async (req: Request, res: Response) => {
  type parameters = {
    body: string;
    userId: string;
  }

  const params: parameters = req.body

  if (params.body.length > 140) {
    throw new BadRequestError("Chirp is too long. Max length is 140")
  }

  const cleaned = params.body.split(' ').map(word => profane.includes(word.toLocaleLowerCase()) ? '****' : word).join(' ')

  const chirp = await create({...params, body: cleaned})

  jsonResponse(res, chirp, 201)
}
