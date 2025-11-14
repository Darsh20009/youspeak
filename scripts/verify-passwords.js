const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const dbUrl = `postgresql://${process.env.AWS_DB_USER}:${process.env.AWS_DB_PASSWORD}@${process.env.AWS_DB_HOST}:${process.env.AWS_DB_PORT}/${process.env.AWS_DB_NAME}?schema=youspeak_exercisein`;
process.env.DATABASE_URL = dbUrl;

const prisma = new PrismaClient();

async function verifyPasswords() {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        role: true,
        passwordHash: true,
        isActive: true,
      }
    });
    
    console.log('\n🔐 Verifying passwords for test accounts...\n');
    console.log('================================\n');
    
    const testPassword = '123456';
    
    for (const user of users) {
      console.log(`Email: ${user.email}`);
      console.log(`Role: ${user.role}`);
      console.log(`Active: ${user.isActive ? '✅ YES' : '❌ NO'}`);
      
      const isValid = await bcrypt.compare(testPassword, user.passwordHash);
      console.log(`Password '123456': ${isValid ? '✅ Valid' : '❌ Invalid'}`);
      console.log('--------------------------------\n');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyPasswords();
