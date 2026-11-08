import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as components from '../dist/index.js';

test('standalone exports include the established controls', () => {
  for (const name of ['AppShell', 'Button', 'Field', 'Notice', 'Dialog', 'Tabs', 'DataTable', 'Pagination']) assert.equal(typeof components[name], 'function', name);
});
test('buttons preserve their safe default and explicit disabled state during SSR', () => {
  const html = renderToStaticMarkup(createElement(components.Button, { disabled: true }, 'Save'));
  assert.match(html, /<button\b/);
  assert.match(html, /type="button"/);
  assert.match(html, /disabled=""/);
  assert.match(html, />Save<\/button>/);
});
test('styles use the matching published core and preserve scoped identity', async () => {
  const css = await readFile(new URL('../dist/styles.css', import.meta.url), 'utf8');
  assert.match(css, /@import ["']@krigsvold\/core\/css["']/);
  assert.match(css, /\.krigsvold\b/);
  assert.doesNotMatch(css, /@(?:martlet|krigsvold)\/theme/);
});

test('article contents remain author supplied and inline within the prose', () => {
  const body = createElement('h2', {id:'section'}, 'Reading section');
  const ordinary = renderToStaticMarkup(createElement(components.Article, {title:'A document'}, body));
  assert.doesNotMatch(ordinary, /<nav\b|krigsvold-article-context/);
  const contents = createElement(components.TableOfContents, {label:'Manual contents',items:[{id:'section',label:'Reading section'}]});
  const manual = renderToStaticMarkup(createElement(components.Article, {title:'A document',contents}, body));
  assert.match(manual, /data-variant="inline"/);
  assert.match(manual, /href="#section"/);
  assert.ok(manual.indexOf('class="krigsvold-prose"') < manual.indexOf('class="krigsvold-article-context"'));
  assert.ok(manual.indexOf('class="krigsvold-article-context"') < manual.indexOf('id="section"'));
});
