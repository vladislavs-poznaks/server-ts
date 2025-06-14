import { Request, Response } from "express"
import { create, getChirpById, getChirps } from "../db/queries/chirps.js";
import { jsonResponse } from "./json.js";
import BadRequestError from "../errors/BadRequestError.js";
import { HttpHandler } from "./index.js";
import NotFoundError from "../errors/NotFoundError.js";

const profane = ['kerfuffle', 'sharbert', 'fornax']

export const index: HttpHandler = async (req, res) => {
  const chirps = await getChirps()

  jsonResponse(res, chirps)
}

export const show: HttpHandler = async (req, res) => {
  const id = req.params.id

  const chirp = await getChirpById(id)

  if (! chirp) {
    throw new NotFoundError(`Chirp ${id} not found`)
  }

  jsonResponse(res, chirp)
}


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
