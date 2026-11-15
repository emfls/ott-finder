(function(root){
  'use strict';
  // Intentionally empty: a public image URL is not a reproduction licence.
  // Add an asset only after documenting the verified grant and display scope.
  const manifest=Object.freeze({posters:Object.freeze({}),logos:Object.freeze({})});
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function allowed(asset,kind){
    return !!(asset&&asset.kind===kind&&asset.rightsStatus==='verified'&&
      asset.scope==='commercial-web-display'&&/^https:\/\//.test(asset.rightsEvidence||'')&&
      /^https:\/\//.test(asset.sourceUrl||'')&&/^\d{4}-\d{2}-\d{2}$/.test(asset.verifiedAt||'')&&
      typeof asset.credit==='string'&&asset.credit.trim()&&
      /^assets\/(?:posters|logos)\/[a-z0-9][a-z0-9._-]*\.(?:webp|png|jpg|jpeg|svg)$/.test(asset.src||''));
  }
  function render(t,assets=manifest){
    const poster=assets.posters&&assets.posters[t.id],logo=assets.logos&&assets.logos[t.provider];
    const hasPoster=allowed(poster,'poster'),hasLogo=allowed(logo,'logo');
    const past=t.evidence==='과거 발표';
    const badge=`<div class="source-badge"><small>${past?'과거 발표 출처':'공식 자료 출처'}</small>${hasLogo?`<img class="provider-logo" src="${esc(logo.src)}" alt="${esc(t.provider)}" width="92" height="30">`:`<b>${esc(t.provider)}</b>`}<small>현재 재생 미확인</small></div>`;
    const visual=hasPoster?`<img class="licensed-poster" src="${esc(poster.src)}" alt="${esc(t.title)} 공식 포스터" loading="lazy" decoding="async" width="400" height="600">`:`<span class="title-art" aria-hidden="true">${esc(t.mark)}</span>`;
    const credits=[];
    if(hasPoster)credits.push(`<a href="${esc(poster.sourceUrl)}" target="_blank" rel="noopener noreferrer">포스터 출처</a> · ${esc(poster.credit)}`);
    if(hasLogo)credits.push(`${esc(t.provider)} 로고: ${esc(logo.credit)}`);
    return `<div class="art ${esc(t.tone)}${hasPoster?' has-poster':''}">${visual}${badge}${!hasPoster?'<small class="poster-status">자체 타이포그래피 · 공식 포스터 아님</small>':''}</div>${credits.length?`<p class="media-credit">${credits.join('<br>')}</p>`:''}`;
  }
  const api=Object.freeze({manifest,allowed,render});
  root.OTTMedia=api;
  if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
