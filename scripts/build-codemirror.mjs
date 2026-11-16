import { build } from "esbuild";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const outfile = resolve("futures/editor/core/codemirror.js");
await mkdir(dirname(outfile), { recursive: true });
await build({
  entryPoints: ["scripts/codemirror-entry.js"],
  outfile,
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  minify: true,
  legalComments: "none"
});
console.log("CodeMirror 6 bundle created: " + outfile);
