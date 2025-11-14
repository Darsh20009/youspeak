#!/usr/bin/env node

// Setup DATABASE_URL from AWS credentials before starting the server
const { spawn } = require('child_process');

// Construct DATABASE_URL from AWS environment variables
const dbUrl = `postgresql://${process.env.AWS_DB_USER}:${process.env.AWS_DB_PASSWORD}@${process.env.AWS_DB_HOST}:${process.env.AWS_DB_PORT}/${process.env.AWS_DB_NAME}?schema=youspeak_exercisein`;

// Set DATABASE_URL for this process and all child processes
process.env.DATABASE_URL = dbUrl;
process.env.EXTERNAL_DATABASE_URL = dbUrl;

console.log('✅ Database configured:');
console.log('   Host:', process.env.AWS_DB_HOST);
console.log('   Port:', process.env.AWS_DB_PORT);
console.log('   Database:', process.env.AWS_DB_NAME);
console.log('   User:', process.env.AWS_DB_USER);
console.log('');

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
