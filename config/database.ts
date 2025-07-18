import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export default knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306'),
  },
  pool: { min: 0, max: 7 },
});