import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
const root = new URL('../', import.meta.url);
const read = file => readFileSync(new URL(file, root), 'utf8');
test('published HTML uses a compiled script and works under /el-golan/', () => {
  const html = read('index.html');
  assert.ok(!html.includes('/src/main.jsx'));
  assert.ok(!html.includes('src="/assets/'));
  const refs = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m=>m[1]);
  for (const ref of refs) {
    const url = new URL(ref, 'https://example.com/el-golan/');
    assert.ok(url.pathname.startsWith('/el-golan/'), ref);
    assert.ok(existsSync(new URL(ref, root)), ref);
  }
});
test('published CSS resolves its local font within the repository path', () => {
  const files = readdirSync(new URL('assets/', root)).filter(f=>f.endsWith('.css'));
  assert.ok(files.length>0);
  for (const file of files) {
    const css=read('assets/'+file);
    for(const [,url] of css.matchAll(/url\(["']?([^\)"']+)["']?\)/g)) {
      if(url.startsWith('data:'))continue;
      const resolved=new URL(url,'https://example.com/el-golan/assets/'+file);
      assert.ok(resolved.pathname.startsWith('/el-golan/'),url);
      assert.ok(existsSync(new URL(path.posix.normalize('assets/'+url),root)),url);
    }
  }
});
test('every original photograph is included unchanged in the published assets', () => {
  const photos=readdirSync(new URL('public/assets/',root)).filter(f=>f.endsWith('.jpg'));
  assert.equal(photos.length,19);
  for(const f of photos)assert.deepEqual(readFileSync(new URL('assets/'+f,root)),readFileSync(new URL('public/assets/'+f,root)));
});
