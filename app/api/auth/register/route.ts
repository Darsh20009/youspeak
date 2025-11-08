import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10),
  age: z.number().min(5).max(100),
  levelInitial: z.enum(['A1', 'A2', 'B1', 'B2']),
  goal: z.string().min(1),
  preferredTime: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        passwordHash: hashedPassword,
        phone: validatedData.phone,
        role: 'STUDENT',
        isActive: false,
        studentProfile: {
          create: {
            age: validatedData.age,
            levelInitial: validatedData.levelInitial,
            goal: validatedData.goal,
            preferredTime: validatedData.preferredTime,
          },
        },
      },
      include: {
        studentProfile: true,
      },
    })

    await prisma.auditLog.create({
      data: {
        action: 'USER_REGISTERED',
        userId: user.id,
        details: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
        }),
      },
    })

    return NextResponse.json({
      message: 'Registration successful. Your account is pending activation.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
