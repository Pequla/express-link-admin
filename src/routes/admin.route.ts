import { Router } from "express";
import { authenticateToken, checkIfDefined, sendErrorResponse } from "../utils";
import { AdminService } from "../services/admin.service";

export const AdminRoute = Router()

AdminRoute.get('/self', authenticateToken, async (req: any, res) => {
    try {
        const data = await AdminService.findByUsername(req.user.name)
        res.json({
            username: data.username,
            discordId: data.user.discordId
        });
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})

AdminRoute.post('/login', async (req, res) => {
    try {
        const body = checkIfDefined(req.body, res);
        const tokens = await AdminService.login(body);
        res.json(tokens);
    } catch (e) {
        sendErrorResponse(res, 401, e.message);
    }
})

AdminRoute.post('/refresh', async (req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const data = await AdminService.refreshToken(token);
        res.json(data);
    } catch (e) {
        sendErrorResponse(res, 401, e.message);
    }
})