#!/usr/bin/env node

// Test database connection using Prisma
const { PrismaClient } = require('@prisma/client');

// Setup DATABASE_URL from AWS credentials
const dbUrl = `postgresql://${process.env.AWS_DB_USER}:${process.env.AWS_DB_PASSWORD}@${process.env.AWS_DB_HOST}:${process.env.AWS_DB_PORT}/${process.env.AWS_DB_NAME}?schema=youspeak_exercisein`;
process.env.DATABASE_URL = dbUrl;

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    console.log('Host:', process.env.AWS_DB_HOST);
    console.log('Database:', process.env.AWS_DB_NAME);
    console.log('');
    
    // Test the connection by running a simple query
    await prisma.$connect();
    console.log('✅ Successfully connected to the database!');
    
    // Try to query the schema
    const result = await prisma.$queryRaw`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'youspeak_exercisein'
    `;
    
    if (result.length > 0) {
      console.log('✅ Schema "youspeak_exercisein" found!');
    } else {
      console.log('⚠️  Schema "youspeak_exercisein" not found. You may need to run migrations.');
    }
    
    // Check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'youspeak_exercisein'
      ORDER BY table_name
    `;
    
    if (tables.length > 0) {
      console.log(`✅ Found ${tables.length} tables in the schema:`);
      tables.forEach(t => console.log('   -', t.table_name));
    } else {
      console.log('⚠️  No tables found. You may need to run migrations.');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
