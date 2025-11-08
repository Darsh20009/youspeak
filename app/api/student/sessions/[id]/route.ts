import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionData = await prisma.session.findFirst({
      where: {
        id: params.id,
        enrollments: {
          some: {
            studentId: session.user.id
          }
        }
      },
      include: {
        teacher: {
          select: {
            name: true
          }
        }
      }
    })

    if (!sessionData) {
      return NextResponse.json({ error: 'Session not found or not enrolled' }, { status: 404 })
    }

    return NextResponse.json(sessionData)
  } catch (error) {
    console.error('Error fetching session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
