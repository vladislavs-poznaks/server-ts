import { config } from "../config.js"
import { Middleware } from "./logger.js"

export const metricsMiddleware: Middleware = (req, res, next) => {
    config.fileserverHits++

    next()
}