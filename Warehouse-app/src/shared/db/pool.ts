import pg from 'pg';
import { logger } from '../lib/logger.js';
import { env } from '../config/env.js';

const { Pool } = pg;
export const pool = new Pool({
    connectionString: env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
    logger.error({ err }, 'Unexpected error on idle PostgreSQL client')
});

export async function checkDbConnection(): Promise<void> {
    await pool.query('SELECT 1');
    logger.info('PostgreSQL connected successfully');
}



