import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Retrieve id from response
export function retrieveIdFromPath(req: Request) {
    const id = Number.parseInt(req.params.id);
    if (!Number.isNaN(id))
        return id;
    return 0;
}

export function parseToInteger(obj: any) {
    const num = Number.parseInt(obj);
    if (!Number.isNaN(num))
        return num;
    throw new Error('NOT_A_NUMBER')
}

// Not found response
export function notFoundResponse(res: Response, msg = 'Not found') {
    res.status(404).json({
        message: msg,
        timestamp: new Date()
    });
}

// Error response
export function sendErrorResponse(res: Response, code = 400, msg = "Bad request") {
    res.status(code).json({
        message: msg,
        timestamp: new Date()
    });
}

// Validate if defined
export function checkIfDefined(data, res: Response) {
    if (data == undefined) {
        notFoundResponse(res)
        return;
    }
    return data;
}

// Auth
dotenv.config();
export async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return sendErrorResponse(res, 401, 'NO_TOKEN')
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            return sendErrorResponse(res, 403, 'INVALID_TOKEN')
        }
        req.user = user
        next()
    })
}