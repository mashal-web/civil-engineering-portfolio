'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');

const script = fs.readFileSync('script.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const pages = ['index', 'about', 'academics', 'courses', 'projects', 'journal', 'contact'];

assert.doesNotThrow(() => new Function(script), 'script.js must parse as valid JavaScript');
assert.match(script, /const \$=\(s,root=document\)=>root\.querySelector\(s\), \$\$=\(s,root=document\)=>\[\.\.\.root\.querySelectorAll\(s\)\]/,
  'selector helpers must support scoped single and multiple queries');
assert.doesNotMatch(script, /\$\$\$/, 'invalid triple-dollar selectors must never ship');
assert.doesNotMatch(script, /(?<!\$)\$\(['"][^'"]+['"]\)\.forEach/, 'single-element queries must not be used as collections');

for (const page of pages) {
  const file = page === 'index' ? 'index.html' : page + '.html';
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, new RegExp('data-page=["\\x27]' + page + '["\\x27]'), file + ' must identify its page');
  assert.match(html, /id=["']site["']/, file + ' must contain the application mount');
  assert.match(html, /styles\.css\?v=/, file + ' must load the versioned stylesheet');
  assert.match(html, /script\.js\?v=/, file + ' must load the versioned script');
  assert.match(script, new RegExp('(^|\\n)' + page + ':'), 'script.js must define the ' + page + ' page');
}

const journalBlock = script.match(/const j=\{([\s\S]*?)\};\s*const pj=/);
const projectBlock = script.match(/const pj=\{([\s\S]*?)\};\s*function modal/);
assert.ok(journalBlock, 'journal content map must exist');
assert.ok(projectBlock, 'project detail content map must exist');
const journalKeys = [...journalBlock[1].matchAll(/(?:^|,)([a-z][\w]*):\[/g)].map(m => m[1]);
const projectKeys = [...projectBlock[1].matchAll(/(?:^|,)([a-z][\w]*):\[/g)].map(m => m[1]);
const journalButtons = [...script.matchAll(/data-entry="([^"]+)"/g)].map(m => m[1]);
const projectButtons = [...script.matchAll(/data-project="([^"]+)"/g)].map(m => m[1]);
for (const key of journalButtons) assert.ok(journalKeys.includes(key), 'journal button points to missing entry: ' + key);
for (const key of projectButtons) assert.ok(projectKeys.includes(key), 'project detail button points to missing detail: ' + key);

const categories = [...new Set([...script.matchAll(/data-category="([^"]+)"/g)].map(m => m[1]))];
const filters = [...new Set([...script.matchAll(/data-filter="([^"]+)"/g)].map(m => m[1]))];
for (const category of categories) assert.ok(filters.includes(category), 'project category has no filter: ' + category);
assert.ok(filters.includes('all'), 'project filters must include All');

for (const feature of [
  /theme-toggle[\s\S]*?addEventListener\('click'/,
  /menu-toggle[\s\S]*?addEventListener\('click'/,
  /course-search[\s\S]*?addEventListener\('input'/,
  /course-card-button[\s\S]*?addEventListener\('click'/,
  /journal-open[\s\S]*?addEventListener\('click'/,
  /project-detail[\s\S]*?addEventListener\('click'/,
  /project-filter[\s\S]*?addEventListener\('click'/,
  /studio-span[\s\S]*?addEventListener\('input'/,
  /studio-load[\s\S]*?addEventListener\('input'/,
  /studio-position[\s\S]*?addEventListener\('input'/,
  /concrete-form[\s\S]*?addEventListener\('submit'/,
  /download-cv[\s\S]*?addEventListener\('click'/,
  /print-cv[\s\S]*?addEventListener\('click'/,
  /loadThreeEngine\(\)/,
  /cdn\.jsdelivr\.net\/npm\/three@0\.160\.0/
]) assert.match(script, feature, 'missing or disconnected feature handler: ' + feature);

assert.match(script, /ra=load\*\(1-position\),rb=load\*position/, 'beam reactions must use the point-load position');
assert.match(script, /const v=l\*w\*d/, 'concrete estimator must calculate volume');
assert.match(script, /if\(reduced\)render\(\)/, 'interactive 3D controls must redraw with reduced motion enabled');
assert.match(script, /const baseMaterials=materials\.map/, '3D materials must preserve their original colors between view modes');

for (const selector of [
  '.course-card[hidden]{display:none}',
  '.modal-backdrop[hidden]{display:none}',
  '.dock-backdrop[hidden]{display:none}'
]) assert.ok(css.includes(selector), 'CSS must respect hidden state: ' + selector);
assert.match(css, /\.project-grid-advanced \.project-card\[hidden\]\{display:none!important\}/,
  'filtered project cards must be hidden');

assert.match(script, /global-search-trigger/, 'global search must be reachable from the shared header');
assert.match(script, /id=["']global-search["']/, 'global search dialog must exist');
assert.match(script, /e\.key\.toLowerCase\(\)==='k'/, 'global search must support Ctrl/Command+K');
assert.match(script, /global-search-input/, 'global search input must be wired');
assert.match(script, /search:'<circle/, 'global search must have a dedicated icon');
assert.match(script, /url:'projects\.html#beam-scene'/, 'beam search result must target an existing project diagram');
assert.match(script, /url:'projects\.html#concrete-form'/, 'concrete estimator search result must target its form');

console.log('Portfolio audit smoke checks passed.');

assert.match(script, /\['projects\.html#beam-scene','Engineering Tools','projects','calculator'\]/, 'primary navigation must expose engineering tools');
assert.match(script, /\['courses\.html','Resources','courses','book'\]/, 'primary navigation must expose resources');
assert.match(script, /setSearchActive\(searchActiveIndex\+1\)/, 'global search must support ArrowDown result navigation');
assert.match(script, /setSearchActive\(searchActiveIndex-1\)/, 'global search must support ArrowUp result navigation');
assert.match(script, /searchReturnFocus&&searchReturnFocus\.isConnected/, 'closing search must restore focus');
assert.match(script, /e\.target\.closest\('\.topbar'\)/, 'mobile menu must close after outside interaction');
assert.match(script, /e\.key==='Escape'&&navEl\.classList\.contains\('is-open'\)/, 'mobile menu must close with Escape');
assert.match(css, /\.global-search-result\.is-active/, 'keyboard-selected search result must be visible');

assert.match(script, /data-course-progress=/, 'course cards must show status from saved checklist activity');
assert.match(script, /done===0\?'Not started':done===boxes\.length\?'Completed':'In progress'/, 'course status must reflect recorded activity');
assert.match(script, /id="export-study-data"/, 'dashboard must offer study-data export');
assert.match(script, /id="clear-study-data"/, 'dashboard must offer a control to clear saved study data');
assert.match(script, /window\.confirm\('Clear saved course checklists/, 'clearing local progress must require confirmation');
assert.match(script, /Inputs changed\. Calculate again to refresh the result\./, 'calculator must invalidate stale results after edits');
assert.match(css, /\.course-progress-label\[data-status="completed"\]/, 'course status must be visible without color alone');
