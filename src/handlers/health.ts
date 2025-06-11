import { Request, Response } from "express"


export const health = (req: Request, res: Response) => {
  res.set('Content-Type', 'text/plain')

  res.send('OK')
}
