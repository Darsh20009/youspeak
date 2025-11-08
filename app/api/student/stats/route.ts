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

    let activeSubDetails = null
    if (activeSubscription) {
      const attendedSessions = await prisma.sessionStudent.count({
        where: {
          studentId: userId,
          attended: true,
          session: {
            createdAt: {
              gte: activeSubscription.startDate || new Date()
            }
          }
        }
      })
      
      const daysRemaining = activeSubscription.endDate 
        ? Math.ceil((new Date(activeSubscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : 0
      
      activeSubDetails = {
        packageTitle: activeSubscription.package.title,
        packageTitleAr: activeSubscription.package.titleAr,
        startDate: activeSubscription.startDate,
        endDate: activeSubscription.endDate,
        lessonsTotal: activeSubscription.package.lessonsCount,
        lessonsRemaining: Math.max(0, activeSubscription.package.lessonsCount - attendedSessions),
        daysRemaining: Math.max(0, daysRemaining)
      }
    }

    return NextResponse.json({
      wordsLearned: wordsCount,
      sessionsAttended: sessionsCount,
      pendingAssignments,
      activeSubscription: activeSubDetails,
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
