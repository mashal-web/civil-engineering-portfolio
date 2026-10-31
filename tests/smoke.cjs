'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');

const script = fs.readFileSync('script.js', 'utf8');
new Function(script);

assert.match(script, /const \$=\(s,root=document\)=>root\.querySelector\(s\), \$\$=\(s,root=document\)=>\[\.\.\.root\.querySelectorAll\(s\)\]/,
  'selector helpers must support single and multiple elements, including scoped queries');
assert.doesNotMatch(script, /\$\$\$/, 'invalid triple-dollar selectors must never ship');
assert.doesNotMatch(script, /\$\(['"][^'"]+['"]\)\.forEach/, 'single-element queries must not be used as collections');

for (const feature of [
  'theme-toggle', 'menu-toggle', 'course-search', 'course-card-button',
  'journal-open', 'project-detail', 'project-filter', 'studio-span',
  'studio-load', 'studio-position', 'concrete-form', 'download-cv',
  'print-cv', 'hero-bridge', 'lab-canvas', 'dock-canvas'
]) {
  assert.ok(script.includes(feature), `missing expected feature hook: ${feature}`);
}

for (const page of ['index', 'about', 'academics', 'courses', 'projects', 'journal', 'contact']) {
  const html = fs.readFileSync(page === 'index' ? 'index.html' : `${page}.html`, 'utf8');
  assert.match(html, new RegExp(`data-page=["']${page}["']`), `wrong data-page for ${page}`);
  assert.match(html, /styles\.css\?v=/, `${page} must load the versioned stylesheet`);
  assert.match(html, /script\.js\?v=/, `${page} must load the versioned script`);
}

console.log('Portfolio smoke checks passed.');
