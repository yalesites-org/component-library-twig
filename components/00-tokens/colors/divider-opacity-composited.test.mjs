/**
 * Composited-contrast guard for `.yds-layout__divider` (YaleSites-Internal#1641).
 *
 * Run with the Node test runner:
 *   node --test components/00-tokens/colors/divider-opacity-composited.test.mjs
 *
 * Why this file exists and `SECTION_SURFACE_CONSUMERS` in
 * `section-background-contrast.test.mjs` is not enough: that test asserts the
 * SOURCE reads `var(--color-section-foreground, var(<fallback>))`, which
 * proves the right property is named but says nothing about what actually
 * gets painted. `.yds-layout__divider` used to carry `opacity: 0.5`, so the
 * PAINTED colour was a 50/50 blend of the line colour with the section
 * background behind it -- a real render regression the source-presence test
 * could not see, because the property name never changed. `getComputedStyle`
 * cannot see it either: it reports the declared `background-color`, not the
 * post-compositing pixel colour, which is why the original #1641 pass
 * measured 4.63:1 / 5.72:1 on the two Whitney cells and reported them fixed,
 * when the real, rendered ratios were 2.38:1 / 2.69:1 -- both still below
 * 3:1.
 *
 * This test reads the ACTUAL declared foreground and the ACTUAL declared
 * opacity out of the SCSS, composites them the way a browser paints a
 * partially-transparent box over a solid one (sRGB alpha blend, per-channel),
 * and asserts every (global theme x section theme) cell clears 3:1 (WCAG
 * 1.4.11) after that blend. It goes red if either mutates: the foreground
 * reverting to `--color-layout-border` (no `--color-section-foreground`
 * wrapper) fails on Whitney sections three/four even at full opacity;
 * `opacity` reverting to `0.5` (or anything below roughly 0.7) fails on most
 * section themes even with the safe foreground, because the blend pulls the
 * painted colour back toward the background it sits on.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { contrastRatio, parseHsl, formatRatio } from './contrast-ratio.mjs';
import { sectionBackgrounds } from './section-background-contrast.mjs';

// Non-text minimum, WCAG 1.4.11 -- matches the constant name and value
// `section-background-contrast.test.mjs` uses for the same criterion.
const NON_TEXT_MINIMUM = 3;

const LAYOUT_SCSS = new URL(
  '../../03-organisms/layout/layout/_yds-layout.scss',
  import.meta.url,
);

/**
 * The section-theme role each property this rule might read resolves to,
 * inside ANY non-default themed section (where `--color-section-foreground`
 * is always set). `--color-layout-border` is the pre-#1641 / reverted state;
 * `--color-section-foreground` is the fixed one. Anything else is a mutation
 * this test does not know how to grade, so it fails loudly rather than
 * guessing.
 */
const ROLE_BY_PROPERTY = {
  '--color-section-foreground': 'content',
  '--color-layout-border': 'border',
};

/**
 * Pull the `.yds-layout__divider` rule's own declarations -- stopping before
 * the first nested selector or media query, the same boundary
 * `readSharedRule()`-style helpers elsewhere in this suite use -- and read
 * back what it actually declares.
 */
function readDividerDeclarations() {
  const source = readFileSync(LAYOUT_SCSS, 'utf8');
  const block = source.match(
    /\.yds-layout__divider \{([\s\S]*?)\n {2}(?:\[|@media)/,
  );

  assert.ok(block, 'the .yds-layout__divider rule is gone or restructured');

  const bg = block[1].match(/background-color:\s*var\(\s*(--color-[a-z-]+)/);
  assert.ok(
    bg,
    '.yds-layout__divider no longer paints background-color from a var() -- update this test to match',
  );

  const property = bg[1];
  const role = ROLE_BY_PROPERTY[property];
  assert.ok(
    role,
    `.yds-layout__divider's background-color now reads ${property}, which this test does not have a role mapping for -- add one to ROLE_BY_PROPERTY and confirm the new mapping is actually safe before trusting this test again`,
  );

  const opacityMatch = block[1].match(/(?:^|\s)opacity:\s*([\d.]+)/);
  // CSS's own default: an element with no `opacity` declaration is fully
  // opaque. Absence is a pass, not a skip.
  const opacity = opacityMatch ? Number(opacityMatch[1]) : 1;

  return { property, role, opacity };
}

/**
 * Composite an opaque foreground over an opaque background at the given
 * alpha, per channel -- the same maths a browser uses to paint a
 * partially-transparent box over a solid one. sRGB, not premultiplied /
 * gamma-corrected: `contrastRatio()` itself works in sRGB channel values, so
 * blending in that same space is what makes the two composable.
 */
function compositeOver(foreground, background, alpha) {
  const blend = (fg, bg) => fg * alpha + bg * (1 - alpha);
  return {
    r: blend(foreground.r, background.r),
    g: blend(foreground.g, background.g),
    b: blend(foreground.b, background.b),
  };
}

test('.yds-layout__divider is fully opaque', () => {
  const { opacity } = readDividerDeclarations();

  assert.equal(
    opacity,
    1,
    'this element is a non-text line with no paired foreground (WCAG 1.4.11) -- ' +
      'any opacity below 1 blends its colour toward the section background it ' +
      'sits on and can silently undo a safe foreground choice',
  );
});

test('.yds-layout__divider clears 3:1, after compositing, in every section theme x global theme pairing', () => {
  const { role, opacity } = readDividerDeclarations();

  const failures = sectionBackgrounds()
    .map((bg) => {
      const backgroundRgb = parseHsl(bg.backgroundValue);
      const foregroundRgb = parseHsl(bg.slots[bg.roles[role]]);
      const painted = compositeOver(foregroundRgb, backgroundRgb, opacity);

      return {
        globalTheme: bg.globalTheme,
        sectionTheme: bg.sectionTheme,
        ratio: contrastRatio(painted, backgroundRgb),
      };
    })
    .filter(({ ratio }) => ratio < NON_TEXT_MINIMUM)
    .map(
      ({ globalTheme, sectionTheme, ratio }) =>
        `${globalTheme}/${sectionTheme} ${formatRatio(ratio)}:1`,
    );

  assert.deepEqual(
    failures,
    [],
    `.yds-layout__divider fails ${NON_TEXT_MINIMUM}:1 after compositing its ` +
      `declared opacity (${opacity}) in: ${failures.join(', ')}`,
  );
});
