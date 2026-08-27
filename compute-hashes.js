const crypto = require('crypto');
const fs = require('fs');
const html = fs.readFileSync('dist/Aragorn7372/browser/index.html', 'utf-8');

const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let i = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  i++;
  const content = match[1];
  const normalized = content.replace(/\r\n?/g, '\n');
  const hash = crypto.createHash('sha256').update(normalized, 'utf-8').digest('base64');
  console.log('Script ' + i + ': sha256-' + hash);
  console.log('  Length: ' + normalized.length);
  console.log('  First 80: ' + JSON.stringify(normalized.substring(0, 80)));
  console.log('');
}
