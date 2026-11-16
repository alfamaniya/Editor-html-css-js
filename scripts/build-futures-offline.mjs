#!/usr/bin/env node
/**
 * Recursive, dependency-free offline builder for the complete futures/ directory.
 * Output: futures/offline-dashboard-futures.html
 */
import { readdir, readFile, writeFile, rename, rm } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE = path.resolve(ROOT, "futures");
const OUTPUT = path.join(SOURCE, "offline-dashboard-futures.html");
const TEMP = OUTPUT + ".tmp";
const OUTPUT_REL = "offline-dashboard-futures.html";
const MIME = {
  ".html":"text/html",".htm":"text/html",".css":"text/css",".js":"text/javascript",
  ".mjs":"text/javascript",".json":"application/json",".svg":"image/svg+xml",
  ".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".gif":"image/gif",
  ".webp":"image/webp",".ico":"image/x-icon",".woff":"font/woff",".woff2":"font/woff2",
  ".ttf":"font/ttf",".otf":"font/otf",".mp3":"audio/mpeg",".mp4":"video/mp4",
  ".webm":"video/webm",".wav":"audio/wav",".txt":"text/plain",".xml":"application/xml"
};
const IGNORE_DIRS = new Set(["node_modules",".git",".cache"]);
const warnings = [];
const sources = new Map();
const toPosix = value => value.split(path.sep).join("/");
const esc = value => value.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const escScript = value => value.replace(/<\/script/gi,"<\\/script");
const mime = file => MIME[path.extname(file).toLowerCase()] || "application/octet-stream";

async function walk(dir, prefix) {
  const entries = await readdir(dir,{withFileTypes:true});
  const result = [];
  for (const entry of entries.sort((a,b)=>a.name.localeCompare(b.name))) {
    if (entry.isDirectory() && IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir,entry.name);
    const rel = prefix ? prefix + "/" + entry.name : entry.name;
    if (entry.isDirectory()) result.push(...await walk(full,rel));
    else if (entry.isFile() && rel !== OUTPUT_REL && !rel.endsWith(".tmp")) result.push({full,rel});
  }
  return result;
}
function category(rel) {
  const ext = path.extname(rel).toLowerCase();
  if (/(^|\/)(core|vendor|codemirror|lib)(\/|$)/i.test(rel)) return "Libraries";
  if ([".css",".scss",".less"].includes(ext)) return "Stylesheets";
  if ([".js",".mjs",".cjs"].includes(ext)) return "JavaScript";
  if ([".png",".jpg",".jpeg",".gif",".webp",".svg",".ico",".woff",".woff2",".ttf",".otf",".mp3",".mp4",".webm",".wav"].includes(ext)) return "Assets";
  if ([".html",".htm"].includes(ext)) return "HTML components";
  if ([".json",".xml",".txt",".md",".yml",".yaml"].includes(ext)) return "Data and documentation";
  return "Other project files";
}
function localPath(raw, baseDir) {
  const clean = raw.trim().replace(/^['"]|['"]$/g,"");
  if (!clean || /^(?:[a-z]+:|\/\/|#|data:|blob:)/i.test(clean)) return null;
  const rawPath = clean.split(/[?#]/,1)[0];
  let decoded = rawPath;
  try { decoded = decodeURIComponent(rawPath); } catch {}
  const full = path.resolve(baseDir,decoded);
  if (full !== SOURCE && !full.startsWith(SOURCE + path.sep)) return null;
  return full;
}
async function assetData(raw, baseDir) {
  const full = localPath(raw,baseDir);
  if (!full) return null;
  try {
    const bytes = await readFile(full);
    return "data:" + mime(full) + ";base64," + bytes.toString("base64");
  } catch {
    warnings.push("Missing local asset: " + toPosix(path.relative(SOURCE,full)));
    return null;
  }
}
async function inlineCss(css,cssDir,seen) {
  seen = seen || new Set();
  const imports = [...css.matchAll(/@import\s+(?:url\()?["']?([^"')\s;]+)["']?\)?\s*;/gi)];
  for (const match of imports.reverse()) {
    const full = localPath(match[1],cssDir);
    const bytes = full && sources.get(full);
    if (bytes && !seen.has(full)) {
      seen.add(full);
      const nested = await inlineCss(bytes.toString("utf8"),path.dirname(full),seen);
      css = css.slice(0,match.index) + "\n" + nested + "\n" + css.slice(match.index+match[0].length);
    } else {
      if (!/^(?:[a-z]+:|\/\/)/i.test(match[1])) warnings.push("CSS import not bundled: " + match[1]);
      css = css.slice(0,match.index) + css.slice(match.index+match[0].length);
    }
  }
  const urls = [...css.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)];
  for (const match of urls.reverse()) {
    const ref = match[2].trim();
    if (!ref || /^(?:[a-z]+:|\/\/|#|data:|blob:)/i.test(ref)) continue;
    const uri = await assetData(ref,cssDir);
    if (uri) css = css.slice(0,match.index) + 'url("' + uri + '")' + css.slice(match.index+match[0].length);
  }
  return css;
}

async function main() {
  const files = await walk(SOURCE,"");
  for (const file of files) sources.set(file.full,await readFile(file.full));
  const entry = path.join(SOURCE,"index.html");
  const entryBytes = sources.get(entry);
  if (!entryBytes) throw new Error("Required entry point futures/index.html was not found.");
  let html = entryBytes.toString("utf8");
  if (!/<!doctype\s+html/i.test(html) || !/<\/body\s*>/i.test(html)) throw new Error("futures/index.html is not a complete HTML document.");

  // Replace local stylesheet links with embedded styles in their original order.
  const linkRe = /<link\b([^>]*?)href\s*=\s*(["'])(.*?)\2([^>]*)>/gi;
  const links = [...html.matchAll(linkRe)];
  for (const match of links.reverse()) {
    if (!/stylesheet/i.test(match[1] + match[4])) continue;
    const full = localPath(match[3],SOURCE);
    if (!full) continue;
    const bytes = sources.get(full);
    if (!bytes) { warnings.push("Stylesheet not found: " + match[3]); continue; }
    const css = await inlineCss(bytes.toString("utf8"),path.dirname(full),new Set([full]));
    const tag = '<style data-bundled-from="' + esc(toPosix(path.relative(SOURCE,full))) + '">\n' + css.replace(/<\/style/gi,"<\\/style") + "\n</style>";
    html = html.slice(0,match.index) + tag + html.slice(match.index+match[0].length);
  }

  // Inline local classic scripts, preserving their execution order.
  const scriptRe = /<script\b([^>]*?)src\s*=\s*(["'])(.*?)\2([^>]*)>\s*<\/script\s*>/gi;
  const scripts = [...html.matchAll(scriptRe)];
  for (const match of scripts.reverse()) {
    const ref = match[3];
    const attrs = match[1] + " " + match[4];
    if (/^(?:[a-z]+:|\/\/)/i.test(ref)) {
      warnings.push("External script remains network-dependent: " + ref);
      continue;
    }
    if (/\btype\s*=\s*["']module["']/i.test(attrs)) {
      warnings.push("Module script needs a module-aware bundler: " + ref);
      continue;
    }
    const full = localPath(ref,SOURCE);
    const bytes = full && sources.get(full);
    if (!bytes) { warnings.push("Script not found: " + ref); continue; }
    const code = bytes.toString("utf8");
    if (/\b(?:import\s*\(|import\s+[^;]+?\s+from\s+|export\s+(?:\{|\*|default))/m.test(code)) warnings.push("Possible JavaScript module dependency in: " + ref);
    const tag = '<script data-bundled-from="' + esc(toPosix(path.relative(SOURCE,full))) + '">\n' + escScript(code) + "\n</script>";
    html = html.slice(0,match.index) + tag + html.slice(match.index+match[0].length);
  }

  // Embed local image/media sources referenced directly by HTML.
  const attrRe = /\b(src|poster)\s*=\s*(["'])(.*?)\2/gi;
  const attrs = [...html.matchAll(attrRe)];
  for (const match of attrs.reverse()) {
    const uri = await assetData(match[3],SOURCE);
    if (uri) html = html.slice(0,match.index) + match[1] + "=" + match[2] + uri + match[2] + html.slice(match.index+match[0].length);
  }

  // Store every file, including non-runtime resources, in categorized form inside the HTML.
  const groups = new Map();
  for (const file of files) {
    const name = category(file.rel);
    if (!groups.has(name)) groups.set(name,[]);
    const bytes = sources.get(file.full);
    groups.get(name).push({path:file.rel,size:bytes.length,encoding:"base64",content:bytes.toString("base64")});
  }
  const catalog = {
    format:"Futures Offline Bundle Catalog",version:1,generatedAt:new Date().toISOString(),
    entryPoint:"index.html",fileCount:files.length,
    categories:Object.fromEntries(groups)
  };
  const catalogText = escScript(JSON.stringify(catalog));
  const catalogUi = [
    '<details id="futures-bundle-catalog" style="margin:16px;padding:12px;border:1px solid #263438;border-radius:8px;background:#111719;color:#E6F0F0;font:12px system-ui">',
    '<summary style="cursor:pointer;color:#55E5D9">Bundled project files (' + files.length + ')</summary>',
    '<p style="color:#91A5A5">Every file found under futures/ is embedded below in categorized form.</p>',
    '<div id="futures-bundle-categories"></div></details>',
    '<script type="application/json" id="futures-bundle-data">' + catalogText + '</script>',
    '<script>(()=>{const node=document.getElementById("futures-bundle-data"),root=document.getElementById("futures-bundle-categories");if(!node||!root)return;try{const data=JSON.parse(node.textContent);for(const [name,files] of Object.entries(data.categories)){const group=document.createElement("details"),title=document.createElement("summary"),list=document.createElement("ul");title.textContent=name+" ("+files.length+")";group.append(title);for(const file of files){const item=document.createElement("li");item.textContent=file.path+" — "+file.size.toLocaleString()+" bytes";list.append(item)}group.append(list);root.append(group)}}catch(error){root.textContent="Bundle catalog could not be loaded."}})();</script>'
  ].join("\n");
  html = html.replace(/<\/body\s*>/i,catalogUi + "\n</body>");
  const report = warnings.length
    ? "\n<!-- OFFLINE BUILD WARNINGS:\n" + warnings.map(x=>" - "+x.replaceAll("--","—")).join("\n") + "\n-->\n"
    : "\n<!-- Offline build: no missing local dependencies detected. -->\n";
  html = html.replace(/<\/html\s*>/i,report+"</html>");

  await rm(TEMP,{force:true});
  await writeFile(TEMP,html,"utf8");
  await rename(TEMP,OUTPUT);
  console.log("Built " + OUTPUT_REL + ": " + files.length + " files, " + Buffer.byteLength(html) + " bytes.");
  console.log("Categories: " + [...groups.keys()].join(", "));
  if (warnings.length) {
    console.warn("Build completed with " + warnings.length + " warning(s):");
    for (const warning of warnings) console.warn(" - " + warning);
  } else console.log("No missing local CSS/JS/media dependencies detected.");
}
main().catch(async error=>{console.error("Futures offline build failed:",error);await rm(TEMP,{force:true}).catch(()=>{});process.exitCode=1;});
