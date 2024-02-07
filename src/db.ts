import dotenv from "dotenv"
import { DataSource } from "typeorm"
import { Admin } from "./entities/Admin";
import { AdminToken } from "./entities/AdminToken";
import { Data } from "./entities/Data";
import { Guild } from "./entities/Guild";
import { User } from "./entities/User";

// Connecting to database
dotenv.config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Admin, AdminToken, Data, Guild, User],
    logging: false,
})