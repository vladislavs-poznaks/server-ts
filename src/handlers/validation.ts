import { Request, Response } from "express"


export const chirp = (req: Request, res: Response) => {
  let body = ""

  req.on("data", (chunk) => {
    body += chunk;
  })

  req.on("end", () => {
    try {
      const parsed = JSON.parse(body)

      if (!parsed?.body || typeof parsed?.body !== "string") {
        res.status(400).send(JSON.stringify({error: "Something went wrong"}))
      } else if (parsed.body.length > 140) {
        res.status(400).send(JSON.stringify({error: "Chirp is too long"}))
      } else {
        res.send(JSON.stringify({valid: true}))
      }

    } catch (error) {
      res.status(400).send("Invalid JSON")
    }
  })
}
