import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || 'ecommerce';

  if (!uri) {
    console.error('❌ Error: MONGODB_URI not found in .env file');
    console.log('\n📝 Please create a .env file with your MongoDB connection string:');
    console.log('   cp .env.example .env');
    console.log('   # Then edit .env with your Atlas connection string\n');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    console.log('🔄 Connecting to MongoDB Atlas...\n');
    
    await client.connect();
    
    console.log('✅ Successfully connected to MongoDB!\n');
    
    // Test database access
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    
    console.log(`📊 Database: ${dbName}`);
    console.log(`📁 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('\n📋 Available collections:');
      collections.forEach((col) => {
        console.log(`   - ${col.name}`);
      });
    } else {
      console.log('\n💡 No collections yet. They will be created when you insert data.');
    }
    
    console.log('\n✨ Connection test successful!\n');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔍 Troubleshooting:');
    console.log('   1. Check your MONGODB_URI in .env file');
    console.log('   2. Ensure your IP is whitelisted in Atlas');
    console.log('   3. Verify username and password are correct');
    console.log('   4. Check your internet connection\n');
    process.exit(1);
  } finally {
    await client.close();
  }
};

testConnection();

