import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'ecommerce';

// Lesson 03 mainly uses Lesson 02 data
// This script verifies data exists and adds indexes for performance exercises

const seedLesson03 = async () => {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔄 Connecting to MongoDB...\n');
    await client.connect();
    
    const db = client.db(dbName);
    
    console.log(`📊 Database: ${dbName}\n`);
    
    // Check if previous lesson data exists
    const userCount = await db.collection('users').countDocuments();
    const productCount = await db.collection('products').countDocuments();
    const orderCount = await db.collection('orders').countDocuments();
    const reviewCount = await db.collection('reviews').countDocuments();
    
    if (userCount === 0 || productCount === 0) {
      console.log('⚠️  Warning: No users or products found!');
      console.log('   Please run seed-lesson-01.js first.\n');
      return;
    }
    
    if (orderCount === 0 || reviewCount === 0) {
      console.log('⚠️  Warning: No orders or reviews found!');
      console.log('   Please run seed-lesson-02.js first.\n');
      return;
    }
    
    console.log(`✅ Found existing data:`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Products: ${productCount}`);
    console.log(`   Orders: ${orderCount}`);
    console.log(`   Reviews: ${reviewCount}\n`);
    
    // Lesson 03 focuses on performance and advanced queries
    // We ensure appropriate indexes exist for exercises
    
    console.log('📇 Verifying and creating indexes for performance exercises...\n');
    
    // Users indexes (if not exist)
    try {
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
      console.log('✅ users.email index verified');
    } catch (e) {
      if (e.code !== 85) console.log('ℹ️  users.email index already exists');
    }
    
    try {
      await db.collection('users').createIndex({ "address.state": 1 });
      console.log('✅ users.address.state index created');
    } catch (e) {
      console.log('ℹ️  users.address.state index already exists');
    }
    
    try {
      await db.collection('users').createIndex({ role: 1, status: 1 });
      console.log('✅ users.role_status compound index created');
    } catch (e) {
      console.log('ℹ️  users.role_status index already exists');
    }
    
    // Products indexes (if not exist)
    try {
      await db.collection('products').createIndex({ sku: 1 }, { unique: true });
      console.log('✅ products.sku index verified');
    } catch (e) {
      if (e.code !== 85) console.log('ℹ️  products.sku index already exists');
    }
    
    try {
      await db.collection('products').createIndex({ category: 1, price: 1 });
      console.log('✅ products.category_price compound index created');
    } catch (e) {
      console.log('ℹ️  products.category_price index already exists');
    }
    
    try {
      await db.collection('products').createIndex({ tags: 1 });
      console.log('✅ products.tags multikey index created');
    } catch (e) {
      console.log('ℹ️  products.tags index already exists');
    }
    
    try {
      await db.collection('products').createIndex({ name: "text", description: "text" });
      console.log('✅ products text index created');
    } catch (e) {
      console.log('ℹ️  products text index already exists');
    }
    
    // Orders indexes (if not exist)
    try {
      await db.collection('orders').createIndex({ userId: 1 });
      console.log('✅ orders.userId index created');
    } catch (e) {
      console.log('ℹ️  orders.userId index already exists');
    }
    
    try {
      await db.collection('orders').createIndex({ status: 1, createdAt: -1 });
      console.log('✅ orders.status_createdAt compound index created');
    } catch (e) {
      console.log('ℹ️  orders.status_createdAt index already exists');
    }
    
    try {
      await db.collection('orders').createIndex({ "items.productId": 1 });
      console.log('✅ orders.items.productId index created');
    } catch (e) {
      console.log('ℹ️  orders.items.productId index already exists');
    }
    
    // Reviews indexes (if not exist)
    try {
      await db.collection('reviews').createIndex({ productId: 1 });
      console.log('✅ reviews.productId index created');
    } catch (e) {
      console.log('ℹ️  reviews.productId index already exists');
    }
    
    try {
      await db.collection('reviews').createIndex({ userId: 1 });
      console.log('✅ reviews.userId index created');
    } catch (e) {
      console.log('ℹ️  reviews.userId index already exists');
    }
    
    try {
      await db.collection('reviews').createIndex({ rating: 1 });
      console.log('✅ reviews.rating index created');
    } catch (e) {
      console.log('ℹ️  reviews.rating index already exists');
    }
    
    try {
      await db.collection('reviews').createIndex({ createdAt: -1 });
      console.log('✅ reviews.createdAt index created');
    } catch (e) {
      console.log('ℹ️  reviews.createdAt index already exists');
    }
    
    console.log('\n✨ Lesson 03 setup complete!\n');
    
    // Summary
    console.log('📊 Database Summary:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Products: ${productCount}`);
    console.log(`   Orders: ${orderCount}`);
    console.log(`   Reviews: ${reviewCount}`);
    
    // List all indexes
    console.log('\n📇 Index Summary:\n');
    
    const collections = ['users', 'products', 'orders', 'reviews'];
    for (const collName of collections) {
      const indexes = await db.collection(collName).indexes();
      console.log(`  ${collName} (${indexes.length} indexes):`);
      indexes.forEach(index => {
        const keys = Object.keys(index.key).join(', ');
        const unique = index.unique ? ' [UNIQUE]' : '';
        const text = index.textIndexVersion ? ' [TEXT]' : '';
        console.log(`    - ${index.name}: ${keys}${unique}${text}`);
      });
      console.log('');
    }
    
    console.log('🔍 Ready for Lesson 03 exercises!');
    console.log('   - $lookup exercises (joins)');
    console.log('   - $unwind exercises (array operations)');
    console.log('   - Performance optimization');
    console.log('   - Index usage and explain()\n');
    
    console.log('💡 Try these advanced queries:');
    console.log('   // Join orders with customer info');
    console.log('   db.orders.aggregate([');
    console.log('     { $lookup: {');
    console.log('         from: "users",');
    console.log('         localField: "userId",');
    console.log('         foreignField: "_id",');
    console.log('         as: "customer"');
    console.log('     } }');
    console.log('   ])');
    console.log('');
    console.log('   // Products with review count');
    console.log('   db.products.aggregate([');
    console.log('     { $lookup: {');
    console.log('         from: "reviews",');
    console.log('         localField: "_id",');
    console.log('         foreignField: "productId",');
    console.log('         as: "reviews"');
    console.log('     } },');
    console.log('     { $addFields: { reviewCount: { $size: "$reviews" } } }');
    console.log('   ])');
    console.log('');
    console.log('   // Analyze query performance');
    console.log('   db.products.find({ category: "Electronics" })');
    console.log('     .explain("executionStats")');
    console.log('');
    
  } catch (error) {
    console.error('❌ Error setting up Lesson 03:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('👋 Connection closed\n');
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedLesson03();
}

export default seedLesson03;

