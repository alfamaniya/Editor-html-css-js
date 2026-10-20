import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const file = 'index.html';
const source = readFileSync(file, 'utf8');
const errors = [];
const counts = { tags: 0, parens: 0, braces: 0, brackets: 0, semicolons: 0, commas: 0 };
const voidTags = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const backtick = String.fromCharCode(96);
const lineAt = (n) => source.slice(0, n).split('\n').length;
function fail(message, index = 0) { errors.push(file + ':' + lineAt(index) + ': ' + message); }

function checkCode(text, offset, kind) {
  const stack = [];
  let state = 'code', quote = '', i = 0;
  const pairs = { ')':'(', '}':'{', ']':'[' };
  while (i < text.length) {
    const ch = text[i], next = text[i + 1];
    if (state === 'line') { if (ch === '\n') state = 'code'; i++; continue; }
    if (state === 'comment') { if (ch === '*' && next === '/') { state = 'code'; i += 2; } else i++; continue; }
    if (state === 'string' || state === 'template') {
      if (ch === '\\') { i += 2; continue; }
      if ((state === 'string' && ch === quote) || (state === 'template' && ch === backtick)) state = 'code';
      i++; continue;
    }
    if (ch === '/' && next === '/') { state = 'line'; i += 2; continue; }
    if (ch === '/' && next === '*') { state = 'comment'; i += 2; continue; }
    if (ch === '"' || ch === "'") { state = 'string'; quote = ch; i++; continue; }
    if (kind === 'JavaScript' && ch === backtick) { state = 'template'; i++; continue; }
    if ('({['.includes(ch)) {
      stack.push({ ch, at: offset + i });
      if (ch === '(') counts.parens++;
      if (ch === '{') counts.braces++;
      if (ch === '[') counts.brackets++;
    } else if (Object.hasOwn(pairs, ch)) {
      const top = stack.pop();
      if (!top) fail(kind + ': unmatched closing ' + ch, offset + i);
      else if (top.ch !== pairs[ch]) fail(kind + ': closing ' + ch + ' mismatches ' + top.ch + ' opened on line ' + lineAt(top.at), offset + i);
    }
    if (ch === ';') counts.semicolons++;
    if (ch === ',') counts.commas++;
    i++;
  }
  if (state === 'comment') fail(kind + ': unclosed block comment', offset + text.length);
  if (state === 'string') fail(kind + ': unclosed string', offset + text.length);
  if (state === 'template') fail(kind + ': unclosed template literal', offset + text.length);
  for (const item of stack) fail(kind + ': opening ' + item.ch + ' has no matching closer', item.at);
  if (kind === 'JavaScript' && text.trim()) {
    const result = spawnSync(process.execPath, ['--check'], { input: text, encoding: 'utf8' });
    if (result.status !== 0) errors.push('Inline JavaScript syntax error:\n' + (result.stderr || result.stdout).trim());
  }
}

const stack = [];
const tagRe = /<!--[\s\S]*?-->|<![^>]*>|<\?[\s\S]*?\?>|<\/?([a-zA-Z][\w:.-]*)\b[^>]*>/g;
let match;
while ((match = tagRe.exec(source))) {
  const token = match[0];
  if (token.startsWith('<!--') || token.startsWith('<!') || token.startsWith('<?')) continue;
  counts.tags++;
  const name = match[1].toLowerCase();
  const closing = /^<\s*\//.test(token);
  const selfClosing = /\/\s*>$/.test(token);
  if (!closing && !selfClosing && (name === 'script' || name === 'style')) {
    const closeRe = new RegExp('</\\s*' + name + '\\s*>', 'ig');
    closeRe.lastIndex = tagRe.lastIndex;
    const close = closeRe.exec(source);
    if (!close) { fail('missing closing tag for <' + name + '>', match.index); continue; }
    checkCode(source.slice(tagRe.lastIndex, close.index), tagRe.lastIndex, name === 'script' ? 'JavaScript' : 'CSS');
    tagRe.lastIndex = close.index + close[0].length;
    continue;
  }
  if (voidTags.has(name) || selfClosing) {
    if (closing && voidTags.has(name)) fail('void tag </' + name + '> should not have a closing tag', match.index);
    continue;
  }
  if (!closing) stack.push({ name, at: match.index });
  else {
    const top = stack.pop();
    if (!top) fail('extra closing tag </' + name + '>', match.index);
    else if (top.name !== name) fail('closing </' + name + '> does not match <' + top.name + '> opened on line ' + lineAt(top.at), match.index);
  }
}
for (const item of stack) fail('opening tag <' + item.name + '> has no matching closing tag', item.at);

if (errors.length) {
  console.error('Index integrity check failed: ' + errors.length + ' issue(s)');
  for (const error of errors) console.error('- ' + error);
  process.exitCode = 1;
} else {
  console.log('Index integrity check passed.');
  console.log('HTML tags inspected: ' + counts.tags);
  console.log('Balanced delimiters counted: parentheses ' + counts.parens + ', braces ' + counts.braces + ', brackets ' + counts.brackets);
  console.log('Semicolon count: ' + counts.semicolons + '; comma count: ' + counts.commas);
}
