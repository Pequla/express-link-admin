import { IsNull, Like } from "typeorm";
import { AppDataSource } from "../db";
import { Data } from "../entities/Data";
import { BanService } from "./ban.service";

const repo = AppDataSource.getRepository(Data)

export class DataService {
    public static async getAllData() {
        const data = await repo.find({
            where: {
                deletedAt: IsNull()
            },
            order: {
                dataId: 'DESC'
            },
            relations: {
                user: true,
                guild: true
            }
        })

        await this.filterOut(data)
        return data
    }

    public static async getDataById(id: number) {
        const data = await repo.findOne({
            where: {
                dataId: id,
                deletedAt: IsNull()
            },
            relations: {
                user: true,
                guild: true
            }
        })

        if (data == undefined)
            throw new Error('NOT_FOUND')

        delete data.deletedAt
        return data
    }

    public static async searchData(query: string) {
        const like = Like(`%${query.toLowerCase()}%`)
        const data = await repo.find({
            where: [
                {
                    user: {
                        discordId: like
                    },
                    deletedAt: IsNull()
                },
                {
                    guild: {
                        discordId: like
                    },
                    deletedAt: IsNull()
                },
                {
                    uuid: like,
                    deletedAt: IsNull()
                }
            ],
            order: {
                dataId: 'DESC'
            },
            relations: {
                user: true,
                guild: true
            }
        })

        await this.filterOut(data)
        return data
    }

    public static async deleteData(id: number) {
        const data = await repo.findOne({
            where: {
                dataId: id,
                deletedAt: IsNull()
            }
        })

        if (data == undefined)
            throw new Error('NOT_FOUND')

        data.deletedAt = new Date()
        return await repo.save(data)
    }

    private static async filterOut(data: Data[]) {
        const bans = await BanService.getAllBanUserIds()
        const ids = bans.map(ban => ban.userId)
        data.filter(item => ids.indexOf(item.userId) < 0)
        data.forEach(item => delete item.deletedAt)
    }
}