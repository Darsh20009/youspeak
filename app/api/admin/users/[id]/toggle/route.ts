import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'ASSISTANT')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = params.id

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.role === 'ADMIN') {
      return NextResponse.json({ error: 'Cannot modify admin users' }, { status: 403 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive }
    })

    await prisma.auditLog.create({
      data: {
        id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        action: `User ${updatedUser.isActive ? 'activated' : 'deactivated'}`,
        userId: session.user.id,
        details: `${user.name} (${user.email}) was ${updatedUser.isActive ? 'activated' : 'deactivated'}`
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error toggling user status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
