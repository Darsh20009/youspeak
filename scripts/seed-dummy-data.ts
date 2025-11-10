import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 بدء إضافة البيانات الوهمية...')

  const hashedPassword = await bcrypt.hash('admin123', 10)

  const existingAdmin = await prisma.user.findFirst({
    where: { email: 'admin@youspeak.com' }
  })

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        id: 'admin-001',
        name: 'Admin',
        email: 'admin@youspeak.com',
        passwordHash: hashedPassword,
        role: 'ADMIN',
        isActive: true
      }
    })
    console.log('✅ تم إنشاء حساب المسؤول')
  }

  const existingTeacher = await prisma.user.findFirst({
    where: { email: 'teacher@youspeak.com' }
  })

  if (!existingTeacher) {
    const teacher = await prisma.user.create({
      data: {
        id: 'teacher-001',
        name: 'محمد أحمد',
        email: 'teacher@youspeak.com',
        passwordHash: hashedPassword,
        role: 'TEACHER',
        isActive: true
      }
    })

    await prisma.teacherProfile.create({
      data: {
        id: 'tp-001',
        userId: teacher.id,
        bio: 'مدرس لغة إنجليزية محترف مع 10 سنوات خبرة'
      }
    })
    console.log('✅ تم إنشاء حساب المدرس')
  }

  const students = []
  for (let i = 1; i <= 5; i++) {
    const email = `student${i}@test.com`
    const existing = await prisma.user.findFirst({ where: { email } })
    
    if (!existing) {
      const student = await prisma.user.create({
        data: {
          id: `student-00${i}`,
          name: `طالب ${i}`,
          email,
          passwordHash: hashedPassword,
          role: 'STUDENT',
          isActive: true
        }
      })

      const level = i % 3 === 0 ? 'Advanced' : i % 2 === 0 ? 'Intermediate' : 'Beginner'
      await prisma.studentProfile.create({
        data: {
          id: `sp-00${i}`,
          userId: student.id,
          levelInitial: level,
          levelCurrent: level
        }
      })

      students.push(student)
      console.log(`✅ تم إنشاء حساب الطالب ${i}`)
    }
  }

  const wordsCount = await prisma.word.count()
  if (wordsCount < 50) {
    const firstStudent = await prisma.user.findFirst({ 
      where: { role: 'STUDENT' } 
    })
    
    if (firstStudent) {
      const words = [
        { englishWord: 'hello', arabicMeaning: 'مرحبا', exampleSentence: 'Hello, how are you?' },
        { englishWord: 'goodbye', arabicMeaning: 'وداعا', exampleSentence: 'Goodbye, see you later!' },
        { englishWord: 'thank you', arabicMeaning: 'شكرا لك', exampleSentence: 'Thank you for your help.' },
        { englishWord: 'please', arabicMeaning: 'من فضلك', exampleSentence: 'Please pass the salt.' },
        { englishWord: 'sorry', arabicMeaning: 'آسف', exampleSentence: 'I am sorry for being late.' },
        { englishWord: 'friend', arabicMeaning: 'صديق', exampleSentence: 'He is my best friend.' },
        { englishWord: 'family', arabicMeaning: 'عائلة', exampleSentence: 'I love my family.' },
        { englishWord: 'mother', arabicMeaning: 'أم', exampleSentence: 'My mother cooks delicious food.' },
        { englishWord: 'father', arabicMeaning: 'أب', exampleSentence: 'My father works hard.' },
        { englishWord: 'brother', arabicMeaning: 'أخ', exampleSentence: 'I have one brother.' },
        { englishWord: 'sister', arabicMeaning: 'أخت', exampleSentence: 'My sister is younger than me.' },
        { englishWord: 'teacher', arabicMeaning: 'معلم', exampleSentence: 'The teacher explained the lesson well.' },
        { englishWord: 'student', arabicMeaning: 'طالب', exampleSentence: 'Every student needs to study.' },
        { englishWord: 'book', arabicMeaning: 'كتاب', exampleSentence: 'I read an interesting book.' },
        { englishWord: 'pen', arabicMeaning: 'قلم', exampleSentence: 'Can I borrow your pen?' },
        { englishWord: 'paper', arabicMeaning: 'ورقة', exampleSentence: 'Please give me a piece of paper.' },
        { englishWord: 'school', arabicMeaning: 'مدرسة', exampleSentence: 'I go to school every day.' },
        { englishWord: 'house', arabicMeaning: 'منزل', exampleSentence: 'We live in a big house.' },
        { englishWord: 'car', arabicMeaning: 'سيارة', exampleSentence: 'My father has a new car.' },
        { englishWord: 'water', arabicMeaning: 'ماء', exampleSentence: 'Drink plenty of water daily.' },
        { englishWord: 'food', arabicMeaning: 'طعام', exampleSentence: 'I enjoy eating healthy food.' },
        { englishWord: 'apple', arabicMeaning: 'تفاحة', exampleSentence: 'An apple a day keeps the doctor away.' },
        { englishWord: 'bread', arabicMeaning: 'خبز', exampleSentence: 'I eat bread for breakfast.' },
        { englishWord: 'coffee', arabicMeaning: 'قهوة', exampleSentence: 'I drink coffee every morning.' },
        { englishWord: 'tea', arabicMeaning: 'شاي', exampleSentence: 'Would you like some tea?' },
        { englishWord: 'beautiful', arabicMeaning: 'جميل', exampleSentence: 'The sunset is beautiful.' },
        { englishWord: 'happy', arabicMeaning: 'سعيد', exampleSentence: 'I am happy to see you.' },
        { englishWord: 'sad', arabicMeaning: 'حزين', exampleSentence: 'She felt sad after the news.' },
        { englishWord: 'big', arabicMeaning: 'كبير', exampleSentence: 'That is a big building.' },
        { englishWord: 'small', arabicMeaning: 'صغير', exampleSentence: 'The baby has small hands.' },
        { englishWord: 'good', arabicMeaning: 'جيد', exampleSentence: 'You did a good job!' },
        { englishWord: 'bad', arabicMeaning: 'سيئ', exampleSentence: 'Smoking is bad for health.' },
        { englishWord: 'run', arabicMeaning: 'يركض', exampleSentence: 'I run every morning.' },
        { englishWord: 'walk', arabicMeaning: 'يمشي', exampleSentence: 'Let\'s walk to the park.' },
        { englishWord: 'eat', arabicMeaning: 'يأكل', exampleSentence: 'What time do you eat dinner?' },
        { englishWord: 'drink', arabicMeaning: 'يشرب', exampleSentence: 'Remember to drink water.' },
        { englishWord: 'sleep', arabicMeaning: 'ينام', exampleSentence: 'I sleep for 8 hours.' },
        { englishWord: 'study', arabicMeaning: 'يدرس', exampleSentence: 'I study English every day.' },
        { englishWord: 'learn', arabicMeaning: 'يتعلم', exampleSentence: 'We learn something new daily.' },
        { englishWord: 'teach', arabicMeaning: 'يعلم', exampleSentence: 'She teaches mathematics.' },
        { englishWord: 'understand', arabicMeaning: 'يفهم', exampleSentence: 'Do you understand the question?' },
        { englishWord: 'communicate', arabicMeaning: 'يتواصل', exampleSentence: 'We need to communicate better.' },
        { englishWord: 'achieve', arabicMeaning: 'يحقق', exampleSentence: 'You can achieve your goals.' },
        { englishWord: 'develop', arabicMeaning: 'يطور', exampleSentence: 'We should develop our skills.' },
        { englishWord: 'environment', arabicMeaning: 'بيئة', exampleSentence: 'Protect the environment.' },
        { englishWord: 'knowledge', arabicMeaning: 'معرفة', exampleSentence: 'Knowledge is power.' },
        { englishWord: 'experience', arabicMeaning: 'خبرة', exampleSentence: 'Experience is the best teacher.' },
        { englishWord: 'opportunity', arabicMeaning: 'فرصة', exampleSentence: 'This is a great opportunity.' },
        { englishWord: 'challenge', arabicMeaning: 'تحدي', exampleSentence: 'Face every challenge bravely.' },
        { englishWord: 'sophisticated', arabicMeaning: 'متطور', exampleSentence: 'This is a sophisticated system.' }
      ]

      for (const wordData of words) {
        await prisma.word.create({
          data: {
            id: `word_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            studentId: firstStudent.id,
            ...wordData
          }
        })
      }
      console.log(`✅ تم إضافة ${words.length} كلمة`)
    }
  }

  const packagesCount = await prisma.package.count()
  if (packagesCount === 0) {
    await prisma.package.createMany({
      data: [
        {
          id: 'pkg-basic',
          title: 'Basic Package',
          titleAr: 'الباقة الأساسية',
          description: '10 lessons per month',
          descriptionAr: '10 جلسات شهرياً',
          price: 99.99,
          lessonsCount: 10,
          durationDays: 30,
          isActive: true
        },
        {
          id: 'pkg-standard',
          title: 'Standard Package',
          titleAr: 'الباقة القياسية',
          description: '20 lessons per month',
          descriptionAr: '20 جلسة شهرياً',
          price: 179.99,
          lessonsCount: 20,
          durationDays: 30,
          isActive: true
        },
        {
          id: 'pkg-premium',
          title: 'Premium Package',
          titleAr: 'الباقة المميزة',
          description: 'Unlimited lessons',
          descriptionAr: 'جلسات غير محدودة',
          price: 299.99,
          lessonsCount: 9999,
          durationDays: 30,
          isActive: true
        }
      ]
    })
    console.log('✅ تم إضافة 3 باقات')
  }

  console.log('🎉 تم إضافة جميع البيانات الوهمية بنجاح!')
}

main()
  .catch((e) => {
    console.error('❌ خطأ:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
