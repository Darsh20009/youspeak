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

    if (!session || session.user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId: session.user.id }
    })

    if (!teacherProfile) {
      return NextResponse.json({ error: 'Teacher profile not found' }, { status: 404 })
    }

    const sessionData = await prisma.session.findFirst({
      where: {
        id: params.id,
        teacherId: teacherProfile.id
      },
      include: {
        teacher: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        students: {
          include: {
            student: {
              select: {
                name: true,
                email: true
              }
            }
          }
        }
      }
    })

    if (!sessionData) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    return NextResponse.json({
      ...sessionData,
      teacher: {
        name: sessionData.teacher.user.name
      }
    })
  } catch (error) {
    console.error('Error fetching session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
