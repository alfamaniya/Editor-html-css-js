#!/usr/bin/env node
'use strict';

// Keep the legacy command aligned with the authoritative standalone builder.
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const builderPath = path.resolve(__dirname, '..', 'scripts', 'build-test-editor.mjs');
const result = spawnSync(process.execPath, [builderPath], { stdio: 'inherit' });

if (result.error) {
  console.error('Could not start the standalone editor builder:', result.error.message);
  process.exitCode = 1;
} else {
  process.exitCode = Number.isInteger(result.status) ? result.status : 1;
}
