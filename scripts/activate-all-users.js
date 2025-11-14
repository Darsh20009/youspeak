const { PrismaClient } = require('@prisma/client');

const dbUrl = `postgresql://${process.env.AWS_DB_USER}:${process.env.AWS_DB_PASSWORD}@${process.env.AWS_DB_HOST}:${process.env.AWS_DB_PORT}/${process.env.AWS_DB_NAME}?schema=youspeak_exercisein`;
process.env.DATABASE_URL = dbUrl;

const prisma = new PrismaClient();

async function activateAllUsers() {
  try {
    const result = await prisma.user.updateMany({
      where: {
        isActive: false
      },
      data: {
        isActive: true
      }
    });
    
    console.log(`✅ Activated ${result.count} users`);
    
    const allUsers = await prisma.user.findMany({
      select: {
        email: true,
        role: true,
        isActive: true
      }
    });
    
    console.log('\n📋 All users status:');
    allUsers.forEach(u => {
      console.log(`${u.email} (${u.role}): ${u.isActive ? '✅ Active' : '❌ Inactive'}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

activateAllUsers();
