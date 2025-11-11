import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const WORD_LEVELS = {
  beginner: [
    { word: 'hello', arabic: 'مرحبا', example: 'Hello, how are you?' },
    { word: 'book', arabic: 'كتاب', example: 'I read a book every day.' },
    { word: 'water', arabic: 'ماء', example: 'I drink water.' },
    { word: 'friend', arabic: 'صديق', example: 'She is my best friend.' },
    { word: 'happy', arabic: 'سعيد', example: 'I am very happy today.' },
    { word: 'food', arabic: 'طعام', example: 'This food is delicious.' },
    { word: 'school', arabic: 'مدرسة', example: 'I go to school every day.' },
    { word: 'family', arabic: 'عائلة', example: 'My family is very important to me.' },
    { word: 'house', arabic: 'بيت', example: 'I live in a big house.' },
    { word: 'beautiful', arabic: 'جميل', example: 'The sunset is beautiful.' },
    { word: 'learn', arabic: 'يتعلم', example: 'I learn English every day.' },
    { word: 'work', arabic: 'عمل', example: 'I work from home.' },
    { word: 'time', arabic: 'وقت', example: 'What time is it?' },
    { word: 'day', arabic: 'يوم', example: 'Have a nice day!' },
    { word: 'night', arabic: 'ليل', example: 'Good night, sleep well.' }
  ],
  intermediate: [
    { word: 'accomplish', arabic: 'ينجز', example: 'I want to accomplish my goals.' },
    { word: 'consider', arabic: 'يعتبر', example: 'Please consider my proposal.' },
    { word: 'develop', arabic: 'يطور', example: 'We need to develop new skills.' },
    { word: 'enthusiastic', arabic: 'متحمس', example: 'She was enthusiastic about the project.' },
    { word: 'significant', arabic: 'مهم/كبير', example: 'This is a significant achievement.' },
    { word: 'appreciate', arabic: 'يقدر', example: 'I appreciate your help.' },
    { word: 'challenge', arabic: 'تحدي', example: 'This is a difficult challenge.' },
    { word: 'opportunity', arabic: 'فرصة', example: 'This is a great opportunity.' },
    { word: 'experience', arabic: 'خبرة', example: 'She has a lot of experience.' },
    { word: 'necessary', arabic: 'ضروري', example: 'It is necessary to practice.' },
    { word: 'determine', arabic: 'يقرر', example: 'We need to determine the best approach.' },
    { word: 'particularly', arabic: 'بشكل خاص', example: 'I particularly enjoy reading.' },
    { word: 'establish', arabic: 'يؤسس', example: 'They want to establish a new company.' },
    { word: 'benefit', arabic: 'فائدة', example: 'Exercise has many benefits.' },
    { word: 'essential', arabic: 'أساسي', example: 'Water is essential for life.' }
  ],
  advanced: [
    { word: 'comprehensive', arabic: 'شامل', example: 'We need a comprehensive solution.' },
    { word: 'inevitable', arabic: 'حتمي', example: 'Change is inevitable.' },
    { word: 'meticulous', arabic: 'دقيق جدا', example: 'He is meticulous in his work.' },
    { word: 'pragmatic', arabic: 'عملي', example: 'We need a pragmatic approach.' },
    { word: 'resilient', arabic: 'مرن/صلب', example: 'She is resilient in difficult times.' },
    { word: 'articulate', arabic: 'فصيح', example: 'He is very articulate in his speech.' },
    { word: 'ambiguous', arabic: 'غامض', example: 'The statement was ambiguous.' },
    { word: 'diminish', arabic: 'يقلل', example: 'Time will diminish the pain.' },
    { word: 'elaborate', arabic: 'مفصل', example: 'Please elaborate on your idea.' },
    { word: 'facilitate', arabic: 'يسهل', example: 'Technology facilitates communication.' },
    { word: 'inherent', arabic: 'متأصل', example: 'There are inherent risks in any venture.' },
    { word: 'perspective', arabic: 'منظور', example: 'Consider different perspectives.' },
    { word: 'substantial', arabic: 'كبير', example: 'We made substantial progress.' },
    { word: 'intricate', arabic: 'معقد', example: 'The design is intricate and detailed.' },
    { word: 'profound', arabic: 'عميق', example: 'He had a profound impact on society.' }
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

    const { word, arabic, example, known } = await request.json()

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
