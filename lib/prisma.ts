import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL || process.env.EXTERNAL_DATABASE_URL;
  
  if (!url) {
    const awsDbHost = process.env.AWS_DB_HOST;
    const awsDbPort = process.env.AWS_DB_PORT;
    const awsDbName = process.env.AWS_DB_NAME;
    const awsDbUser = process.env.AWS_DB_USER;
    const awsDbPassword = process.env.AWS_DB_PASSWORD;
    
    if (awsDbHost && awsDbPort && awsDbName && awsDbUser && awsDbPassword) {
      return `postgresql://${awsDbUser}:${awsDbPassword}@${awsDbHost}:${awsDbPort}/${awsDbName}?schema=youspeak_exercisein`;
    }
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL is required in production. Set DATABASE_URL or all AWS_DB_* variables.');
    }
    
    return 'postgresql://user:password@localhost:5432/db?schema=youspeak_exercisein';
  }
  
  return url;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
