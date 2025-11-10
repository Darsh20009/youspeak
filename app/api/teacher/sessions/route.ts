import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId: session.user.id }
    })

    if (!teacherProfile) {
      return NextResponse.json({ error: 'Teacher profile not found' }, { status: 404 })
    }

    const sessions = await prisma.session.findMany({
      where: {
        teacherId: teacherProfile.id
      },
      include: {
        SessionStudent: {
          include: {
            User: true
          }
        }
      },
      orderBy: {
        startTime: 'desc'
      }
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId: session.user.id }
    })

    if (!teacherProfile) {
      return NextResponse.json({ error: 'Teacher profile not found' }, { status: 404 })
    }

    const { title, startTime, endTime } = await request.json()

    if (!title || !startTime || !endTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newSession = await prisma.session.create({
      data: {
        id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        teacherId: teacherProfile.id,
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: 'SCHEDULED'
      }
    })

    return NextResponse.json(newSession)
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
