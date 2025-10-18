/*
 Lightweight lint script:
 - Checks for common files and warns if missing.
 - Does not require ESLint to be installed; keeps project lightweight.
*/
const fs = require('fs');
const files = ['package.json','next.config.js','src/app/page.js','src/globals.css'];
let ok = true;
files.forEach(f=>{
  if(!fs.existsSync(f)){ console.warn('⚠️ Missing', f); ok=false; }
});
if(!ok){ console.log('\nLint: issues found.'); process.exit(1); }
console.log('Lint: basic checks passed.'); process.exit(0);
