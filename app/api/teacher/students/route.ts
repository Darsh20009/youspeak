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

    const studentEnrollments = await prisma.sessionStudent.findMany({
      where: {
        Session: {
          teacherId: teacherProfile.id
        }
      },
      include: {
        User: {
          include: {
            StudentProfile: true
          }
        }
      }
    })

    const uniqueStudents = new Map()
    for (const enrollment of studentEnrollments) {
      if (!uniqueStudents.has(enrollment.studentId)) {
        const [sessionsCount, wordsCount] = await Promise.all([
          prisma.sessionStudent.count({
            where: {
              studentId: enrollment.studentId,
              Session: { teacherId: teacherProfile.id }
            }
          }),
          prisma.word.count({
            where: { studentId: enrollment.studentId }
          })
        ])

        uniqueStudents.set(enrollment.studentId, {
          id: enrollment.User.id,
          name: enrollment.User.name,
          email: enrollment.User.email,
          phone: enrollment.User.phone,
          isActive: enrollment.User.isActive,
          studentProfile: {
            levelCurrent: enrollment.User.StudentProfile?.levelCurrent,
            sessionsAttended: 0
          },
          sessionsCount,
          wordsCount
        })
      }
    }

    return NextResponse.json(Array.from(uniqueStudents.values()))
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
