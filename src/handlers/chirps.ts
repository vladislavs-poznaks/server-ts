import { Request, Response } from "express"
import { create, deleteChirpById, getChirpById, getChirps } from "../db/queries/chirps.js";
import { jsonResponse } from "./json.js";
import BadRequestError from "../errors/BadRequestError.js";
import { HttpHandler } from "./index.js";
import NotFoundError from "../errors/NotFoundError.js";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

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
  }

  const token = getBearerToken(req)

  const userId = validateJWT(token, config.secret)

  const params: parameters = req.body

  if (params.body.length > 140) {
    throw new BadRequestError("Chirp is too long. Max length is 140")
  }

  const cleaned = params.body.split(' ').map(word => profane.includes(word.toLocaleLowerCase()) ? '****' : word).join(' ')

  const chirp = await create({body: cleaned, userId})

  jsonResponse(res, chirp, 201)
}

export const destroy: HttpHandler = async (req, res) => {
  const id = req.params.id

  const chirp = await getChirpById(id)

  if (! chirp) {
    throw new NotFoundError(`Chirp ${id} not found`)
  }

  if (chirp.userId !== validateJWT(getBearerToken(req), config.secret)) {
    throw new UnauthorizedError('Forbidden')
  }

  await deleteChirpById(chirp.id)

  jsonResponse(res, null, 204)
}
