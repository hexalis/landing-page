import { readdir, readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import assert from 'node:assert/strict';
async function files(dir) { return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e => e.isDirectory() ? files(`${dir}/${e.name}`) : `${dir}/${e.name}`))).flat(); }
const assets = await files('dist');
const gz = async p => gzipSync(await readFile(p)).length;
const pages = await Promise.all(assets.filter(p => p.endsWith('.html')).map(p => readFile(p,'utf8')));
const inlineMaximum = Math.max(0,...pages.map(html => gzipSync([...html.matchAll(/<script(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n')).length));
/* The 3D journey (three.js + scene) is its own lazily loaded chunk with its own budget; everything else keeps the template's limits. */
const isScene = p => /\/scene\.[\w-]+\.js$/.test(p);
const scene = assets.filter(isScene);
assert.equal(scene.length, 1, 'Expected exactly one 3D scene chunk');
const sceneSize = await gz(scene[0]);
console.log(`scene: ${sceneSize} gzip bytes / ${160*1024} (lazy 3D journey chunk)`);
assert.ok(sceneSize <= 160*1024, 'scene budget exceeded');
for (const [extension, limit] of [['js',80*1024],['css',60*1024]]) {
  const paths = assets.filter(p => p.endsWith(`.${extension}`) && !isScene(p));
  const size = (await Promise.all(paths.map(gz))).reduce((a,b)=>a+b,0) + (extension === 'js' ? inlineMaximum : 0);
  console.log(`${extension}: ${size} gzip bytes / ${limit} (all other external assets + largest page's inline JS)`);
  assert.ok(size <= limit, `${extension} budget exceeded`);
}
assert.ok(assets.includes('dist/sitemap-index.xml'), 'Sitemap missing');
assert.ok(assets.includes('dist/robots.txt'), 'Robots missing');
