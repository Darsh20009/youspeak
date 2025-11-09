import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const databaseUrl = process.env.EXTERNAL_DATABASE_URL || process.env.DATABASE_URL || ''

if (!databaseUrl) {
  throw new Error('EXTERNAL_DATABASE_URL or DATABASE_URL must be set')
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl
      }
    },
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
