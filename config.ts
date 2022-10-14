import * as dotenv from 'dotenv';

dotenv.config();


const ENV = process.env.SERVER_ENV || 'dev';
const PORT = process.env.SERVER_PORT;


const USERNAME_DB = process.env[`USERNAME_DB_${ENV.toUpperCase()}`];
const PASSWORD_DB = process.env[`PASSWORD_DB_${ENV.toUpperCase()}`];
const HOST_DB = process.env[`HOST_DB_${ENV.toUpperCase()}`];
const PORT_DB = process.env[`PORT_DB_${ENV.toUpperCase()}`]
const NAME_DB = process.env[`NAME_DB_${ENV.toUpperCase()}`]
const DIALECT_DB = process.env[`DIALECT_DB_${ENV.toUpperCase()}`]


export {
    PORT,
    USERNAME_DB,
    PASSWORD_DB,
    HOST_DB,
    PORT_DB,
    NAME_DB,
    DIALECT_DB
}