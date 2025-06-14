import express from "express"
import { logResponseMiddleware } from "./middleware/logger.js"
import { metricsMiddleware } from "./middleware/metrics.js"
import { metrics, reset } from "./handlers/admin.js"
import { health } from "./handlers/health.js"
import { error } from "./middleware/error.js"
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "./config.js"
import { store as storeUser, update as updateUser } from "./handlers/users.js"
import { index as indexChirps, show as showChirp, store as storeChirp } from "./handlers/chirps.js"
import { login, refresh, revoke } from "./handlers/auth.js"


const client = postgres(config.db.url, { max: 1 });
await migrate(drizzle(client), config.db.migrations);

const app = express()
const PORT = 8080

app.use(express.json())
app.use(logResponseMiddleware)
app.use("/app", metricsMiddleware, express.static("./src/app"))

app.get("/api/healthz", health)

app.post("/api/login", login)
app.post("/api/refresh", refresh)
app.post("/api/revoke", revoke)

app.post("/api/users", storeUser)
app.put("/api/users", updateUser)

app.get("/api/chirps", indexChirps)
app.get("/api/chirps/:id", showChirp)
app.post("/api/chirps", storeChirp)

app.get("/admin/metrics", metrics)
app.post("/admin/reset", reset)

app.use(error)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})