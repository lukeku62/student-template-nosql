import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'ecommerce';

// Sample data generators
const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Emma', 'Frank', 'Grace', 'Henry', 'Isabella', 'Jack', 'Katherine', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Samuel', 'Tara', 'Uma', 'Victor', 'Wendy', 'Xavier', 'Yara', 'Zachary'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark'];

const cities = [
  { name: 'New York', state: 'NY', zip: '10001' },
  { name: 'Los Angeles', state: 'CA', zip: '90001' },
  { name: 'Chicago', state: 'IL', zip: '60601' },
  { name: 'Houston', state: 'TX', zip: '77001' },
  { name: 'Phoenix', state: 'AZ', zip: '85001' },
  { name: 'Philadelphia', state: 'PA', zip: '19019' },
  { name: 'San Antonio', state: 'TX', zip: '78201' },
  { name: 'San Diego', state: 'CA', zip: '92101' },
  { name: 'Dallas', state: 'TX', zip: '75201' },
  { name: 'San Jose', state: 'CA', zip: '95101' },
  { name: 'Austin', state: 'TX', zip: '73301' },
  { name: 'Seattle', state: 'WA', zip: '98101' },
  { name: 'Denver', state: 'CO', zip: '80201' },
  { name: 'Boston', state: 'MA', zip: '02101' },
  { name: 'Portland', state: 'OR', zip: '97201' }
];

const streets = ['Main St', 'Oak Ave', 'Pine St', 'Maple Dr', 'Cedar Ln', 'Elm St', 'Washington Blvd', 'Park Ave', 'Broadway', 'Market St'];

// Product categories and data
const products = [
  {
    sku: 'LAPTOP-MBP-16-M3',
    name: 'MacBook Pro 16" M3 Max',
    category: 'Electronics',
    subcategory: 'Laptops',
    brand: 'Apple',
    price: 3499.00,
    compareAtPrice: 3999.00,
    description: 'Powerful laptop with M3 Max chip, perfect for professionals',
    tags: ['laptop', 'apple', 'professional', 'sale', 'm3'],
    specifications: {
      processor: 'Apple M3 Max',
      ram: '36GB',
      storage: '1TB SSD',
      display: '16-inch Liquid Retina XDR',
      graphics: 'Integrated'
    },
    stock: 25,
    featured: true
  },
  {
    sku: 'LAPTOP-DELL-XPS13',
    name: 'Dell XPS 13',
    category: 'Electronics',
    subcategory: 'Laptops',
    brand: 'Dell',
    price: 1299.99,
    description: 'Compact and powerful ultrabook',
    tags: ['laptop', 'ultrabook', 'dell', 'portable'],
    specifications: {
      processor: 'Intel Core i7',
      ram: '16GB',
      storage: '512GB SSD',
      display: '13.3-inch FHD'
    },
    stock: 40,
    featured: false
  },
  {
    sku: 'HDPHN-SONY-WH1000XM5',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'Sony',
    price: 399.99,
    description: 'Industry-leading noise cancellation',
    tags: ['headphones', 'wireless', 'noise-cancelling', 'premium'],
    specifications: {
      type: 'Over-ear',
      connectivity: 'Bluetooth 5.2',
      batteryLife: '30 hours',
      noiseCancellation: true
    },
    stock: 60,
    featured: true
  },
  {
    sku: 'HDPHN-AIRPODS-PRO',
    name: 'Apple AirPods Pro (2nd Gen)',
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'Apple',
    price: 249.00,
    description: 'Premium wireless earbuds with ANC',
    tags: ['earbuds', 'wireless', 'apple', 'noise-cancelling'],
    specifications: {
      type: 'In-ear',
      connectivity: 'Bluetooth',
      batteryLife: '6 hours',
      noiseCancellation: true
    },
    stock: 100,
    featured: false
  },
  {
    sku: 'MOUSE-LOGITECH-MX3',
    name: 'Logitech MX Master 3',
    category: 'Electronics',
    subcategory: 'Accessories',
    brand: 'Logitech',
    price: 99.99,
    description: 'Advanced wireless mouse for professionals',
    tags: ['mouse', 'wireless', 'ergonomic', 'productivity'],
    specifications: {
      type: 'Wireless mouse',
      connectivity: 'Bluetooth + USB',
      batteryLife: '70 days'
    },
    stock: 150,
    featured: false
  },
  {
    sku: 'KEYBOARD-KEYCHRON-K8',
    name: 'Keychron K8 Mechanical Keyboard',
    category: 'Electronics',
    subcategory: 'Accessories',
    brand: 'Keychron',
    price: 89.99,
    description: 'Wireless mechanical keyboard',
    tags: ['keyboard', 'mechanical', 'wireless', 'gaming'],
    specifications: {
      type: 'Mechanical',
      connectivity: 'Bluetooth + USB-C',
      switches: 'Gateron Brown'
    },
    stock: 80,
    featured: false
  },
  {
    sku: 'MONITOR-LG-27UK850',
    name: 'LG 27" 4K UHD Monitor',
    category: 'Electronics',
    subcategory: 'Monitors',
    brand: 'LG',
    price: 499.99,
    description: '27-inch 4K UHD monitor with USB-C',
    tags: ['monitor', '4k', 'usb-c', 'professional'],
    specifications: {
      size: '27 inches',
      resolution: '3840x2160',
      refreshRate: '60Hz',
      panel: 'IPS'
    },
    stock: 30,
    featured: true
  },
  {
    sku: 'TABLET-IPAD-AIR',
    name: 'iPad Air 11" M2',
    category: 'Electronics',
    subcategory: 'Tablets',
    brand: 'Apple',
    price: 599.00,
    description: 'Powerful tablet with M2 chip',
    tags: ['tablet', 'apple', 'ipad', 'm2'],
    specifications: {
      processor: 'Apple M2',
      storage: '128GB',
      display: '11-inch Liquid Retina'
    },
    stock: 50,
    featured: true
  },
  {
    sku: 'CAMERA-CANON-R6',
    name: 'Canon EOS R6 Mirrorless Camera',
    category: 'Electronics',
    subcategory: 'Cameras',
    brand: 'Canon',
    price: 2499.00,
    description: 'Professional mirrorless camera',
    tags: ['camera', 'professional', 'mirrorless', 'canon'],
    specifications: {
      sensor: '20MP Full Frame',
      video: '4K 60fps',
      stabilization: '5-axis IBIS'
    },
    stock: 15,
    featured: false
  },
  {
    sku: 'PHONE-IPHONE-15-PRO',
    name: 'iPhone 15 Pro',
    category: 'Electronics',
    subcategory: 'Smartphones',
    brand: 'Apple',
    price: 999.00,
    description: 'Latest iPhone with A17 Pro chip',
    tags: ['smartphone', 'iphone', 'apple', 'titanium'],
    specifications: {
      processor: 'A17 Pro',
      storage: '256GB',
      display: '6.1-inch OLED',
      camera: '48MP Main'
    },
    stock: 120,
    featured: true
  }
];

// Helper functions
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateEmail = (firstName, lastName) => {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomElement(domains)}`;
};

const generatePhone = () => {
  return `+1-555-${String(randomNumber(1000, 9999)).padStart(4, '0')}`;
};

// Generate users
const generateUsers = (count = 30) => {
  const users = [];
  const roles = ['customer', 'customer', 'customer', 'customer', 'admin']; // 80% customers
  
  for (let i = 0; i < count; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const city = randomElement(cities);
    
    users.push({
      email: generateEmail(firstName, lastName),
      password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WSTt7ehTV', // Hashed "password123"
      name: {
        first: firstName,
        last: lastName
      },
      phone: generatePhone(),
      address: {
        street: `${randomNumber(100, 9999)} ${randomElement(streets)}`,
        city: city.name,
        state: city.state,
        zipCode: city.zip,
        country: 'USA'
      },
      preferences: {
        newsletter: Math.random() > 0.5,
        notifications: Math.random() > 0.3,
        currency: 'USD',
        language: 'en'
      },
      role: randomElement(roles),
      status: Math.random() > 0.1 ? 'active' : 'inactive',
      createdAt: randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
      lastLogin: randomDate(new Date(2024, 0, 1), new Date())
    });
  }
  
  return users;
};

// Generate products with ratings
const generateProducts = () => {
  return products.map(product => ({
    ...product,
    rating: {
      average: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
      count: randomNumber(0, 250)
    },
    images: [
      `https://example.com/images/${product.sku.toLowerCase()}-1.jpg`,
      `https://example.com/images/${product.sku.toLowerCase()}-2.jpg`
    ],
    status: 'active',
    createdAt: randomDate(new Date(2023, 6, 1), new Date(2024, 0, 1)),
    updatedAt: new Date()
  }));
};

// Main seed function
const seedLesson01 = async () => {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔄 Connecting to MongoDB...\n');
    await client.connect();
    
    const db = client.db(dbName);
    
    console.log(`📊 Database: ${dbName}\n`);
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await db.collection('users').deleteMany({});
    await db.collection('products').deleteMany({});
    console.log('✅ Existing data cleared\n');
    
    // Create indexes
    console.log('📇 Creating indexes...');
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('products').createIndex({ sku: 1 }, { unique: true });
    await db.collection('products').createIndex({ name: 'text', description: 'text' });
    console.log('✅ Indexes created\n');
    
    // Insert users
    console.log('👥 Generating and inserting users...');
    const users = generateUsers(30);
    const usersResult = await db.collection('users').insertMany(users);
    console.log(`✅ Inserted ${usersResult.insertedCount} users\n`);
    
    // Insert products
    console.log('📦 Generating and inserting products...');
    const productsData = generateProducts();
    const productsResult = await db.collection('products').insertMany(productsData);
    console.log(`✅ Inserted ${productsResult.insertedCount} products\n`);
    
    // Summary
    console.log('📊 Seed Summary:');
    console.log(`   Users: ${usersResult.insertedCount}`);
    console.log(`   Products: ${productsResult.insertedCount}`);
    console.log(`   Total documents: ${usersResult.insertedCount + productsResult.insertedCount}`);
    
    console.log('\n✨ Lesson 01 seed data complete!\n');
    
    console.log('🔍 Sample queries to try:');
    console.log('   db.users.find({ role: "customer" })');
    console.log('   db.products.find({ category: "Electronics" })');
    console.log('   db.products.find({ price: { $lt: 500 } })');
    console.log('   db.users.countDocuments({ status: "active" })\n');
    
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
  seedLesson01();
}

export default seedLesson01;

