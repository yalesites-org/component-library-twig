/**
 * YaleSites-Internal#2115: in a Section Six section, Quick Links buttons and
 * Tabs panel headings must follow a colour that is legible on the surface they
 * sit on, and no other section theme may be touched.
 *
 * The values were measured in a browser (white on rgb(0, 54, 107) for the
 * button, rgb(33, 33, 33) on rgb(97, 168, 255) for the heading); this test
 * pins the rules that produce them.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const quickLinks = read('./_yds-quick-links.scss');
const tabs = read('../tabs/_yds-tabs.scss');

const block = (src, selector) => {
  const start = src.indexOf(selector);
  assert.notEqual(start, -1, `missing rule: ${selector}`);
  return src.slice(start, start + 900);
};

test('quick-links buttons in section six use the block action colours', () => {
  const rule = block(
    quickLinks,
    ".yds-layout[data-section-theme='six'] .quick-links {",
  );
  assert.match(rule, /--color-cta-text: var\(--color-action\)/);
  assert.match(rule, /--color-cta-border: var\(--color-action\)/);
  assert.match(rule, /--color-link-base: var\(--color-action\)/);
});

test('quick-links fix is scoped to sections two, five and six only', () => {
  // YaleSites-Internal#2120 widened the #2115 rule from six to two and five on
  // purpose (CTA labels were 1.3:1 to 3.7:1 there). Any other section theme
  // appearing in this list is a scope change and must be argued, not added.
  const themed = quickLinks.match(
    /data-section-theme='(\w+)'\] \.quick-links/g,
  );
  assert.deepEqual([...new Set(themed)].sort(), [
    "data-section-theme='five'] .quick-links",
    "data-section-theme='six'] .quick-links",
    "data-section-theme='two'] .quick-links",
  ]);
});

test('tabs headings in any themed section follow the section foreground', () => {
  const rule = block(
    tabs,
    ".yds-layout[data-section-theme]:not([data-section-theme='default']) & {",
  );
  assert.match(rule, /--color-heading: var\(--color-section-foreground\)/);
});
