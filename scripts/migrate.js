const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    // Remove comments and empty lines
    const cleanLine = line.split('#')[0].trim();
    if (!cleanLine) return;
    
    const match = cleanLine.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '');
      if (key && value && !process.env[key]) {
        process.env[key] = value;
      }
    }
  });
  console.log('Loaded environment variables from .env.local');
} else {
  console.warn('Warning: .env.local file not found. Using default values or environment variables.');
}

async function migrate() {
  // Build connection string
  const dbUser = process.env.DB_USER || 'postgres';
  const dbPassword = process.env.DB_PASSWORD || '';
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || '5432';
  const dbName = process.env.DB_NAME || 'kelola_aja';
  
  const connectionString = process.env.DATABASE_URL || 
    `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

  console.log('Connecting to database:', dbHost + ':' + dbPort + '/' + dbName);
  
  const pool = new Pool({
    connectionString: connectionString,
  });

  try {
    const schemaPath = path.join(__dirname, '../lib/db-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Running database migration...');
    await pool.query(schema);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();

