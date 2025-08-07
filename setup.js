#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up ChatApp...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Check if npm is installed
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' });
  console.log(`✅ npm version: ${npmVersion.trim()}`);
} catch (error) {
  console.error('❌ npm is not installed. Please install npm first.');
  process.exit(1);
}

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed successfully!');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies.');
  process.exit(1);
}

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, 'backend') });
  console.log('✅ Backend dependencies installed successfully!');
} catch (error) {
  console.error('❌ Failed to install backend dependencies.');
  process.exit(1);
}

// Check if assets directory exists
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.log('\n📁 Creating assets directory...');
  fs.mkdirSync(assetsDir, { recursive: true });
  console.log('✅ Assets directory created!');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Start the backend servers: npm run dev');
console.log('2. Start the React Native app: npm start');
console.log('3. Run on your device or simulator');
console.log('\n📖 For more information, see README.md'); 