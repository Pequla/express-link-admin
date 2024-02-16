import { AppDataSource } from "../db";
import dotenv from "dotenv";
import bcrypt from "bcrypt"
import { LoginModel } from "../models/login.model";
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
            return {
                access: jwt.sign({ name: model.username }, accessSecret, { expiresIn: accessExpire }),
                refresh: jwt.sign({ name: model.username }, refreshSecret, { expiresIn: refreshExpire })
            };
        }
        throw new Error('BAD_CREDENTIALS')
    }

    public static async refreshToken(refresh: string) {
        try {
            const decoded: any = jwt.verify(refresh, refreshSecret as string)
            return {
                access: jwt.sign({ name: decoded.name }, accessSecret, { expiresIn: accessExpire }),
                refresh: refresh
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