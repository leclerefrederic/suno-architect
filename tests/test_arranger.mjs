// Real browser interaction checks, using Chrome DevTools and Node's built-in APIs.
// Run: node tests/test_arranger.mjs. Override CHROME_PATH if needed.
import {spawn} from 'node:child_process';
import {mkdtemp,rm,mkdir,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const profile=await mkdtemp(resolve(tmpdir(),'suno-arranger-'));
const chrome=process.env.CHROME_PATH || (process.platform==='darwin'?'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome':'google-chrome');
const child=spawn(chrome,['--headless=new','--disable-gpu','--no-sandbox','--remote-debugging-pipe','--no-first-run','--no-default-browser-check',`--user-data-dir=${profile}`],{stdio:['ignore','ignore','pipe','pipe','pipe']});
let next=0,buffer='';const pending=new Map();
const abort=error=>{for(const p of pending.values())p.reject(error);pending.clear();};
child.on('error',abort);child.on('exit',()=>abort(new Error('Chrome exited')));
child.stdio[4].on('data',chunk=>{buffer+=chunk.toString();let end;while((end=buffer.indexOf('\0'))>=0){const message=JSON.parse(buffer.slice(0,end));buffer=buffer.slice(end+1);if(pending.has(message.id)){const p=pending.get(message.id);pending.delete(message.id);message.error?p.reject(new Error(JSON.stringify(message.error))):p.resolve(message.result);}}});
function send(method,params={},sessionId){return new Promise((resolve,reject)=>{const id=++next;const timer=setTimeout(()=>{pending.delete(id);reject(new Error('CDP timeout: '+method));},15000);pending.set(id,{resolve:v=>{clearTimeout(timer);resolve(v);},reject:e=>{clearTimeout(timer);reject(e);}});child.stdio[3].write(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})})+'\0');});}
try{
  await send('Browser.getVersion');
  const {targetId}=await send('Target.createTarget',{url:'about:blank'});
  const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});
  const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true},sessionId);if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  await send('Page.enable',{},sessionId);
  await send('Page.navigate',{url:pathToFileURL(resolve(root,'skills/suno-prompt-architect/assets/advanced-arranger.html')).href},sessionId);
  for(let i=0;i<100;i++){if(await evaluate('Boolean(document.querySelector("#sa-output")?.value)'))break;await new Promise(r=>setTimeout(r,50));}
  const result=await evaluate(`(async()=>{
    const results=[];const q=s=>document.querySelector(s);const all=s=>[...document.querySelectorAll(s)];
    const check=(name,ok)=>{if(!ok)throw new Error(name);results.push(name);};
    const blocks=()=>all('#sa-sequence .sa-block');const out=()=>q('#sa-output').value;
    const change=(e,v)=>{e.value=v;e.dispatchEvent(new Event('change',{bubbles:true}));};
    check('initial structure renders six blocks',blocks().length===6 && out().startsWith('[Instrumental]'));
    check('both Suno blocks render with separate budgets',q('#sa-style').value.length>0&&q('#sa-style-count').textContent.includes('1 000')&&q('#sa-count').textContent.includes('5 000'));
    const pick=blocks()[1].querySelector('.sa-pick');pick.focus();pick.click();check('keyboard focus survives section selection',document.activeElement.dataset.focus===blocks()[1].querySelector('.sa-pick').dataset.focus);
    check('generated instructions stay bracketed',out().split('\\n').filter(Boolean).every(s=>s.startsWith('[')&&s.endsWith(']')));
    q('#sa-palette').children[3].click();check('add drop updates Lyrics',blocks().length===7&&out().includes('[Drop:'));
    blocks().at(-1).querySelector('.sa-actions').children[0].click();check('move block earlier changes output order',out().indexOf('[Drop:')<out().indexOf('[Outro:'));
    blocks()[5].querySelector('.sa-actions').children[1].click();check('move block later changes output order',out().indexOf('[Drop:')>out().indexOf('[Outro:'));
    blocks().at(-1).querySelector('.sa-actions').children[2].click();check('remove drops updates preview',blocks().length===6&&!out().includes('[Drop:'));
    blocks()[3].querySelector('.sa-pick').click();change(all('#sa-editor select').at(-1),'guitar');check('solo instrument is transposed',out().includes('[Guitar Solo:'));
    const range=q('#sa-editor input');range.value=5;range.dispatchEvent(new Event('input',{bubbles:true}));range.dispatchEvent(new Event('change',{bubbles:true}));check('intensity changes cue',out().includes('[Guitar Solo: full high energy'));
    change(q('#sa-editor select'),'extended');check('relative duration updates cue',out().includes('extended section'));
    blocks().at(-1).querySelector('.sa-pick').click();change(all('#sa-editor select').at(-1),'loop');check('loop ending avoids a terminal hit',out().includes('no fade or final hit')&&!out().includes('resolve with a clear final phrase'));
    change(q('#sa-language'),'es');check('Spanish labels render',q('h2').textContent==='El mapa de tu tema');
    change(q('#sa-language'),'en');check('English labels render',q('#sa-copy').textContent==='Copy Lyrics');
    change(q('#sa-language'),'fr');change(q('#sa-preset'),'1');q('#sa-load').click();check('preset replaces arrangement',blocks().length===7&&out().includes('[Build:')&&out().includes('[Drop:'));
    while(blocks().length<16)q('#sa-palette').children[6].click();check('block cap disables additions',all('#sa-palette button').every(b=>b.disabled));
    check('maximum arrangement remains inside Lyrics budget',out().length<=5000&&!q('#sa-copy').disabled);
    const before=out();window.dispatchEvent(new CustomEvent('openai:set_globals',{detail:{globals:{widgetState:{modelContent:{arranger:{schema:1,locale:'xx',blocks:[]}}}}}}));check('invalid saved state ignored',out()===before);
    while(blocks().length)blocks()[0].querySelector('.sa-actions').children[2].click();check('empty state disables copy',out()===''&&q('#sa-copy').disabled&&q('#sa-editor').hidden);
    q('#sa-load').click();check('preset recovers empty state',out().length>0&&!q('#sa-copy').disabled);
    const saved={schema:1,locale:'fr',blocks:[{type:'solo',energy:2,length:'short',lead:'piano',ending:'resolve'}]};
    window.dispatchEvent(new CustomEvent('openai:set_globals',{detail:{globals:{widgetState:{modelContent:{arranger:saved}}}}}));check('valid host state restores selection and Lyrics',blocks().length===1&&out().includes('[Piano Solo:'));
    change(q('#sa-preset'),'0');q('#sa-load').click();
    let copied='';Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{copied=value;}}});q('#sa-copy').click();await new Promise(r=>setTimeout(r,0));check('copy passes exact Lyrics to clipboard API',copied===out()&&q('#sa-status').textContent==='Lyrics copiés.');
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied');}}});q('#sa-copy').click();await new Promise(r=>setTimeout(r,0));check('denied clipboard selects output for manual copy',q('#sa-output').selectionEnd===out().length&&q('#sa-status').textContent.includes('Ctrl/Cmd+C'));
    let snapshot;window.openai={setWidgetState:async value=>{snapshot=value;}};q('#sa-palette').children[2].click();check('host handoff includes current state and Lyrics',snapshot.modelContent.lyrics===out()&&snapshot.modelContent.arranger.blocks.length===7);
    const editStyle=value=>{q('#sa-style').value=value;q('#sa-style').dispatchEvent(new Event('input',{bubbles:true}));};
    const musicalStyle='Instrumental jazz-funk, warm Rhodes, dry drums and bass. No vocals.';editStyle(musicalStyle);const lyricsBefore=out();
    check('description editing does not rewrite Lyrics',out()===lyricsBefore&&snapshot.modelContent.style===musicalStyle&&snapshot.modelContent.arranger.schema===2);
    q('#sa-palette').children[2].click();check('arrangement edits preserve description',q('#sa-style').value===musicalStyle);
    q('#sa-load').click();check('preset preserves description',q('#sa-style').value===musicalStyle);
    editStyle('x'.repeat(1000));check('description accepts exact limit',!q('#sa-copy-style').disabled);
    editStyle('x'.repeat(1001));check('description overflow blocks only description copy',q('#sa-copy-style').disabled&&!q('#sa-copy').disabled&&q('#sa-style-error').textContent.length>0&&q('#sa-style').value.length===1001);
    editStyle('🎷'.repeat(501));check('description counts UTF16 units conservatively',q('#sa-copy-style').disabled);
    editStyle('');check('empty description leaves Lyrics usable',q('#sa-copy-style').disabled&&!q('#sa-copy').disabled);
    editStyle(musicalStyle);let styleCopied='';Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{styleCopied=value;}}});q('#sa-copy-style').click();await new Promise(r=>setTimeout(r,0));check('description copy uses exact independent field',styleCopied===musicalStyle);
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied');}}});q('#sa-copy-style').click();await new Promise(r=>setTimeout(r,0));check('description copy denial selects description',q('#sa-style').selectionEnd===musicalStyle.length&&q('#sa-style-status').textContent.includes('Ctrl/Cmd+C'));
    window.dispatchEvent(new CustomEvent('openai:set_globals',{detail:{globals:{widgetState:{modelContent:{arranger:{...saved,schema:2,style:'Warm instrumental soul.'}}}}}}));check('new saved state restores both blocks',q('#sa-style').value==='Warm instrumental soul.'&&out().includes('[Piano Solo:'));
    window.dispatchEvent(new CustomEvent('openai:set_globals',{detail:{globals:{widgetState:{modelContent:{arranger:saved}}}}}));check('old saved state preserves current description',q('#sa-style').value==='Warm instrumental soul.');
    change(q('#sa-preset'),'0');q('#sa-load').click();q('#sa-output').blur();
    return results;
  })()`);
  for(const name of result)console.log('PASS',name);
  await mkdir(resolve(root,'work'),{recursive:true});
  for(const width of [736,320]){
    await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false},sessionId);
    const overflow=await evaluate('document.documentElement.scrollWidth > innerWidth');assert.equal(overflow,false,`Overflow at ${width}px`);
    const {data}=await send('Page.captureScreenshot',{captureBeyondViewport:true},sessionId);
    await writeFile(resolve(root,`work/arranger-${width}.png`),Buffer.from(data,'base64'));
    console.log('PASS responsive layout',width);
  }
  await writeFile(resolve(root,'work/arranger-test-results.json'),JSON.stringify({passed:result.length+2,checks:result},null,2));
}finally{if(child.exitCode===null&&child.signalCode===null){const stopped=new Promise(r=>child.once('exit',r));child.kill('SIGTERM');await stopped;}await rm(profile,{recursive:true,force:true,maxRetries:3});}
