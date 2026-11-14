function validateBackup(data,app,ids){
 if(!data||typeof data!=='object'||Array.isArray(data)||data.app!==app||data.version!==1)throw Error('이 사이트의 버전 1 백업 파일이 아닙니다.');
 const keys=Object.keys(data);if(keys.some(k=>!['app','version','favorites','personal','exportedAt'].includes(k)))throw Error('알 수 없는 데이터 항목이 있습니다.');
 if(!Array.isArray(data.favorites)||data.favorites.length>ids.length||data.favorites.some(id=>typeof id!=='string'||!ids.includes(id))||new Set(data.favorites).size!==data.favorites.length)throw Error('보관함 항목이 올바르지 않습니다.');
 const result={favorites:[...data.favorites],personal:{}};
 if(app==='gyeol-music'){
  if(!data.personal||typeof data.personal!=='object'||Array.isArray(data.personal))throw Error('개인 태그 형식이 올바르지 않습니다.');
  for(const [id,tags] of Object.entries(data.personal)){if(!ids.includes(id)||!Array.isArray(tags)||tags.length>10||tags.some(t=>typeof t!=='string'||!t.trim()||t.length>20||t!==t.trim()||/[\u0000-\u001f\u007f]/.test(t))||new Set(tags).size!==tags.length)throw Error('개인 태그 내용이 올바르지 않습니다.');result.personal[id]=[...tags];}
 }else if(data.personal!==undefined)throw Error('OTT 백업에는 개인 태그가 없어야 합니다.');
 return result;
}
function wireBackup({app,ids,getData,restore}){
 const status=document.getElementById('backup-status'),file=document.getElementById('backup-file');
 document.getElementById('backup-export').onclick=()=>{const data={app,version:1,exportedAt:new Date().toISOString(),...getData()};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=app+'-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='다운로드를 요청했습니다. 파일이 저장되었는지 확인하세요. 외부로 업로드하지 않았습니다.';};
 document.getElementById('backup-import').onclick=()=>file.click();
 file.onchange=async()=>{const f=file.files[0];if(!f)return;try{if(f.size>131072)throw Error('128KB 이하의 JSON 파일만 가져올 수 있습니다.');const next=validateBackup(JSON.parse(await f.text()),app,ids);if(!confirm('기존 보관함'+(app==='gyeol-music'?'과 개인 태그':'')+'을 이 파일 내용으로 교체할까요? 먼저 현재 데이터를 백업하는 것이 좋습니다.')){status.textContent='복원을 취소했습니다. 기존 데이터는 그대로입니다.';return;}const durable=restore(next);status.textContent=durable?'복원하고 이 브라우저에 저장했습니다.':'화면에 복원했지만 브라우저 저장이 차단되었습니다. 백업 파일을 보관하세요.';}catch(e){status.textContent='복원하지 않았습니다. 기존 데이터는 그대로입니다. '+(e instanceof SyntaxError?'올바른 JSON 파일이 아닙니다.':e.message);}finally{file.value='';}};
}
if(typeof module!=='undefined')module.exports={validateBackup};
