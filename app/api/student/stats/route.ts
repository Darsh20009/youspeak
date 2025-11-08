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

    const userId = session.user.id

    const [wordsCount, sessionsCount, activeSubscription] = await Promise.all([
      prisma.word.count({
        where: { studentId: userId }
      }),
      prisma.sessionStudent.count({
        where: { studentId: userId, attended: true }
      }),
      prisma.subscription.findFirst({
        where: {
          studentId: userId,
          paid: true,
          endDate: { gte: new Date() }
        },
        include: { package: true }
      })
    ])

    // Count pending assignments: assignments for sessions the student is enrolled in that have no submission
    const studentAssignments = await prisma.assignment.findMany({
      where: {
        session: {
          students: {
            some: { studentId: userId }
          }
        }
      },
      include: {
        submissions: {
          where: { studentId: userId }
        }
      }
    })
    
    const pendingAssignments = studentAssignments.filter(a => a.submissions.length === 0).length

    const nextSession = await prisma.sessionStudent.findFirst({
      where: {
        studentId: userId,
        session: {
          startTime: { gte: new Date() },
          status: 'SCHEDULED'
        }
      },
      include: {
        session: {
          include: {
            teacher: {
              include: { user: true }
            }
          }
        }
      },
      orderBy: {
        session: { startTime: 'asc' }
      }
    })

    return NextResponse.json({
      wordsLearned: wordsCount,
      sessionsAttended: sessionsCount,
      pendingAssignments,
      activeSubscription: activeSubscription ? {
        packageTitle: activeSubscription.package.title,
        endDate: activeSubscription.endDate
      } : null,
      nextSession: nextSession ? {
        id: nextSession.session.id,
        title: nextSession.session.title,
        startTime: nextSession.session.startTime,
        endTime: nextSession.session.endTime,
        teacherName: nextSession.session.teacher.user.name
      } : null
    })
  } catch (error) {
    console.error('Error fetching student stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
