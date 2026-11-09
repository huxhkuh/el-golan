import { cpSync, copyFileSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist/client');
const assets = path.join(root, 'assets');
mkdirSync(assets, { recursive: true });
// Remove only the generated JS/CSS bundles from earlier builds.
for (const file of readdirSync(assets)) {
  if (/^app-[A-Za-z0-9_-]+\.(js|css)$/.test(file)) unlinkSync(path.join(assets, file));
}
cpSync(path.join(output, 'assets'), assets, { recursive: true });
copyFileSync(path.join(output, 'index.html'), path.join(root, 'index.html'));
writeFileSync(path.join(root, '.nojekyll'), '');
console.log('GitHub Pages root is ready: index.html and assets/');
