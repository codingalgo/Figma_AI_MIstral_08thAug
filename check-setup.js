// Setup verification script for local PC
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking DA Auto Test Generator Setup...\n');

// Check if essential files exist
const requiredFiles = [
  'figma-exporter.html',
  'electron-main.js', 
  'electron-preload.js',
  'package.json'
];

const missingFiles = [];
const foundFiles = [];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    foundFiles.push(file);
    console.log('✅', file, 'found');
  } else {
    missingFiles.push(file);
    console.log('❌', file, 'MISSING');
  }
});

console.log('\n📦 Checking package.json dependencies...');

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['electron', 'express'];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log('✅', dep, 'listed in dependencies');
    } else {
      console.log('❌', dep, 'missing from dependencies');
    }
  });
} catch (error) {
  console.log('❌ Cannot read package.json:', error.message);
}

console.log('\n🔍 Checking node_modules...');
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules folder exists');
  
  // Check key modules
  const keyModules = ['electron', 'express'];
  keyModules.forEach(mod => {
    if (fs.existsSync(path.join('node_modules', mod))) {
      console.log('✅', mod, 'installed');
    } else {
      console.log('❌', mod, 'not installed');
    }
  });
} else {
  console.log('❌ node_modules folder missing - run npm install');
}

console.log('\n📋 Summary:');
if (missingFiles.length === 0) {
  console.log('✅ All required files present');
} else {
  console.log('❌ Missing files:', missingFiles.join(', '));
}

console.log('\n🚀 To fix any issues:');
console.log('1. Make sure all project files are in the same folder');
console.log('2. Run: npm install');
console.log('3. Run: npx electron .');
console.log('\nOr just double-click start-desktop.bat');