const fs=require('fs'),assert=require('node:assert/strict');const html=fs.readFileSync('index.html','utf8');
assert.match(html,/class="screening-art"/,'original screening-frame visual exists');
assert.match(html,/class="skip" href="#catalogue"/,'skip link targets catalogue');
assert.match(html,/style-20261115-cinema.css/,'immutable stylesheet referenced');
for(const id of ['query','provider','type','category','evidence','mode','savedOnly','reset','emptyReset','backup-export','backup-import','backup-file'])assert.match(html,new RegExp('id="'+id+'"'));
assert.match(html,/noindex,follow/);for(const file of ['data','backup','app'])assert.match(html,new RegExp(file+'-20261115-v2.js'));
console.log('PASS: cinema design, skip link, immutable assets and all original controls');
