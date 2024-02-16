import { Router } from "express";
import { authenticateToken, parseToInteger, retrieveIdFromPath, sendErrorResponse } from "../utils";
import { DataService } from "../services/data.service";

export const DataRoute = Router()

DataRoute.get('/', authenticateToken, async (req, res) => {
    try {
        res.json(await DataService.getAllData());
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})

DataRoute.get('/search/:payload', authenticateToken, async (req, res) => {
    try {
        res.json(await DataService.searchData(req.params.payload));
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})

DataRoute.get('/user/:id', authenticateToken, async (req, res) => {
    try {
        const id = retrieveIdFromPath(req)
        res.json(await DataService.getDataByUserId(id));
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})

DataRoute.get('/:id', authenticateToken, async (req, res) => {
    try {
        const id = retrieveIdFromPath(req)
        res.json(await DataService.getDataById(id));
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})

DataRoute.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const id = retrieveIdFromPath(req)
        res.json(await DataService.deleteData(id));
    } catch (e) {
        sendErrorResponse(res, 400, e.message);
    }
})