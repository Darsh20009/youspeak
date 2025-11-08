import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  const adminEmail = 'admin@youspeak.com'
  const adminExists = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        passwordHash: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      },
    })

    console.log('✓ Created admin user:', admin.email)
  } else {
    console.log('✓ Admin user already exists')
  }

  await prisma.package.deleteMany({})
  
  await prisma.package.createMany({
    data: [
      {
        title: 'Trial',
        titleAr: 'جلسة تجريبية',
        description: '20-minute introductory session',
        descriptionAr: 'جلسة تعريفية 20 دقيقة',
        price: 0,
        lessonsCount: 1,
        durationDays: 7,
      },
      {
        title: 'Starter',
        titleAr: 'باقة البداية',
        description: 'Single level - 8 lessons valid for 2 months',
        descriptionAr: 'مستوى واحد - 8 حصص صالحة لمدة شهرين',
        price: 200,
        lessonsCount: 8,
        durationDays: 60,
      },
      {
        title: 'Monthly',
        titleAr: 'الباقة الشهرية',
        description: '12 lessons - Great value',
        descriptionAr: '12 حصة - قيمة رائعة',
        price: 360,
        lessonsCount: 12,
        durationDays: 30,
      },
      {
        title: 'Quarterly',
        titleAr: 'الباقة الفصلية',
        description: '36 lessons (3 months) - Best value',
        descriptionAr: '36 حصة (3 أشهر) - أفضل قيمة',
        price: 1000,
        lessonsCount: 36,
        durationDays: 90,
      },
    ],
  })

  console.log('✓ Created 4 packages (Trial, Starter, Monthly, Quarterly)')

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
