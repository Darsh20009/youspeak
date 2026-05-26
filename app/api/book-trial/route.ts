import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, fromLevel, toLevel, plan, price } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    await prisma.trialBooking.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        fromLevel: fromLevel || '',
        toLevel: toLevel || '',
        plan: plan || 'bundle',
        price: price ? Number(price) : null,
        status: 'NEW',
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('book-trial error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
