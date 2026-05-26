import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !['ADMIN', 'ASSISTANT'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || 'all';
  const page   = parseInt(searchParams.get('page') || '1');
  const limit  = 20;

  const where = status !== 'all' ? { status } : {};

  const [bookings, total, stats] = await Promise.all([
    prisma.trialBooking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.trialBooking.count({ where }),
    prisma.trialBooking.groupBy({ by: ['status'], _count: { id: true } }),
  ]);

  const statMap = Object.fromEntries(stats.map(s => [s.status, s._count.id]));

  return NextResponse.json({ bookings, total, page, pages: Math.ceil(total/limit), stats: statMap });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !['ADMIN', 'ASSISTANT'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, status, notes } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const updated = await prisma.trialBooking.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(notes  !== undefined ? { notes } : {}),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  await prisma.trialBooking.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
