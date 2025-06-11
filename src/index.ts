import express, { Request, Response } from "express"
import { logResponseMiddleware } from "./middleware/logger.js"
import { config } from "./config.js"
import { metricsMiddleware } from "./middleware/metrics.js"

const app = express()
const PORT = 8080

app.use(logResponseMiddleware)

app.use("/app", metricsMiddleware, express.static("./src/app"))

app.get("/healthz", (req: Request, res: Response) => {
  res.set('Content-Type', 'text/plain')

  res.send('OK')
})

app.get("/metrics", (req: Request, res: Response) => {
  res.set('Content-Type', 'text/plain')

  res.send(`Hits: ${config.fileserverHits}`)
})

app.get("/reset", (req: Request, res: Response) => {
  config.fileserverHits = 0

  res.set('Content-Type', 'text/plain')

  res.send('OK')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})