import db from './src/config/database';

async function testConnection() {
  try {
    const result = await db.raw('SELECT 1+1 AS result');
    console.log('Database connected:', result[0][0].result === 2);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    db.destroy();
  }
}

testConnection();