const { PrismaClient } = require('@prisma/client');

const dbUrl = `postgresql://${process.env.AWS_DB_USER}:${process.env.AWS_DB_PASSWORD}@${process.env.AWS_DB_HOST}:${process.env.AWS_DB_PORT}/${process.env.AWS_DB_NAME}?schema=youspeak_exercisein`;
process.env.DATABASE_URL = dbUrl;

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      }
    });
    
    console.log('\n📋 Current users in database:');
    console.log('================================');
    users.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Name: ${user.name}`);
      console.log(`Role: ${user.role}`);
      console.log(`Active: ${user.isActive ? '✅ YES' : '❌ NO'}`);
      console.log('--------------------------------');
    });
    
    console.log(`\nTotal users: ${users.length}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
