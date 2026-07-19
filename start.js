const { execSync } = require('child_process');
const path = require('path');

const backendDir = path.join(__dirname, 'backend');

console.log('Installing backend dependencies...');
execSync('npm install', { cwd: backendDir, stdio: 'inherit' });

console.log('Starting backend server...');
require(path.join(backendDir, 'server.js'));
