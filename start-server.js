#!/usr/bin/env node

// Setup DATABASE_URL from AWS credentials before starting the server
const { spawn } = require('child_process');

// Check if DATABASE_URL is already set
if (!process.env.DATABASE_URL && !process.env.EXTERNAL_DATABASE_URL) {
  // Try to construct from AWS credentials
  const awsDbHost = process.env.AWS_DB_HOST;
  const awsDbPort = process.env.AWS_DB_PORT;
  const awsDbName = process.env.AWS_DB_NAME;
  const awsDbUser = process.env.AWS_DB_USER;
  const awsDbPassword = process.env.AWS_DB_PASSWORD;

  // Verify all AWS credentials are present
  if (awsDbHost && awsDbPort && awsDbName && awsDbUser && awsDbPassword) {
    const dbUrl = `postgresql://${awsDbUser}:${awsDbPassword}@${awsDbHost}:${awsDbPort}/${awsDbName}?schema=youspeak_exercisein`;
    process.env.DATABASE_URL = dbUrl;
    process.env.EXTERNAL_DATABASE_URL = dbUrl;

    console.log('✅ Database configured from AWS credentials:');
    console.log('   Host:', awsDbHost);
    console.log('   Port:', awsDbPort);
    console.log('   Database:', awsDbName);
    console.log('   User:', awsDbUser);
    console.log('');
  } else {
    console.error('❌ ERROR: No database configuration found!');
    console.error('Please set either:');
    console.error('  1. DATABASE_URL environment variable, or');
    console.error('  2. All AWS database credentials: AWS_DB_HOST, AWS_DB_PORT, AWS_DB_NAME, AWS_DB_USER, AWS_DB_PASSWORD');
    console.error('');
    process.exit(1);
  }
} else {
  console.log('✅ Database configured from DATABASE_URL');
  console.log('');
}

// Start the Next.js server
const server = spawn('node', ['server.js'], {
  stdio: 'inherit',
  env: process.env
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

// Handle termination signals
process.on('SIGTERM', () => {
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  server.kill('SIGINT');
});
