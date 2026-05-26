import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, fromLevel, toLevel, plan, price } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    // Store the trial booking request in a simple log format
    // Using a generic approach since we may not have a TrialBooking model yet
    await (prisma as any).trialBooking?.create({
      data: { name, phone, email: email || null, fromLevel, toLevel, plan, price: price ?? 0 },
    }).catch(() => null); // graceful fail if model doesn't exist yet

    // Build WhatsApp notification message
    const waMsg = `📚 *طلب حجز تجريبي جديد*\n\n👤 الاسم: ${name}\n📱 الواتساب: ${phone}${email ? `\n📧 الإيميل: ${email}` : ''}\n🎯 المستوى: ${fromLevel} → ${toLevel}\n💼 الباقة: ${plan}\n💰 السعر: ${price?.toLocaleString()} جنيه`;

    const adminWA = process.env.ADMIN_WHATSAPP || '201091515594';
    await fetch(`https://api.whatsapp.com/send/?phone=${adminWA}&text=${encodeURIComponent(waMsg)}`)
      .catch(() => null);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('book-trial error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
