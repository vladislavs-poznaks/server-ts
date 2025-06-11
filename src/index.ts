import express from "express"
import { logResponseMiddleware } from "./middleware/logger.js"
import { metricsMiddleware } from "./middleware/metrics.js"
import { metrics, reset } from "./handlers/admin.js"
import { health } from "./handlers/health.js"

const app = express()
const PORT = 8080

app.use(logResponseMiddleware)
app.use("/app", metricsMiddleware, express.static("./src/app"))

app.get("/api/healthz", health)

app.get("/admin/metrics", metrics)

app.post("/admin/reset", reset)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})