import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { AdminToken } from "../entities/AdminToken";

const repo = AppDataSource.getRepository(AdminToken);

export class TokenService {
    public static async findByToken(refresh: string) {
        return await repo.findOne({
            where: {
                value: refresh,
                deletedAt: IsNull()
            }
        })
    }

    public static async save(admin: number, refresh: string) {
        return await repo.save({
            value: refresh,
            adminId: admin,
            createdAt: new Date()
        })
    }
}