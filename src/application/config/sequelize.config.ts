import dotenv from 'dotenv';
import {Options} from 'sequelize';

dotenv.config({ path: '.env' });

module.exports = {
    development: <Options> {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: 'postgres',
        timezone: '+00:00'
    },
    test: <Options> {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: 'postgres',
        timezone: '+00:00'
    },
    production: <Options> {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: 'postgres',
        timezone: '+00:00'
    }
}
