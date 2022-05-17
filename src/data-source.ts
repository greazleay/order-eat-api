import "reflect-metadata"
import { DataSource } from "typeorm"
import { ENV } from "@utils/validateENV"
import { Customer } from "@entities/Customer"
import { Wallet } from "@src/entities/Wallet"
import { Order } from "./entities/Order"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    username: ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Customer, Wallet, Order],
    migrations: [],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false
    }
})
