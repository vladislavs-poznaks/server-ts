import { Response } from "express";

export const jsonResponse = (res: Response, body: any, status: number = 200) => {
    res.header('Content-Type', 'application/json')
    
    res.status(status).send(JSON.stringify(body)).end()
}