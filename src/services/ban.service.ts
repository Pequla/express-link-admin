import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Ban } from "../entities/Ban";
import { AdminService } from "./admin.service";
import { BanModel } from "../models/ban.model";

const repo = AppDataSource.getRepository(Ban)

export class BanService {
    public static async getAllBans() {
        const data = await repo.find({
            where: {
                deletedAt: IsNull()
            },
            order: {
                banId: 'DESC'
            },
            relations: {
                user: true
            }
        })

        data.forEach(item => {
            delete item.adminId
            delete item.deletedAt
        })
        return data
    }

    public static async getAllBanUserIds() {
        return await repo.find({
            select: {
                userId: true
            },
            where: {
                deletedAt: IsNull()
            }
        })
    }

    public static async saveBan(model: BanModel, username: string) {
        const admin = await AdminService.findByUsername(username)

        const existing = await repo.findOne({
            select: {
                banId: true
            },
            where: {
                userId: model.id,
                deletedAt: IsNull()
            }
        })

        if (existing != undefined)
            throw new Error('ALREADY_EXISTS')

        const data = await repo.save({
            adminId: admin.adminId,
            userId: model.id,
            reason: model.reason,
            createdAt: new Date()
        })

        delete data.adminId
        delete data.deletedAt
        return data
    }

    public static async deleteBan(id: number) {
        const data = await repo.findOne({
            where: {
                banId: id,
                deletedAt: IsNull()
            }
        })

        if (data == undefined)
            throw new Error('NOT_FOUND')

        data.deletedAt = new Date()
        const saved = await repo.save(data)
        delete saved.adminId
        delete saved.deletedAt

        return saved
    }
}