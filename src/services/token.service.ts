import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Token } from "../entities/Token";
import { AdminService } from "./admin.service";
import { v4 as uuidv4 } from 'uuid';

const repo = AppDataSource.getRepository(Token)

export class TokenService {
    public static async getAllTokensByAdminUsername(username: string) {
        const data = await repo.find({
            where: {
                admin: {
                    username: username,
                    active: true
                },
                deletedAt: IsNull()
            }
        })

        data.forEach(item => {
            delete item.adminId
            delete item.deletedAt
        })
        return data
    }

    public static async createToken(username: string) {
        const admin = await AdminService.findByUsername(username)

        const data = await repo.save({
            adminId: admin.adminId,
            value: uuidv4(),
            createdAt: new Date()
        })

        delete data.adminId
        delete data.deletedAt

        return data
    }

    public static async deleteToken(username: string, id: number) {
        const data = await repo.findOne({
            where: {
                tokenId: id,
                admin:{
                    username: username,
                    active: true
                },
                deletedAt: IsNull()
            }
        })

        if (data == undefined) {
            throw new Error('TOKEN_NOT_FOUND')
        }

        delete data.adminId
        return data
    }
}