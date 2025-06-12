import express from "express"
import { logResponseMiddleware } from "./middleware/logger.js"
import { metricsMiddleware } from "./middleware/metrics.js"
import { metrics, reset } from "./handlers/admin.js"
import { health } from "./handlers/health.js"
import { chirp } from "./handlers/validation.js"
import { error } from "./middleware/error.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(logResponseMiddleware)
app.use("/app", metricsMiddleware, express.static("./src/app"))

app.get("/api/healthz", health)
app.post("/api/validate_chirp", chirp)

app.get("/admin/metrics", metrics)

app.post("/admin/reset", reset)

app.use(error)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})