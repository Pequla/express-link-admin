import { AppDataSource } from "../db";
import dotenv from "dotenv";
import bcrypt from "bcrypt"
import { LoginModel } from "../models/login.model";
import { AdminTokenService } from "./admin.token.service";
import jwt from "jsonwebtoken"
import { Admin } from "../entities/Admin";

const repo = AppDataSource.getRepository(Admin);

dotenv.config();
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const accessExpire = process.env.ACCESS_TOKEN_TTL;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshExpire = process.env.REFRESH_TOKEN_TTL;

export class AdminService {

    public static async login(model: LoginModel) {
        const user = await this.findByUsername(model.username)
        if (await bcrypt.compare(model.password, user.password)) {
            const refresh = jwt.sign({ name: model.username }, refreshSecret, { expiresIn: refreshExpire });
            const data = await AdminTokenService.save(user.adminId, refresh)
            return {
                access: jwt.sign({ name: model.username }, accessSecret, { expiresIn: accessExpire }),
                refresh: data.value
            };
        }
        throw new Error('BAD_CREDENTIALS')
    }

    public static async refreshToken(refresh: string) {
        try {
            const data = await AdminTokenService.findByToken(refresh)
            if (data == undefined)
                throw new Error('REFRESH_FAILED');

            const decoded: any = jwt.verify(data.value, refreshSecret as string)
            return {
                access: jwt.sign({ name: decoded.name }, accessSecret, { expiresIn: accessExpire }),
                refresh: data.value
            }
        } catch (err) {
            throw new Error('REFRESH_FAILED');
        }
    }

    public static findByUsername(username: string) {
        const data = repo.findOne({
            where: {
                username: username,
                active: true
            },
            relations: {
                user: true
            }
        });

        if (data == undefined)
            throw new Error('USER_NOT_FOUND')

        return data
    }
}