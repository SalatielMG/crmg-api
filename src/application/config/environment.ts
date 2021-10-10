import dotenv from "dotenv";
import {Options} from "sequelize";

dotenv.config({ path: ".env" })


/**
|----------------------------------------------------------------------------------------|
    App Configuration
|----------------------------------------------------------------------------------------|
*/
export const ENVIRONMENT = process.env.NODE_ENV;
const PROD = ENVIRONMENT === "production"
export const PORT = process.env.PORT
export const ENABLED_MANUAL_SET_PASSWORD = process.env.ENABLED_MANUAL_SET_PASSWORD
export const SALT = 12;

/**
|----------------------------------------------------------------------------------------|
    Authentication Configuration
|----------------------------------------------------------------------------------------|
*/

export const SESSION_SECRET = process.env.JWT_SECRET || ""
export const SITE_TIME_ZONE = process.env.SITE_TIME_ZONE

/**
* Use only if you include jwt
*/
// if (!SESSION_SECRET) process.exit(1)


/**
|----------------------------------------------------------------------------------------|
    Databases Configuration
|----------------------------------------------------------------------------------------|
*/

/**
*  MySQL
*/
export const CONFIG_MYSQL = {
    host     : process.env.HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DATABASE
}

/**
*  Mongo DB
*/
export const MONGODB_URI = PROD
    ? process.env.MONGO_PRODUCTION
    : process.env.MONGO_DEVELOPMENT

/**
 * Postgres
 */
export const CONFIG_POSTGRES = {
    host    : process.env.HOST,
    user    : process.env.DB_USER,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
}

/**
 * Sequelize-ORM
 * */
export const CONFIG_SEQUELIZE: Options = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'postgres',
    timezone: '+00:00'
}

/**
 * Nodemailer
 * */
export const MAIL_HOST = process.env.MAIL_HOST
export const MAIL_PORT = process.env.MAIL_PORT
export const MAIL_USERNAME = process.env.MAIL_USERNAME
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD

export const MAIL_FROM = process.env.MAIL_FROM_ADDRESS
export const MAIL_SUBJECT = process.env.MAIL_SUBJECT

export const CONFIG_NODEMAILER = {
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
    },
};


