import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, parseJsonBody, isNextResponse } from '@/lib/auth-helpers'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin()
    if (isNextResponse(admin)) return admin

    const { id } = await params

    const subscription = await prisma.subscription.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        package: true
      }
    })

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    return NextResponse.json(subscription)
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin()
    if (isNextResponse(admin)) return admin

    const { id } = await params

    const body = await parseJsonBody<{
      paid?: boolean
      receiptUrl?: string
      startDate?: string
      endDate?: string
    }>(request)
    if (isNextResponse(body)) return body

    const { paid, receiptUrl, startDate, endDate } = body

    const existingSubscription = await prisma.subscription.findUnique({
      where: { id }
    })

    if (!existingSubscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    const updateData: any = {}
    if (paid !== undefined) updateData.paid = paid
    if (receiptUrl !== undefined) updateData.receiptUrl = receiptUrl
    if (startDate !== undefined) updateData.startDate = startDate ? new Date(startDate) : null
    if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null
    updateData.updatedAt = new Date()

    const updatedSubscription = await prisma.subscription.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        package: true
      }
    })

    return NextResponse.json(updatedSubscription)
  } catch (error) {
    console.error('Error updating subscription:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin()
    if (isNextResponse(admin)) return admin

    const { id } = await params

    const existingSubscription = await prisma.subscription.findUnique({
      where: { id }
    })

    if (!existingSubscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    await prisma.subscription.delete({
      where: { id }
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting subscription:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
