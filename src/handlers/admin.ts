import { Request, Response } from "express"
import { config } from "../config.js"
import { truncate } from "../db/queries/users.js"
import UnauthorizedError from "../errors/UnauthorizedError.js"


export const metrics = (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html; charset=utf-8')
  
    res.send(
      `
        <html>
        <body>
          <h1>Welcome, Chirpy Admin</h1>
          <p>Chirpy has been visited ${config.fileserverHits} times!</p>
        </body>
      </html>
      `
    )
}

export const reset = async (req: Request, res: Response) => {
    if (config.platform !== "dev") {
        throw new UnauthorizedError(`Cannot perform reset on platform ${config.platform}`)
    }

    config.fileserverHits = 0

    await truncate()
  
    res.set('Content-Type', 'text/plain')
  
    res.send('OK')
}