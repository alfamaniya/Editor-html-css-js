#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const assert=(ok,message)=>{if(!ok)throw new Error(message)};
const read=path=>{const value=readFileSync(path,'utf8');assert(value.trim(),'فایل خالی است: '+path);return value};
function embedded(html,id){const start=html.indexOf('<template id="'+id+'">');assert(start>=0,'بستهٔ '+id+' پیدا نشد');const bodyStart=html.indexOf('>',start)+1,end=html.indexOf('</template>',bodyStart);assert(end>bodyStart,'بستهٔ '+id+' ناقص است');return Buffer.from(html.slice(bodyStart,end).trim(),'base64').toString('utf8')}
function assetReferences(markup){
 const refs=[],pattern=/<!--[\s\S]*?-->|<![^>]*>|<\/?([a-zA-Z][\w:.-]*)\b[^>]*>/g;
 let match;
 while((match=pattern.exec(markup))!==null){
  const tag=match[0];if(tag.startsWith('<!--')||tag.startsWith('<!'))continue;
  const name=match[1].toLowerCase(),closing=/^<\s*\//.test(tag);
  if(closing)continue;
  if(name==='script'||name==='style'){
   if(name==='script'){const src=tag.match(/\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);if(src)refs.push(src[1]||src[2]||src[3]);}
   const close=new RegExp('</\\s*'+name+'\\s*>','ig');close.lastIndex=pattern.lastIndex;
   const end=close.exec(markup);assert(end,'تگ '+name+' بسته نشده است.');pattern.lastIndex=end.index+end[0].length;continue;
  }
  if(name==='link'){const href=tag.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);if(href)refs.push(href[1]||href[2]||href[3]);}
 }
 return refs;
}
function checkDoc(html,label){
 assert(/<!doctype\s+html\s*>/i.test(html)&&/<html\b/i.test(html)&&/<head\b/i.test(html)&&/<body\b/i.test(html)&&/<\/body\s*>/i.test(html)&&/<\/html\s*>/i.test(html),'ساختار HTML ناقص: '+label);
 const refs=assetReferences(html);assert(refs.length===0,'ارجاع فایل جانبی باقی مانده است: '+refs.join(', '));
 for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){if(/\btype=["'](?:application\/json|application\/ld\+json)["']/i.test(m[1]))continue;const r=spawnSync(process.execPath,['--check'],{input:m[2],encoding:'utf8'});assert(r.status===0,'نحو JavaScript نامعتبر در '+label+': '+(r.stderr||r.stdout))}
}
try{
 const out=read('editor v.html'),a=embedded(out,'editor-document'),b=embedded(out,'visual-document');
 assert(out.includes('template.content.textContent.trim()'),'پوسته باید محتوای template را از content.textContent بخواند؛ textContent خود template خالی است.');
 if(existsSync('index-test-etitor.html'))assert(a===read('index-test-etitor.html'),'محتوای Editor جاسازی‌شده با منبع برابر نیست');
 if(existsSync('standalone-visual-editor.html'))assert(b===read('standalone-visual-editor.html'),'محتوای Visual Editor جاسازی‌شده با منبع برابر نیست');
 const count=(value,pattern)=>(value.match(pattern)||[]).length;
 assert(count(a,/data-bundled-from=/g)===23,'تعداد منابع جاسازی‌شدهٔ Editor برابر ۲۳ نیست');
 assert(count(b,/data-bundled-from=/g)===4,'تعداد منابع جاسازی‌شدهٔ Visual Editor برابر ۴ نیست');
 checkDoc(a,'Editor');checkDoc(b,'Visual Editor');
 assert(/id="editor-frame"/.test(out)&&/id="visual-frame"/.test(out),'هر دو محیط در خروجی وجود ندارند');
 assert(/data-target="editor"/.test(out)&&/data-target="visual"/.test(out),'ناوبری دو محیط ناقص است');
 for(const m of out.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)){const r=spawnSync(process.execPath,['--check'],{input:m[1],encoding:'utf8'});assert(r.status===0,'نحو پوسته نامعتبر است: '+(r.stderr||r.stdout))}
 console.log('اعتبارسنجی فایل یکپارچه موفق بود: دو سند کامل، تطابق دقیق منابع و نحو JavaScript بررسی شد');
}catch(e){console.error('اعتبارسنجی ناموفق بود:',e.message);process.exitCode=1}
