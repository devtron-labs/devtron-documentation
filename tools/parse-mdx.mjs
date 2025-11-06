// tools/parse-mdx.mjs
import fs from 'fs';
import path from 'path';
import {compile} from '@mdx-js/mdx';

async function main() {
  const p = process.argv[2];
  if (!p) {
    console.error('Usage: node tools/parse-mdx.mjs path/to/file.md');
    process.exit(2);
  }
  const file = path.resolve(p);
  const src = fs.readFileSync(file, 'utf8');
  try {
    // compile will throw a descriptive error for broken MDX
    await compile(src, {providerImportSource: '@mdx-js/react'});
    console.log('✅ MDX parsed OK:', file);
  } catch (err) {
    // show the full error (stack + message + location)
    console.error('--- MDX PARSE ERROR ---');
    console.error(err);
    // if err.position or err.loc exist, print them clearly
    if (err.position) console.error('position:', err.position);
    if (err.loc) console.error('loc:', err.loc);
    process.exit(1);
  }
}

main();
