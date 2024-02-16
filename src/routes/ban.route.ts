import { Router } from "express";
import { authenticateToken, retrieveIdFromPath, sendErrorResponse } from "../utils";
import { BanService } from "../services/ban.service";

export const BanRoute = Router()

BanRoute.get('/', authenticateToken, async (req: any, res) => {
    try {
        res.json(await BanService.getAllBans());
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})

BanRoute.post('/', authenticateToken, async (req: any, res) => {
    try {
        const username = req.user.name
        res.json(await BanService.saveBan(req.body, username));
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})

BanRoute.delete('/:id', authenticateToken, async (req: any, res) => {
    try {
        const id = retrieveIdFromPath(req)
        res.json(await BanService.deleteBan(id));
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})