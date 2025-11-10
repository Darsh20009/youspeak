import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'ASSISTANT')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: subscriptionId } = await params

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: {
        package: true,
        user: true
      }
    })

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    if (subscription.paid) {
      return NextResponse.json({ error: 'Subscription already approved' }, { status: 400 })
    }

    const now = new Date()
    const endDate = new Date(now)
    endDate.setDate(endDate.getDate() + subscription.package.durationDays)

    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        paid: true,
        startDate: now,
        endDate: endDate
      }
    })

    await prisma.user.update({
      where: { id: subscription.studentId },
      data: { isActive: true }
    })

    await prisma.auditLog.create({
      data: {
        id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        action: 'Subscription approved',
        userId: session.user.id,
        details: `Approved subscription for ${subscription.user.name} - ${subscription.package.title} (${subscription.package.price} SAR)`
      }
    })

    return NextResponse.json(updatedSubscription)
  } catch (error) {
    console.error('Error approving subscription:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
