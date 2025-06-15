import { jsonResponse } from "./json.js";
import { HttpHandler } from "./index.js";
import { markAsChirpyRedById } from "../db/queries/users.js";
import { User } from "../db/schema.js";
import NotFoundError from "../errors/NotFoundError.js";
import { getApiKey } from "../auth.js";
import { config } from "../config.js";
import UnauthenticatedError from "../errors/UnauthenticatedError.js";

export const polka: HttpHandler = async (req, res) => {
  const apiKey = getApiKey(req)

  if (apiKey !== config.polkaKey) {
    throw new UnauthenticatedError('Invalid API key')
  }

  type parameters = {
    event: string;
    data: {
      userId: string;
    };
  }

  const params: parameters = req.body

  switch (params.event) {
    case 'user.upgraded':
      await handleUserUpgraded(params.data.userId)
      jsonResponse(res, null, 204)

      return
    default:
      jsonResponse(res, null, 204)

      return
  }
}

const handleUserUpgraded = async (userId: string): Promise<User> => {
  const user = await markAsChirpyRedById(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  return user
}

