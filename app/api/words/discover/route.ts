import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const WORD_LEVELS = {
  beginner: [
    { word: 'hello', arabic: 'مرحبا', example: 'Hello, how are you?', imageUrl: 'https://images.unsplash.com/photo-1582134901-e89318a4df25?w=400' },
    { word: 'book', arabic: 'كتاب', example: 'I read a book every day.', imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400' },
    { word: 'water', arabic: 'ماء', example: 'I drink water.', imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
    { word: 'friend', arabic: 'صديق', example: 'She is my best friend.', imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400' },
    { word: 'happy', arabic: 'سعيد', example: 'I am very happy today.', imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400' },
    { word: 'food', arabic: 'طعام', example: 'This food is delicious.', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
    { word: 'school', arabic: 'مدرسة', example: 'I go to school every day.', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400' },
    { word: 'family', arabic: 'عائلة', example: 'My family is very important to me.', imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400' },
    { word: 'house', arabic: 'بيت', example: 'I live in a big house.', imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400' },
    { word: 'beautiful', arabic: 'جميل', example: 'The sunset is beautiful.', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
    { word: 'learn', arabic: 'يتعلم', example: 'I learn English every day.', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400' },
    { word: 'work', arabic: 'عمل', example: 'I work from home.', imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400' },
    { word: 'time', arabic: 'وقت', example: 'What time is it?', imageUrl: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400' },
    { word: 'day', arabic: 'يوم', example: 'Have a nice day!', imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400' },
    { word: 'night', arabic: 'ليل', example: 'Good night, sleep well.', imageUrl: 'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=400' }
  ],
  intermediate: [
    { word: 'accomplish', arabic: 'ينجز', example: 'I want to accomplish my goals.', imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400' },
    { word: 'consider', arabic: 'يعتبر', example: 'Please consider my proposal.', imageUrl: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400' },
    { word: 'develop', arabic: 'يطور', example: 'We need to develop new skills.', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400' },
    { word: 'enthusiastic', arabic: 'متحمس', example: 'She was enthusiastic about the project.', imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400' },
    { word: 'significant', arabic: 'مهم/كبير', example: 'This is a significant achievement.', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400' },
    { word: 'appreciate', arabic: 'يقدر', example: 'I appreciate your help.', imageUrl: 'https://images.unsplash.com/photo-1533461502717-83546f485d24?w=400' },
    { word: 'challenge', arabic: 'تحدي', example: 'This is a difficult challenge.', imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400' },
    { word: 'opportunity', arabic: 'فرصة', example: 'This is a great opportunity.', imageUrl: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=400' },
    { word: 'experience', arabic: 'خبرة', example: 'She has a lot of experience.', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400' },
    { word: 'necessary', arabic: 'ضروري', example: 'It is necessary to practice.', imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400' },
    { word: 'determine', arabic: 'يقرر', example: 'We need to determine the best approach.', imageUrl: 'https://images.unsplash.com/photo-1531498681614-bc9dcbd97d24?w=400' },
    { word: 'particularly', arabic: 'بشكل خاص', example: 'I particularly enjoy reading.', imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400' },
    { word: 'establish', arabic: 'يؤسس', example: 'They want to establish a new company.', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400' },
    { word: 'benefit', arabic: 'فائدة', example: 'Exercise has many benefits.', imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400' },
    { word: 'essential', arabic: 'أساسي', example: 'Water is essential for life.', imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400' }
  ],
  advanced: [
    { word: 'comprehensive', arabic: 'شامل', example: 'We need a comprehensive solution.', imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400' },
    { word: 'inevitable', arabic: 'حتمي', example: 'Change is inevitable.', imageUrl: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400' },
    { word: 'meticulous', arabic: 'دقيق جدا', example: 'He is meticulous in his work.', imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400' },
    { word: 'pragmatic', arabic: 'عملي', example: 'We need a pragmatic approach.', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400' },
    { word: 'resilient', arabic: 'مرن/صلب', example: 'She is resilient in difficult times.', imageUrl: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=400' },
    { word: 'articulate', arabic: 'فصيح', example: 'He is very articulate in his speech.', imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400' },
    { word: 'ambiguous', arabic: 'غامض', example: 'The statement was ambiguous.', imageUrl: 'https://images.unsplash.com/photo-1518335935020-cfd9b7fe0e8d?w=400' },
    { word: 'diminish', arabic: 'يقلل', example: 'Time will diminish the pain.', imageUrl: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400' },
    { word: 'elaborate', arabic: 'مفصل', example: 'Please elaborate on your idea.', imageUrl: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=400' },
    { word: 'facilitate', arabic: 'يسهل', example: 'Technology facilitates communication.', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400' },
    { word: 'inherent', arabic: 'متأصل', example: 'There are inherent risks in any venture.', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400' },
    { word: 'perspective', arabic: 'منظور', example: 'Consider different perspectives.', imageUrl: 'https://images.unsplash.com/photo-1551651653-c5cad6080e19?w=400' },
    { word: 'substantial', arabic: 'كبير', example: 'We made substantial progress.', imageUrl: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=400' },
    { word: 'intricate', arabic: 'معقد', example: 'The design is intricate and detailed.', imageUrl: 'https://images.unsplash.com/photo-1550063873-ab792950096b?w=400' },
    { word: 'profound', arabic: 'عميق', example: 'He had a profound impact on society.', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400' }
  ]
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const level = searchParams.get('level') || 'beginner'

    const existingWords = await prisma.word.findMany({
      where: { studentId: session.user.id },
      select: { englishWord: true }
    })

    const knownWords = new Set(existingWords.map(w => w.englishWord.toLowerCase()))
    
    const allWords = WORD_LEVELS[level as keyof typeof WORD_LEVELS] || WORD_LEVELS.beginner
    
    const newWords = allWords.filter(w => !knownWords.has(w.word.toLowerCase()))
    
    const shuffled = newWords.sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 10)

    return NextResponse.json({ words: selected, level })
  } catch (error) {
    console.error('Error fetching discover words:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { word, arabic, example, known, imageUrl } = await request.json()

    const existingWord = await prisma.word.findFirst({
      where: {
        studentId: session.user.id,
        englishWord: word
      }
    })

    if (!existingWord) {
      await prisma.word.create({
        data: {
          id: `word_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          studentId: session.user.id,
          englishWord: word,
          arabicMeaning: arabic,
          exampleSentence: example,
          imageUrl: imageUrl || null,
          known: known,
          reviewCount: known ? 1 : 0
        }
      })
    } else {
      await prisma.word.update({
        where: { id: existingWord.id },
        data: { 
          known: known, 
          reviewCount: known ? { increment: 1 } : existingWord.reviewCount 
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving word:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
