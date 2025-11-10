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

    const assignments = await prisma.assignment.findMany({
      where: {
        Session: {
          SessionStudent: {
            some: { studentId: session.user.id }
          }
        }
      },
      include: {
        Session: true,
        Submission: {
          where: { studentId: session.user.id }
        }
      },
      orderBy: { dueDate: 'desc' }
    })

    return NextResponse.json(assignments)
  } catch (error) {
    console.error('Error fetching assignments:', error)
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
    const { assignmentId, textAnswer, attachedFiles } = body

    if (!assignmentId || !textAnswer) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify the student is enrolled in the session that owns this assignment
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        Session: {
          include: {
            SessionStudent: {
              where: { studentId: session.user.id }
            }
          }
        }
      }
    })

    if (!assignment || !assignment.Session) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
    }

    if (assignment.Session.SessionStudent.length === 0) {
      return NextResponse.json({ error: 'You are not enrolled in this session' }, { status: 403 })
    }

    // Check if student has already submitted this assignment
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        assignmentId,
        studentId: session.user.id
      }
    })

    if (existingSubmission) {
      return NextResponse.json({ error: 'You have already submitted this assignment' }, { status: 400 })
    }

    const submission = await prisma.submission.create({
      data: {
        id: `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        assignmentId,
        studentId: session.user.id,
        textAnswer,
        attachedFiles: attachedFiles || null
      }
    })

    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
