const { Pool } = require('pg');

async function testConnection() {
    console.log('Testing DB Connection...');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('DATABASE_URL defined:', !!process.env.DATABASE_URL);

    if (process.env.DATABASE_URL) {
        try {
            const url = new URL(process.env.DATABASE_URL);
            console.log('URL Protocol:', url.protocol);
            console.log('URL Host:', url.hostname);
            console.log('URL Password type:', typeof url.password);
            console.log('URL Password length:', url.password.length);
        } catch (e) {
            console.log('DATABASE_URL is not a valid URL:', e.message);
        }
    }

    const dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'kelola_aja',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    };

    console.log('Fallback Config:', {
        ...dbConfig,
        password: dbConfig.password ? '***' : (dbConfig.password === '' ? 'Empty String' : typeof dbConfig.password)
    });

    try {
        const pool = new Pool(process.env.DATABASE_URL ? {
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        } : dbConfig);

        const res = await pool.query('SELECT NOW()');
        console.log('Connection Successful:', res.rows[0]);
        await pool.end();
    } catch (err) {
        console.error('Connection Failed:', err);
    }
}

testConnection();
