import { DataSource } from "typeorm";
import { envData } from "../utils/environment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envData.db_host,
    port: envData.db_port,
    username: envData.db_username,
    password: envData.db_pass,
    database: envData.db_name,
    synchronize: true,
    logging: false,
    entities: ['src/db/entities/*.entity.ts'],
    subscribers: [],
    migrations: [],
});