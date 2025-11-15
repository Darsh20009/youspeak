import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, isNextResponse } from '@/lib/auth-helpers'

export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (isNextResponse(admin)) return admin

    const teachers = await prisma.teacherProfile.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        User: {
          name: 'asc'
        }
      }
    })

    return NextResponse.json(teachers)
  } catch (error) {
    console.error('Error fetching teachers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
