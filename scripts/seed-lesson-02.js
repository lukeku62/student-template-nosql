import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'ecommerce';

// Helper functions
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// Review comments
const positiveComments = [
  "Excellent product! Highly recommend.",
  "Great quality, exactly as described.",
  "Very satisfied with this purchase.",
  "Best purchase I've made in a while!",
  "Amazing product, exceeded expectations.",
  "Perfect! Works great.",
  "Love it! Will buy again.",
  "Outstanding quality and performance.",
  "Exactly what I needed.",
  "Fantastic! No complaints.",
  "Very happy with this product.",
  "Great value for money.",
  "Impressed with the quality.",
  "Works perfectly as advertised.",
  "Couldn't be happier!",
  "Five stars all the way!",
  "Absolutely love it!",
  "Would definitely recommend to others."
];

const neutralComments = [
  "It's okay, does the job.",
  "Average product, nothing special.",
  "Decent quality for the price.",
  "Works as expected.",
  "Good but not great.",
  "It's fine, meets basic needs.",
  "Acceptable quality.",
  "Not bad, not amazing.",
  "Does what it's supposed to do.",
  "It's alright."
];

const negativeComments = [
  "Not as good as I expected.",
  "Disappointed with the quality.",
  "Had some issues with it.",
  "Could be better.",
  "Not worth the price.",
  "Had to return it.",
  "Doesn't work as advertised.",
  "Quality is lacking.",
  "Regret buying this.",
  "Not recommended."
];

// Generate reviews for a product
const generateReviews = (productId, productName, customerIds, count = 5) => {
  const reviews = [];
  
  for (let i = 0; i < count; i++) {
    const rating = randomNumber(1, 5);
    let comment;
    
    if (rating >= 4) {
      comment = randomElement(positiveComments);
    } else if (rating === 3) {
      comment = randomElement(neutralComments);
    } else {
      comment = randomElement(negativeComments);
    }
    
    const reviewDate = randomDate(new Date(2024, 0, 1), new Date());
    
    reviews.push({
      productId: productId,
      productName: productName,
      userId: randomElement(customerIds),
      rating: rating,
      title: rating >= 4 ? "Great product!" : rating >= 3 ? "It's okay" : "Not satisfied",
      comment: comment,
      verified: Math.random() > 0.2, // 80% verified purchases
      helpful: randomNumber(0, 50),
      reported: false,
      createdAt: reviewDate,
      updatedAt: reviewDate
    });
  }
  
  return reviews;
};

// Generate orders
const generateOrders = (users, products, count = 50) => {
  const orders = [];
  const customers = users.filter(u => u.role === 'customer');
  
  for (let i = 0; i < count; i++) {
    const customer = randomElement(customers);
    const itemCount = randomNumber(1, 4);
    const items = [];
    let subtotal = 0;
    
    // Select random products for this order
    const selectedProducts = [];
    for (let j = 0; j < itemCount; j++) {
      let product = randomElement(products);
      // Avoid duplicates in same order
      while (selectedProducts.find(p => p._id.equals(product._id))) {
        product = randomElement(products);
      }
      selectedProducts.push(product);
      
      const quantity = randomNumber(1, 3);
      const price = product.price;
      const itemTotal = price * quantity;
      subtotal += itemTotal;
      
      items.push({
        productId: product._id,
        productName: product.name,
        sku: product.sku,
        quantity: quantity,
        price: price,
        total: itemTotal
      });
    }
    
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
    const total = subtotal + tax + shipping;
    
    const statuses = ['pending', 'processing', 'shipped', 'delivered', 'delivered', 'delivered', 'cancelled'];
    const status = randomElement(statuses);
    
    const orderDate = randomDate(new Date(2024, 0, 1), new Date());
    
    let shippedDate = null;
    let deliveredDate = null;
    
    if (status === 'shipped' || status === 'delivered') {
      shippedDate = new Date(orderDate.getTime() + randomNumber(1, 3) * 24 * 60 * 60 * 1000);
    }
    
    if (status === 'delivered') {
      deliveredDate = new Date(shippedDate.getTime() + randomNumber(2, 7) * 24 * 60 * 60 * 1000);
    }
    
    orders.push({
      orderNumber: `ORD-${Date.now()}-${i.toString().padStart(4, '0')}`,
      userId: customer._id,
      items: items,
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      status: status,
      shippingAddress: customer.address,
      paymentMethod: randomElement(['credit_card', 'debit_card', 'paypal', 'apple_pay']),
      createdAt: orderDate,
      updatedAt: status === 'delivered' ? deliveredDate : (status === 'shipped' ? shippedDate : orderDate),
      shippedAt: shippedDate,
      deliveredAt: deliveredDate
    });
  }
  
  return orders;
};

// Main seed function
const seedLesson02 = async () => {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔄 Connecting to MongoDB...\n');
    await client.connect();
    
    const db = client.db(dbName);
    
    console.log(`📊 Database: ${dbName}\n`);
    
    // Check if Lesson 01 data exists
    const userCount = await db.collection('users').countDocuments();
    const productCount = await db.collection('products').countDocuments();
    
    if (userCount === 0 || productCount === 0) {
      console.log('⚠️  Warning: No users or products found!');
      console.log('   Please run seed-lesson-01.js first.\n');
      return;
    }
    
    console.log(`✅ Found ${userCount} users and ${productCount} products\n`);
    
    // Get existing users and products
    const users = await db.collection('users').find().toArray();
    const products = await db.collection('products').find().toArray();
    const customers = users.filter(u => u.role === 'customer');
    
    // Clear existing lesson 02 data
    console.log('🧹 Clearing existing reviews and orders...');
    await db.collection('reviews').deleteMany({});
    await db.collection('orders').deleteMany({});
    console.log('✅ Cleared existing data\n');
    
    // Generate reviews
    console.log('💬 Generating product reviews...');
    const allReviews = [];
    
    for (const product of products) {
      const reviewCount = randomNumber(3, 15); // 3-15 reviews per product
      const reviews = generateReviews(
        product._id,
        product.name,
        customers.map(c => c._id),
        reviewCount
      );
      allReviews.push(...reviews);
    }
    
    const reviewsResult = await db.collection('reviews').insertMany(allReviews);
    console.log(`✅ Inserted ${reviewsResult.insertedCount} reviews\n`);
    
    // Generate orders
    console.log('📦 Generating customer orders...');
    const orderCount = parseInt(process.env.SEED_ORDERS_COUNT) || 50;
    const orders = generateOrders(users, products, orderCount);
    
    const ordersResult = await db.collection('orders').insertMany(orders);
    console.log(`✅ Inserted ${ordersResult.insertedCount} orders\n`);
    
    // Create indexes
    console.log('📇 Creating indexes...');
    await db.collection('reviews').createIndex({ productId: 1 });
    await db.collection('reviews').createIndex({ userId: 1 });
    await db.collection('reviews').createIndex({ rating: 1 });
    await db.collection('reviews').createIndex({ createdAt: -1 });
    
    await db.collection('orders').createIndex({ userId: 1 });
    await db.collection('orders').createIndex({ status: 1 });
    await db.collection('orders').createIndex({ createdAt: -1 });
    await db.collection('orders').createIndex({ "items.productId": 1 });
    console.log('✅ Indexes created\n');
    
    // Calculate statistics
    const stats = {
      totalOrders: ordersResult.insertedCount,
      totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
      avgOrderValue: orders.reduce((sum, o) => sum + o.total, 0) / orders.length,
      totalReviews: reviewsResult.insertedCount,
      avgRating: allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    };
    
    // Summary
    console.log('📊 Seed Summary:');
    console.log(`   Users: ${userCount} (${customers.length} customers)`);
    console.log(`   Products: ${productCount}`);
    console.log(`   Reviews: ${reviewsResult.insertedCount}`);
    console.log(`   Orders: ${ordersResult.insertedCount}`);
    console.log(`   Total Revenue: $${stats.totalRevenue.toFixed(2)}`);
    console.log(`   Avg Order Value: $${stats.avgOrderValue.toFixed(2)}`);
    console.log(`   Avg Rating: ${stats.avgRating.toFixed(2)}/5.0`);
    
    console.log('\n✨ Lesson 02 seed data complete!\n');
    
    console.log('🔍 Sample aggregation queries to try:');
    console.log('   // Count reviews by rating');
    console.log('   db.reviews.aggregate([');
    console.log('     { $group: { _id: "$rating", count: { $sum: 1 } } }');
    console.log('   ])');
    console.log('');
    console.log('   // Total revenue by order status');
    console.log('   db.orders.aggregate([');
    console.log('     { $group: { _id: "$status", revenue: { $sum: "$total" } } }');
    console.log('   ])');
    console.log('');
    console.log('   // Average order value by month');
    console.log('   db.orders.aggregate([');
    console.log('     { $group: { ');
    console.log('         _id: { $month: "$createdAt" },');
    console.log('         avgValue: { $avg: "$total" }');
    console.log('     } }');
    console.log('   ])');
    console.log('');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('👋 Connection closed\n');
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedLesson02();
}

export default seedLesson02;

