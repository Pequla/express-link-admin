import { Router } from "express";
import { authenticateToken, retrieveIdFromPath, sendErrorResponse } from "../utils";
import { TokenService } from "../services/token.service";

export const TokenRoute = Router()

TokenRoute.get('/', authenticateToken, async (req: any, res) => {
    try {
        const username = req.user.name
        res.json(await TokenService.getAllTokensByAdminUsername(username));
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})

TokenRoute.post('/', authenticateToken, async (req: any, res)=> {
    try {
        const username = req.user.name
        res.json(await TokenService.createToken(username));
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})

TokenRoute.delete('/:id', authenticateToken, async (req: any, res)=> {
    try {
        const username = req.user.name
        const id = retrieveIdFromPath(req)
        res.json(await TokenService.deleteToken(username, id));
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})