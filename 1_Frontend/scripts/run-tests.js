/*
 Lightweight test runner:
 - Ensures pages build-ready files exist.
 - Simple JSON parse test for src/data files.
*/
const fs = require('fs');
function checkFile(p){ if(!fs.existsSync(p)){ console.error('Missing',p); process.exit(1); } }
try{
  checkFile('src/data/projects.json');
  checkFile('src/data/leaderboard.json');
  JSON.parse(fs.readFileSync('src/data/projects.json','utf8'));
  JSON.parse(fs.readFileSync('src/data/leaderboard.json','utf8'));
  console.log('Tests: basic JSON and file checks passed.');
  process.exit(0);
}catch(e){
  console.error('Tests failed:', e.message);
  process.exit(1);
}
