/**
 * Guards the color-system defects fixed in YaleSites-Internal#1628 (Color
 * Surface, Phase 0).
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/00-tokens/colors/color-system-defects.test.mjs
 *
 * Why these are tests at all: every defect below compiles cleanly and fails
 * silently at runtime. A `var()` naming a custom property that was never
 * declared is invalid-at-computed-value-time -- the declaration is dropped and
 * the element keeps whatever it inherited, so the build is green, Storybook
 * renders, and the only symptom is a colour that is wrong (or a divider that is
 * not there) on one section theme. Nothing else in the pipeline catches that,
 * which is how each of these survived a review.
 *
 * Scope note: the sibling defect in this phase -- component themes four and
 * five publishing `--component-themes-four-colors-slot-*` instead of the flat
 * `--component-themes-four-slot-*` -- is fixed in the `tokens` repo and is
 * deliberately NOT asserted here. This suite runs against the *published*
 * `@yalesites-org/tokens` package, so asserting the fixed shape would fail CI
 * until a tokens release ships and is bumped here. See the PR body.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const colorsDir = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.resolve(colorsDir, '..', '..');

/** Every .scss file under components/, as [relativePath, contents] pairs. */
function readAllScss(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      return readAllScss(full);
    }
    if (!entry.endsWith('.scss')) {
      return [];
    }
    return [[path.relative(componentsDir, full), readFileSync(full, 'utf8')]];
  });
}

/**
 * Drop a trailing `//` comment without touching `//` that is part of the value.
 *
 * A blanket `.replace(/\/\/.*$/, '')` would also cut at the `//` in
 * `url(https://...)` or inside a quoted string, silently removing source before
 * it is ever scanned. That direction of error is the dangerous one: it can only
 * hide a violation, never invent one, so it would show up as a test that passes
 * when it should fail.
 */
function stripLineComment(line) {
  let quote = null;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (quote) {
      if (char === quote && line[i - 1] !== '\\') quote = null;
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === '/' && line[i + 1] === '/') {
      // `://` is a URL scheme separator, not the start of a comment.
      if (line[i - 1] !== ':') return line.slice(0, i);
    }
  }
  return line;
}

/**
 * Source lines that can affect the compiled CSS, as [lineNumber, line] pairs.
 *
 * Every assertion here is about what the compiled CSS does, so a `--color-*`
 * name mentioned in a comment is not a violation -- two such mentions exist in
 * _yds-pull-quote.scss and they are documentation, not declarations. Both `//`
 * and `/* *\/` comment styles are stripped: the block-comment form is removed
 * first (it can span lines and can also sit mid-line), then any line that is
 * left starting with `//` is dropped.
 */
function codeLines(contents) {
  return contents
    .replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, ' '))
    .split('\n')
    .map((line, index) => [index + 1, stripLineComment(line)])
    .filter(([, line]) => line.trim() !== '');
}

const scssFiles = readAllScss(componentsDir);

/** Every [file, lineNumber, line] whose code content matches `pattern`. */
function findInScss(pattern) {
  return scssFiles.flatMap(([file, contents]) =>
    codeLines(contents)
      .filter(([, line]) => pattern.test(line))
      .map(([lineNumber, line]) => `${file}:${lineNumber}: ${line.trim()}`),
  );
}

/**
 * The same walk, but yielding whole declarations rather than raw lines.
 *
 * `findInScss` matches a line at a time, which is fine for "does this name
 * appear anywhere" checks. It is not fine for checking the SHAPE of a
 * declaration: prettier wraps any declaration that overflows the print width,
 * and this tree is full of long token names that trip that (see the
 * `--color-slot-*` blocks in `_yds-layout.scss`). A line-at-a-time regex would
 * quietly stop matching the day a declaration got one character longer.
 *
 * So: join each file's code lines, split on `;`, `{` and `}`, and collapse
 * internal whitespace. Each fragment is reported against the line its first
 * character sat on, so failure messages still point somewhere useful.
 */
function findInScssDeclarations(pattern) {
  return scssFiles.flatMap(([file, contents]) => {
    const lines = codeLines(contents);
    const found = [];
    let buffer = '';
    let startLine = null;

    const flush = () => {
      const declaration = buffer.replace(/\s+/g, ' ').trim();
      if (declaration && pattern.test(declaration)) {
        found.push(`${file}:${startLine}: ${declaration}`);
      }
      buffer = '';
      startLine = null;
    };

    lines.forEach(([lineNumber, line]) => {
      line.split('').forEach((char) => {
        if (char === ';' || char === '{' || char === '}') {
          flush();
          return;
        }
        if (startLine === null && char.trim() !== '') startLine = lineNumber;
        buffer += char;
      });
      buffer += '\n';
    });
    flush();

    return found;
  });
}

test('scss files were found (guards the walker itself)', () => {
  assert.ok(
    scssFiles.length > 50,
    `expected to walk the component tree, found ${scssFiles.length} .scss files`,
  );
});

/**
 * `--color-layout-theme|content|border` are declared ONLY on `.yds-layout`, and
 * only inside `[data-component-theme='...']`. A component that reads one from
 * somewhere else is reaching back up the tree for a property it cannot see
 * unless it happens to be a descendant of a themed section -- and when it is
 * not, the read resolves to nothing.
 *
 * This is the enforcement half of the ratchet described in the ticket. The
 * containment is also expressed as a stylelint rule (see stylelint.config.js);
 * keeping the assertion here too means it still fails loudly if that lint rule
 * is ever relaxed.
 */
test('--color-layout-* is confined to the layout organism', () => {
  const layoutDir = `03-organisms${path.sep}layout${path.sep}`;
  const violations = findInScss(/--color-layout-/).filter(
    (violation) => !violation.startsWith(layoutDir),
  );

  assert.deepEqual(
    violations,
    [],
    `--color-layout-* may only be used inside 03-organisms/layout/. Read the ` +
      `inheritable section contract instead (--color-section-background / ` +
      `--color-section-foreground / --color-section-accent), with the ` +
      `component's existing colour as the CSS fallback.\n${violations.join(
        '\n',
      )}`,
  );
});

/**
 * `--color-slot-white` is not a token and never was; the slot scale is
 * numbered one..nine. The one use of it silently killed a link colour.
 */
test('--color-slot-white is not referenced (it is not a token)', () => {
  const violations = findInScss(/--color-slot-white/);

  assert.deepEqual(
    violations,
    [],
    `--color-slot-white is undefined. Use --color-basic-white.\n` +
      `${violations.join('\n')}`,
  );
});

/**
 * `:root` colour fallbacks have to bottom out in something real.
 *
 * `--color-action: var(--color-theme-action, var(--color-cta-primary))` named
 * two properties that are both undefined. On a Drupal page `ys_themes` supplies
 * the `--color-theme-*` hook, which masks it; in Storybook, or on a site where
 * the setting is empty, nothing does, and the declaration is
 * invalid-at-computed-value-time. `--color-action` then has a value only where
 * a component happens to assign one, so an outline CTA reading it for its
 * border can lose the border entirely.
 *
 * Asserted over every `--color-*` in the `:root` block rather than the one
 * property that prompted it -- `--color-accent` had the identical defect one
 * line below.
 */
test('every :root color fallback chain ends in a defined value', () => {
  const globalConfig = readFileSync(
    path.join(componentsDir, '_global-config.scss'),
    'utf8',
  );

  // Only the tokens package and the `:root` block itself are in scope at
  // `:root`. A name declared on some component class is NOT -- counting those
  // would let a terminal fallback that `:root` can never see pass as defined.
  const tokensCss = readFileSync(
    require.resolve('@yalesites-org/tokens/build/css/tokens.css'),
    'utf8',
  );
  const rootBlock = globalConfig.slice(
    globalConfig.indexOf(':root'),
    globalConfig.indexOf('}', globalConfig.indexOf(':root')),
  );
  const declared = new Set(
    [
      ...tokensCss.matchAll(/(--[a-z0-9-]+)\s*:/g),
      ...rootBlock.matchAll(/(--[a-z0-9-]+)\s*:/g),
    ].map((match) => match[1]),
  );

  // Collapse wrapped declarations so a prettier line break inside `var(...)`
  // does not read as a chain that ends early.
  const declarations = codeLines(rootBlock)
    .map(([, line]) => line)
    .join(' ')
    .split(';')
    .filter((declaration) => /--color-[a-z0-9-]+\s*:/.test(declaration));

  assert.ok(
    declarations.length > 3,
    `expected several --color-* declarations in :root, found ${declarations.length}`,
  );

  const broken = declarations
    .map((declaration) => {
      const referenced = [
        ...declaration.matchAll(/var\(\s*(--[a-z0-9-]+)/g),
      ].map((match) => match[1]);
      // The LAST name in the chain is the terminal fallback: it is what paints
      // when every earlier name is undefined, so it is the one that must
      // resolve. Earlier names are optional theme hooks by design.
      const terminal = referenced[referenced.length - 1];
      return { declaration: declaration.trim(), terminal };
    })
    .filter(({ terminal }) => terminal && !declared.has(terminal))
    .map(
      ({ declaration, terminal }) =>
        `${declaration} -> terminal fallback ${terminal} is undefined`,
    );

  assert.deepEqual(
    broken,
    [],
    `a :root declaration whose terminal fallback names nothing is ` +
      `invalid-at-computed-value-time wherever the theme hook is absent:\n` +
      `${broken.join('\n')}`,
  );
});

/**
 * A Sass colour variable is resolved at compile time and baked into the output,
 * so no custom property -- and therefore no section or global theme -- can
 * override it. Colours that need to respond to a theme must be `var()` reads.
 *
 * The taxonomy tag label was `tokens.$color-blue-yale`, which compiles to
 * hsl(210, 100%, 21%) and made tags invisible on section theme one.
 */
test('themeable colors are not baked in as Sass literals', () => {
  // A `tokens.$color-*` in a colour-bearing position. Sass colour variables are
  // still legitimate inside `#{...}` interpolation used as a custom-property
  // fallback, which stays overridable, so only direct declarations are flagged.
  // Any colour-bearing property, and the literal may sit anywhere in the value
  // (`border: 1px solid tokens.$color-blue-yale`), not just immediately after
  // the colon. `#{...}` interpolation is excluded: used as a custom-property
  // fallback it stays overridable, which is the point.
  const violations = findInScss(
    /(?:^|[\s;{])(?:[a-z-]*color|fill|stroke|background|border[a-z-]*|box-shadow|outline)\s*:[^;]*(?<!#\{)tokens\.\$color-/,
  );

  assert.deepEqual(
    violations,
    [],
    `Sass colour literals cannot be themed. Read the custom property instead ` +
      `(e.g. var(--color-blue-yale)).\n${violations.join('\n')}`,
  );
});

/**
 * Light section themes must be excluded from the white-on-dark treatments.
 *
 * Section theme five paints a very light background (slot-nine), so the
 * required-field asterisk turning white makes it invisible. The exclusion list
 * named only `default` and `two`.
 */
test('light section themes are excluded from white-on-dark form styling', () => {
  const textfields = readFileSync(
    path.join(
      componentsDir,
      '01-atoms',
      'forms',
      'textfields',
      '_yds-textfields.scss',
    ),
    'utf8',
  );

  // The guard spans several lines, so normalise whitespace before matching.
  // Anchored on the `&::after` block it introduces, not just the first
  // `[data-component-theme]:not(` in the file -- otherwise adding an unrelated
  // guard above this one would leave the test happily validating the wrong
  // selector while the asterisk regressed.
  const guard = textfields
    .replace(/\s+/g, ' ')
    .match(
      /\[data-component-theme\]:not\(([^)]*(?:\([^)]*\)[^)]*)*)\) & \{ &::after \{ color: var\(--color-basic-white\)/,
    );

  assert.ok(
    guard,
    'expected the white required-asterisk rule to be behind a :not() ' +
      'light-theme exclusion guard in _yds-textfields.scss',
  );

  ['default', 'two', 'five'].forEach((theme) => {
    assert.ok(
      guard[1].includes(`[data-component-theme='${theme}']`),
      `section theme '${theme}' has a light background and must be excluded ` +
        `from the white required-asterisk rule; guard is: ${guard[1].trim()}`,
    );
  });
});

// ---------------------------------------------------------------------------
// Phase 0b (YaleSites-Internal#1629) -- self-referential custom properties.
// ---------------------------------------------------------------------------

/**
 * A custom property declared as a reference to itself
 * (`--color-link-base: var(--color-link-base)`) is a dependency cycle. Per CSS
 * Variables, every property in a cycle computes to the guaranteed-invalid
 * value, so the declaration does NOT "keep the inherited value" -- it destroys
 * it for the element and everything below that does not re-declare it.
 *
 * The failure mode is asymmetric, which is why twenty of these survived review:
 *
 * - Read into a colour property (`color: var(--x)`), the declaration is
 *   invalid-at-computed-value-time, so `color` computes to `unset`. `color`
 *   inherits, so `unset` means `inherit` -- the element picks up its parent's
 *   colour and the page looks plausible.
 * - Read into a SHORTHAND, the whole shorthand is dropped. That is how
 *   `_utility.scss`'s `outline: <width> solid var(--color-link-base)` lost the
 *   focus ring entirely on section themes one to five: measured
 *   `outline-style: none` on a focused link inside a themed Layout Builder
 *   section, against `2px solid` on an unthemed one. That is a WCAG 2.1 SC
 *   2.4.7 failure, not a colour nit.
 * - Read into a non-inherited colour property (`background-color`,
 *   `border-color`, `fill`), `unset` means `initial`, so the paint disappears.
 *   That is `--color-pull-quote-accent` on pull-quote dials four and five.
 *
 * Nothing in the pipeline catches any of this: Sass compiles it, stylelint
 * accepts it, and the browser fails silently at computed-value time.
 *
 * If you are here because this test failed on a cycle you were about to write:
 * `currentcolor` is the drop-in replacement ONLY when every consumer of the
 * property is a `color:` longhand -- that is the case that makes the two
 * equivalent, because `color: currentcolor` is defined to behave as `inherit`.
 * It is not equivalent for a `background-color` or `fill` consumer, where the
 * invalid value degrades to `initial` (transparent, black) rather than to the
 * inherited colour. Check the consumers before reaching for it.
 */
test('no custom property is declared as a reference to itself', () => {
  // `--x: var(--x)` and `--x: var(--x, fallback)`. The backreference is what
  // makes this a cycle check rather than a "declares a var" check.
  //
  // Matched against declarations joined across line breaks, not against raw
  // lines: prettier wraps long token names onto their own line all over this
  // tree (`--color-slot-three: var(\n  --global-themes-...\n);`), and a
  // line-at-a-time regex would sail straight past a wrapped self-reference.
  // The guard has to survive a reformat to be worth having.
  const violations = findInScssDeclarations(
    /--([a-z0-9-]+):\s*var\(\s*--\1\s*[,)]/,
  );

  assert.deepEqual(
    violations,
    [],
    'A custom property may not reference itself: the cycle computes to the ' +
      'guaranteed-invalid value and discards the inherited value rather than ' +
      'preserving it. To keep the inherited colour, declare `currentcolor` ' +
      '(which is what the cycle simulated for `color`, and unlike the cycle ' +
      'is also valid inside a shorthand). To adopt the surrounding surface, ' +
      'read the section contract (--color-section-foreground / ' +
      `--color-section-accent).\n${violations.join('\n')}`,
  );
});

/**
 * The focus ring reads `--color-link-base` (`00-tokens/utility/_utility.scss`),
 * so that property has to resolve to a real colour everywhere a link can be
 * focused. It is read through the `outline` SHORTHAND, which is what made the
 * original defect total rather than cosmetic -- an unresolvable var() drops the
 * whole declaration, so the ring vanished instead of turning an odd colour.
 * That line now carries a `currentcolor` fallback, so the shorthand can no
 * longer be dropped; this test guards the other half, that each themed section
 * still names a real colour rather than degrading every ring to the copy colour.
 *
 * Asserted per section theme, not once for the file. A single "some declaration
 * exists" check would stay green if five of the six per-theme blocks lost their
 * declaration, which is exactly the regression it is here to catch.
 */
test('every themed section declares a real --color-link-base for the focus ring', () => {
  const layoutPath = path.join(
    componentsDir,
    '03-organisms',
    'layout',
    'layout',
    '_yds-layout.scss',
  );
  const layout = readFileSync(layoutPath, 'utf8');
  const lines = codeLines(layout).map(([, line]) => line.trim());

  // Every section theme the file styles, taken from the file itself so a new
  // theme is covered the day it is added rather than the day someone
  // remembers to update this list.
  const themes = [
    ...new Set(
      lines.flatMap((line) =>
        [...line.matchAll(/\[data-component-theme='([a-z]+)'\]/g)].map(
          (match) => match[1],
        ),
      ),
    ),
  ].filter((theme) => theme !== 'default');

  assert.ok(
    themes.length >= 5,
    `expected to find the section themes in _yds-layout.scss, found: ${themes}`,
  );

  themes.forEach((theme) => {
    // The block for this theme, from its selector to the closing brace.
    const start = lines.findIndex((line) =>
      line.startsWith(`&[data-component-theme='${theme}']`),
    );
    assert.notEqual(start, -1, `no block found for section theme '${theme}'`);

    const block = [];
    for (let i = start + 1; i < lines.length && lines[i] !== '}'; i += 1) {
      block.push(lines[i]);
    }

    const declaration = block.find((line) =>
      line.startsWith('--color-link-base:'),
    );

    assert.ok(
      declaration,
      `section theme '${theme}' declares no --color-link-base, so a focused ` +
        'link inside it falls back to the :root link colour, which is not ' +
        'guaranteed to have contrast against the section background',
    );
    assert.ok(
      !/var\(\s*--color-link-base\s*[,)]/.test(declaration),
      `section theme '${theme}' declares --color-link-base from itself, which ` +
        `is a cycle and takes the focus ring with it: ${declaration}`,
    );
  });
});

/**
 * `var()` naming a custom property that is declared nowhere is the same
 * silent-drop failure as a cycle, and the two travelled together: every
 * self-referential `--color-link-visited-hover` in tile-item sat next to
 * `--color-link-visited-base: var(--color-link-visited)`, and
 * `--color-link-visited` does not exist. Same for `--color-quote-callout`.
 *
 * Scoped to this known pair rather than to every custom property in the tree:
 * a general "every var() resolves" sweep would also have to model the tokens
 * package's `:root` and the Sass interpolation that generates property names,
 * which is #1632's build-time gate, not this ticket.
 */
test('undefined link/quote colour properties are not referenced', () => {
  ['--color-link-visited', '--color-quote-callout'].forEach((property) => {
    // Word-boundary on the end so `--color-link-visited-base` does not match.
    const violations = findInScss(new RegExp(`var\\(\\s*${property}\\s*[,)]`));

    assert.deepEqual(
      violations,
      [],
      `${property} is declared nowhere in the library or in the tokens ` +
        `package, so every read of it is dropped at computed-value time.` +
        `\n${violations.join('\n')}`,
    );
  });
});
