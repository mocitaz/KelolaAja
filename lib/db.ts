import { Pool } from 'pg';

// Database connection pool
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    const isProduction = process.env.NODE_ENV === 'production';

    // Determine if we need SSL (if production OR if connecting to remote DB)
    // We check if the host in connection string or env vars describes a remote DB
    const isRemote = connectionString
      ? !connectionString.includes('@localhost') && !connectionString.includes('@127.0.0.1')
      : (process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1');

    const sslConfig = (isProduction || isRemote) ? { rejectUnauthorized: false } : false;

    if (connectionString) {
      pool = new Pool({
        connectionString,
        ssl: sslConfig,
      });
    } else {
      // Fallback to individual connection parameters
      pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'kelola_aja',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '', // Ensure string
        ssl: sslConfig,
      });
    }

    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  return pool;
}


// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    const pool = getPool();
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

// Close database connection
export async function closeConnection(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

