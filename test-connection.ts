import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  console.log('Attempting to connect to the database...');
  
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('Error: DATABASE_URL is not set in your .env file.');
    return;
  }

  console.log('Found DATABASE_URL. Connecting...');

  try {
    const sql = postgres(connectionString, {
      onnotice: () => {}, // Suppress notices
      max: 1, // Use only one connection for this test
    });

    // Run a simple, harmless query to test the connection
    const result = await sql`SELECT 1;`;
    console.log('✅ Success! Database connection is working.', result);
    
    // Important: End the connection
    await sql.end();

  } catch (error) {
    console.error('❌ Error: Failed to connect to the database.');
    console.error(error);
  }
}

testConnection();

