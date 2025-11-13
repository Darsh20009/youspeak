import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireTeacher, parseJsonBody, isNextResponse } from '@/lib/auth-helpers'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const teacher = await requireTeacher()
    if (isNextResponse(teacher)) return teacher

    const { id } = await params

    const sessionData = await prisma.session.findFirst({
      where: {
        id,
        teacherId: teacher.teacherProfileId
      },
      include: {
        TeacherProfile: {
          include: {
            User: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        SessionStudent: {
          include: {
            User: {
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
        name: sessionData.TeacherProfile.User.name
      }
    })
  } catch (error) {
    console.error('Error fetching session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const teacher = await requireTeacher()
    if (isNextResponse(teacher)) return teacher

    const { id } = await params
    
    const body = await parseJsonBody<{ title?: string; startTime?: string; endTime?: string; status?: string }>(request)
    if (isNextResponse(body)) return body

    const { title, startTime, endTime, status } = body

    const existingSession = await prisma.session.findUnique({
      where: { id }
    })

    if (!existingSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (existingSession.teacherId !== teacher.teacherProfileId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (startTime !== undefined) updateData.startTime = new Date(startTime)
    if (endTime !== undefined) updateData.endTime = new Date(endTime)
    if (status !== undefined) updateData.status = status
    updateData.updatedAt = new Date()

    const updatedSession = await prisma.session.update({
      where: { id },
      data: updateData,
      include: {
        SessionStudent: {
          include: {
            User: true
          }
        }
      }
    })

    return NextResponse.json(updatedSession)
  } catch (error) {
    console.error('Error updating session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const teacher = await requireTeacher()
    if (isNextResponse(teacher)) return teacher

    const { id } = await params

    const existingSession = await prisma.session.findUnique({
      where: { id }
    })

    if (!existingSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (existingSession.teacherId !== teacher.teacherProfileId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.session.delete({
      where: { id }
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
