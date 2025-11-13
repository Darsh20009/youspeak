import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const WORD_LEVELS = {
  beginner: [
    { word: 'hello', arabic: 'مرحبا', example: 'Hello, how are you?', imageUrl: undefined },
    { word: 'book', arabic: 'كتاب', example: 'I read a book every day.', imageUrl: undefined },
    { word: 'water', arabic: 'ماء', example: 'I drink water.', imageUrl: undefined },
    { word: 'friend', arabic: 'صديق', example: 'She is my best friend.', imageUrl: undefined },
    { word: 'happy', arabic: 'سعيد', example: 'I am very happy today.', imageUrl: undefined },
    { word: 'food', arabic: 'طعام', example: 'This food is delicious.', imageUrl: undefined },
    { word: 'school', arabic: 'مدرسة', example: 'I go to school every day.', imageUrl: undefined },
    { word: 'family', arabic: 'عائلة', example: 'My family is very important to me.', imageUrl: undefined },
    { word: 'house', arabic: 'بيت', example: 'I live in a big house.', imageUrl: undefined },
    { word: 'beautiful', arabic: 'جميل', example: 'The sunset is beautiful.', imageUrl: undefined },
    { word: 'learn', arabic: 'يتعلم', example: 'I learn English every day.', imageUrl: undefined },
    { word: 'work', arabic: 'عمل', example: 'I work from home.', imageUrl: undefined },
    { word: 'time', arabic: 'وقت', example: 'What time is it?', imageUrl: undefined },
    { word: 'day', arabic: 'يوم', example: 'Have a nice day!', imageUrl: undefined },
    { word: 'night', arabic: 'ليل', example: 'Good night, sleep well.', imageUrl: undefined }
  ],
  intermediate: [
    { word: 'accomplish', arabic: 'ينجز', example: 'I want to accomplish my goals.', imageUrl: undefined },
    { word: 'consider', arabic: 'يعتبر', example: 'Please consider my proposal.', imageUrl: undefined },
    { word: 'develop', arabic: 'يطور', example: 'We need to develop new skills.', imageUrl: undefined },
    { word: 'enthusiastic', arabic: 'متحمس', example: 'She was enthusiastic about the project.', imageUrl: undefined },
    { word: 'significant', arabic: 'مهم/كبير', example: 'This is a significant achievement.', imageUrl: undefined },
    { word: 'appreciate', arabic: 'يقدر', example: 'I appreciate your help.', imageUrl: undefined },
    { word: 'challenge', arabic: 'تحدي', example: 'This is a difficult challenge.', imageUrl: undefined },
    { word: 'opportunity', arabic: 'فرصة', example: 'This is a great opportunity.', imageUrl: undefined },
    { word: 'experience', arabic: 'خبرة', example: 'She has a lot of experience.', imageUrl: undefined },
    { word: 'necessary', arabic: 'ضروري', example: 'It is necessary to practice.', imageUrl: undefined },
    { word: 'determine', arabic: 'يقرر', example: 'We need to determine the best approach.', imageUrl: undefined },
    { word: 'particularly', arabic: 'بشكل خاص', example: 'I particularly enjoy reading.', imageUrl: undefined },
    { word: 'establish', arabic: 'يؤسس', example: 'They want to establish a new company.', imageUrl: undefined },
    { word: 'benefit', arabic: 'فائدة', example: 'Exercise has many benefits.', imageUrl: undefined },
    { word: 'essential', arabic: 'أساسي', example: 'Water is essential for life.', imageUrl: undefined }
  ],
  advanced: [
    { word: 'comprehensive', arabic: 'شامل', example: 'We need a comprehensive solution.', imageUrl: undefined },
    { word: 'inevitable', arabic: 'حتمي', example: 'Change is inevitable.', imageUrl: undefined },
    { word: 'meticulous', arabic: 'دقيق جدا', example: 'He is meticulous in his work.', imageUrl: undefined },
    { word: 'pragmatic', arabic: 'عملي', example: 'We need a pragmatic approach.', imageUrl: undefined },
    { word: 'resilient', arabic: 'مرن/صلب', example: 'She is resilient in difficult times.', imageUrl: undefined },
    { word: 'articulate', arabic: 'فصيح', example: 'He is very articulate in his speech.', imageUrl: undefined },
    { word: 'ambiguous', arabic: 'غامض', example: 'The statement was ambiguous.', imageUrl: undefined },
    { word: 'diminish', arabic: 'يقلل', example: 'Time will diminish the pain.', imageUrl: undefined },
    { word: 'elaborate', arabic: 'مفصل', example: 'Please elaborate on your idea.', imageUrl: undefined },
    { word: 'facilitate', arabic: 'يسهل', example: 'Technology facilitates communication.', imageUrl: undefined },
    { word: 'inherent', arabic: 'متأصل', example: 'There are inherent risks in any venture.', imageUrl: undefined },
    { word: 'perspective', arabic: 'منظور', example: 'Consider different perspectives.', imageUrl: undefined },
    { word: 'substantial', arabic: 'كبير', example: 'We made substantial progress.', imageUrl: undefined },
    { word: 'intricate', arabic: 'معقد', example: 'The design is intricate and detailed.', imageUrl: undefined },
    { word: 'profound', arabic: 'عميق', example: 'He had a profound impact on society.', imageUrl: undefined }
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
