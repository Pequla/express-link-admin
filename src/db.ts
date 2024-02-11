import dotenv from "dotenv"
import { DataSource } from "typeorm"
import { Admin } from "./entities/Admin";
import { Access } from "./entities/Access";
import { AdminToken } from "./entities/AdminToken";
import { Ban } from "./entities/Ban";
import { Data } from "./entities/Data";
import { Guild } from "./entities/Guild";
import { Token } from "./entities/Token";
import { User } from "./entities/User";
import { Variable } from "./entities/Variable";

// Connecting to database
dotenv.config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Access, Admin, AdminToken, Ban, Cache, Data, Guild, Token, User, Variable],
    logging: false,
})