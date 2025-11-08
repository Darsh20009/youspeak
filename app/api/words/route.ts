import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const words = await prisma.word.findMany({
      where: { studentId: session.user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(words)
  } catch (error) {
    console.error('Error fetching words:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { englishWord, arabicMeaning, exampleSentence } = body

    if (!englishWord || !arabicMeaning) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const word = await prisma.word.create({
      data: {
        studentId: session.user.id,
        englishWord,
        arabicMeaning,
        exampleSentence: exampleSentence || null
      }
    })

    return NextResponse.json(word, { status: 201 })
  } catch (error) {
    console.error('Error creating word:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
