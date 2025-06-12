import { NextFunction, Request, Response } from "express"
import BadRequestError from "../errors/BadRequestError.js"
import NotFoundError from "../errors/NotFoundError.js"
import UnauthenticatedError from "../errors/UnauthenticatedError.js"
import UnauthorizedError from "../errors/UnauthorizedError.js"

export type ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => void;

export const error: ErrorHandler = (err, req, res, next) => {
    if (err instanceof BadRequestError) {
        res.status(err.status).json({error: err.message})
        return
    }

    if (err instanceof UnauthenticatedError) {
        res.status(err.status).json({error: err.message})
        return
    }

    if (err instanceof UnauthorizedError) {
        res.status(err.status).json({error: err.message})
        return
    }

    if (err instanceof NotFoundError) {
        res.status(err.status).json({error: err.message})
        return
    }

    res.status(500).json({error: "Internal servrer error"})

    next()
}