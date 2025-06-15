import { NextFunction, Request, Response } from "express"

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export const logResponseMiddleware: Middleware = (req, res, next) => {
    res.on('finish', () => {
        const status = res.statusCode

        if (status >= 400) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${status}`)
        }
    })

    next()
}