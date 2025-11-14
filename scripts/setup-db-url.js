// This script sets up DATABASE_URL from AWS credentials
const fs = require('fs');

const dbUrl = `postgresql://${process.env.AWS_DB_USER}:${process.env.AWS_DB_PASSWORD}@${process.env.AWS_DB_HOST}:${process.env.AWS_DB_PORT}/${process.env.AWS_DB_NAME}?schema=youspeak_exercisein`;

console.log('Database URL configured successfully');
console.log('Host:', process.env.AWS_DB_HOST);
console.log('Database:', process.env.AWS_DB_NAME);

// Export DATABASE_URL for Prisma
process.env.DATABASE_URL = dbUrl;
