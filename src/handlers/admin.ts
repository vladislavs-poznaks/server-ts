import { Request, Response } from "express"
import { config } from "../config.js"


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
    config.fileserverHits = 0
  
    res.set('Content-Type', 'text/plain')
  
    res.send('OK')
}