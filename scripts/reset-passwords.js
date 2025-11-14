const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const dbUrl = `postgresql://${process.env.AWS_DB_USER}:${process.env.AWS_DB_PASSWORD}@${process.env.AWS_DB_HOST}:${process.env.AWS_DB_PORT}/${process.env.AWS_DB_NAME}?schema=youspeak_exercisein`;
process.env.DATABASE_URL = dbUrl;

const prisma = new PrismaClient();

async function resetPasswords() {
  try {
    const newPassword = '123456';
    const passwordHash = await bcrypt.hash(newPassword, 10);
    
    console.log('\n🔄 Resetting passwords for all users...\n');
    
    const result = await prisma.user.updateMany({
      data: {
        passwordHash: passwordHash
      }
    });
    
    console.log(`✅ Updated ${result.count} users`);
    console.log(`New password for all users: ${newPassword}`);
    
    console.log('\n📋 Updated users:');
    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
        isActive: true
      }
    });
    
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - ${user.name} - ${user.isActive ? 'Active' : 'Inactive'}`);
    });
    
    console.log('\n✅ All passwords reset successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

resetPasswords();
