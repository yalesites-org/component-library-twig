/**
 * Guards the link halo check's scope (YaleSites-Internal#1939).
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/link-halo-scope.test.mjs
 *
 * The first test is the guard itself: it scans every SCSS file in
 * `components/` and fails if a component draws the link halo but the halo
 * check would not render it, or if `HALO_COMPONENTS` lists a component that
 * no longer draws it. The rest pin the scanner on fixtures.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { planPages } from './link-halo.mjs';
import {
  EXCLUDED_TIERS,
  HALO_COMPONENTS,
  NARROW_VIEWPORT_COMPONENTS,
  NARROW_VIEWPORT_WIDTH,
  NO_HALO_LINKS,
  auditScope,
  componentOf,
  formatAudit,
  haloMixins,
  haloUsers,
  storyInScope,
  storyViewports,
} from './link-halo-scope.mjs';

const repoDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);
// Every stylesheet the build ships: the components, and `lib/`, whose
// link-treatment styles load with every story (`preview.js`).
const SHIPPED_ROOTS = ['components', 'lib'];
const files = SHIPPED_ROOTS.flatMap((root) =>
  readdirSync(path.join(repoDir, root), { recursive: true }).map(
    (file) => `${root}/${String(file).split(path.sep).join('/')}`,
  ),
).filter((file) => !file.includes('node_modules'));

test('every component that draws the link halo is checked, and only those', () => {
  const audit = auditScope({
    scss: files
      .filter((file) => /\.(scss|css)$/.test(file))
      .map((file) => ({
        path: file,
        source: readFileSync(path.join(repoDir, file), 'utf8'),
      })),
    stories: files.filter((file) => file.endsWith('.stories.js')),
  });
  assert.equal(formatAudit(audit), '');
});

const textLink = {
  path: '01-atoms/controls/text-link/_yds-text-link.scss',
  source: `
    @mixin descender-halo-defaults { text-shadow: 0.03em 0 var(--color-text-shadow); }
    @mixin link($x) { @include descender-halo-defaults; }
    @mixin plain-link { color: red; }
    .link { @include link(1); }
  `,
};
const fixture = (source) => ({
  path: '02-molecules/new-thing/_yds-new-thing.scss',
  source,
});
const audit = (scss, components) =>
  auditScope({
    scss: [textLink, ...scss],
    stories: [
      '01-atoms/controls/control.stories.js',
      '02-molecules/new-thing/new-thing.stories.js',
    ],
    components,
  });

[
  ['bare', '.x a { @include link(); }'],
  ['namespaced', '.x a { @include text-link.link(); }'],
  [
    'through a wrapper mixin',
    `@mixin my-link { @include text-link.link(); }
     @mixin my-other-link { @include my-link; }
     .x a { @include my-other-link; }`,
  ],
  [
    'through its own text-shadow',
    '.x a { text-shadow:\n  0.03em 0 var(--color-text-shadow); }',
  ],
  [
    'by setting its colour for the links inside it',
    '.x { --color-text-shadow: var(--color-site-footer-background-color); }',
  ],
].forEach(([how, source]) => {
  test(`a component drawing the halo ${how} fails until it is in scope`, () => {
    const out = audit([fixture(source)], ['01-atoms/controls']);
    assert.deepEqual(
      out.missing.map((user) => user.path),
      ['02-molecules/new-thing/_yds-new-thing.scss'],
    );
    const message = formatAudit(out);
    assert.match(
      message,
      /new-thing\/_yds-new-thing\.scss draws the link halo/,
    );
    assert.match(message, /Add '02-molecules\/new-thing' to HALO_COMPONENTS/);
    assert.match(message, /TESTING\.md/);

    assert.equal(
      formatAudit(
        audit(
          [fixture(source)],
          ['01-atoms/controls', '02-molecules/new-thing'],
        ),
      ),
      '',
    );
  });
});

test('a mixin from a namespace called "link" is not the link mixin', () => {
  assert.deepEqual(
    haloUsers([fixture('.x a { @include link.plain-link; }')]),
    [],
  );
});

test('wrapper mixins are resolved transitively', () => {
  const names = haloMixins([
    textLink,
    fixture(
      '@mixin a { @include b; } @mixin b { @include link.link(); } @mixin c { color: red; }',
    ),
  ]);
  assert.ok(names.has('a') && names.has('b'));
  assert.ok(!names.has('c') && !names.has('plain-link'));
});

test('a listed component that stopped drawing the halo is stale', () => {
  const out = audit(
    [fixture('.x a { color: red; }')],
    ['01-atoms/controls', '02-molecules/new-thing'],
  );
  assert.deepEqual(out.stale, ['02-molecules/new-thing']);
  assert.match(formatAudit(out), /Remove it from HALO_COMPONENTS/);
});

test('a listed component with no story is reported', () => {
  const out = auditScope({
    scss: [textLink, fixture('.x a { @include link(); }')],
    stories: ['01-atoms/controls/control.stories.js'],
    components: ['01-atoms/controls', '02-molecules/new-thing'],
  });
  assert.deepEqual(out.noStories, ['02-molecules/new-thing']);
  assert.match(formatAudit(out), /Add a story/);
});

test('stories are in scope by their component, docs and page examples never', () => {
  assert.equal(
    componentOf('./components/01-atoms/controls/x.stories.js'),
    '01-atoms/controls',
  );
  assert.ok(
    storyInScope({
      importPath: './components/02-molecules/cards/cards.visreg.stories.js',
    }),
  );
  assert.ok(
    !storyInScope({
      importPath: './components/00-tokens/colors/colors.stories.js',
    }),
  );
  assert.ok(
    !storyInScope({
      importPath: './components/05-page-examples/post/post.stories.js',
    }),
  );
  assert.ok(HALO_COMPONENTS.every((component) => !/^0[05]-/.test(component)));
});

test('the token tier may set the halo colour but not draw the halo', () => {
  const tokenFile = (source) => ({
    path: '00-tokens/colors/_themes.scss',
    source,
  });
  const setter = audit(
    [tokenFile('[data-x] { --color-text-shadow: red; }')],
    ['01-atoms/controls'],
  );
  assert.deepEqual(setter.excluded, []);
  assert.deepEqual(setter.missing, []);

  const drawer = audit(
    [tokenFile('.x a { @include link(); }')],
    ['01-atoms/controls'],
  );
  assert.deepEqual(
    drawer.excluded.map((user) => user.path),
    ['00-tokens/colors/_themes.scss'],
  );
});

test('the check plans only the in-scope components’ own stories, never page examples or token docs', () => {
  const entry = (id, importPath, tags = []) => [
    id,
    { type: 'story', id, title: id, name: 'Story', importPath, tags },
  ];
  const index = {
    entries: Object.fromEntries([
      entry(
        'molecules-callout--callout',
        './components/02-molecules/callout/callout.stories.js',
      ),
      entry(
        'molecules-callout-visreg--old-blues',
        './components/02-molecules/callout/callout.visreg.stories.js',
        ['visreg'],
      ),
      entry(
        'page-examples-standard-pages--basic-spotlights',
        './components/05-page-examples/standard-pages/standard-page.stories.js',
      ),
      entry(
        'tokens-colors--component-theme-color-pairings',
        './components/00-tokens/colors/colors.stories.js',
      ),
      entry(
        'introduction-welcome--welcome',
        './components/00-introduction/welcome.stories.js',
      ),
      entry(
        'molecules-embed--embed',
        './components/02-molecules/embed/embed.stories.js',
      ),
    ]),
  };
  const planned = planPages(index, {
    globalThemes: ['one'],
    labels: { one: 'Old Blues' },
    inScope: storyInScope,
  }).map((page) => page.id);
  assert.deepEqual(planned, [
    'molecules-callout--callout',
    'molecules-callout-visreg--old-blues',
  ]);
  assert.ok(
    HALO_COMPONENTS.every(
      (component) => !EXCLUDED_TIERS.includes(component.split('/')[0]),
    ),
  );
});

test('a halo mixin forwarded with a prefix is caught under the prefixed name', () => {
  const out = audit(
    [
      {
        path: '01-atoms/controls/button/_yds-button.scss',
        source: '@mixin fancy-link { @include text-link.link(); }',
      },
      {
        path: '01-atoms/atoms.scss',
        source: "@forward './controls/button/yds-button' as button-*;",
      },
      fixture(
        "@use '../../01-atoms/atoms';\n.x a { @include atoms.button-fancy-link; }",
      ),
    ],
    ['01-atoms/controls'],
  );
  assert.deepEqual(
    out.missing.map((user) => [user.path, user.found]),
    [
      [
        '02-molecules/new-thing/_yds-new-thing.scss',
        ['@include button-fancy-link'],
      ],
    ],
  );
  // The prefix alone does not make an unrelated mixin a halo mixin.
  assert.ok(
    !haloMixins([textLink, fixture('@mixin button-x { color: red; }')]).has(
      'button-link',
    ),
  );
});

test('a halo user outside components/ fails with what to do', () => {
  const out = audit(
    [
      {
        path: 'lib/link-treatment/link-treatment.scss',
        source: 'a.x { @include text-link.link(); }',
      },
    ],
    ['01-atoms/controls'],
  );
  assert.deepEqual(
    out.outside.map((user) => user.path),
    ['lib/link-treatment/link-treatment.scss'],
  );
  assert.deepEqual(out.missing, []);
  assert.match(
    formatAudit(out),
    /lib\/link-treatment\/link-treatment\.scss draws the link halo .* outside any component.*Move the rule into the component/,
  );
});

[
  [
    'an SCSS variable',
    '$halo: 0.03em 0 var(--color-text-shadow);\n.x a { text-shadow: $halo; }',
  ],
  [
    'a variable from another module',
    '.x a { text-shadow: tokens.$halo-stack; }',
    {
      path: '00-tokens/_halo.scss',
      source:
        '$halo-color: var(--color-text-shadow);\n$halo-stack: 0.03em 0 $halo-color;',
    },
  ],
  [
    'a custom property',
    '.x { --link-halo: 0.03em 0 var(--color-text-shadow); }\n.x a { text-shadow: var(--link-halo); }',
  ],
].forEach(([how, source, extra]) => {
  test(`a text-shadow carrying the halo colour through ${how} is caught`, () => {
    const out = audit(
      [...(extra ? [extra] : []), fixture(source)],
      ['01-atoms/controls'],
    );
    assert.deepEqual(
      out.missing.map((user) => [user.path, user.found]),
      [
        [
          '02-molecules/new-thing/_yds-new-thing.scss',
          ['text-shadow: ... var(--color-text-shadow)'],
        ],
      ],
    );
  });
});

test('a text-shadow that carries no halo colour, or one in a comment, is not a halo', () => {
  assert.deepEqual(
    haloUsers([
      fixture(
        '$shadow: 0 1px red;\n.x a { text-shadow: $shadow; }\n// text-shadow: var(--color-text-shadow);',
      ),
    ]),
    [],
  );
});

test('a line comment containing /* does not swallow the code after it', () => {
  assert.deepEqual(
    haloUsers([
      {
        path: '02-molecules/x/_x.scss',
        source: '// see tokens/*.scss\n.card a { @include link; }\n/* end */\n',
      },
    ]),
    [{ path: '02-molecules/x/_x.scss', found: ['@include link'] }],
  );
});

test('a protocol-relative url() is not a comment', () => {
  assert.deepEqual(
    haloUsers([
      fixture(
        '.x { background: url(//cdn.example.com/a.png); --color-text-shadow: red; }',
      ),
    ]),
    [
      {
        path: '02-molecules/new-thing/_yds-new-thing.scss',
        found: ['--color-text-shadow: ...'],
      },
    ],
  );
});

test('every NO_HALO_LINKS entry is an in-scope component with a reason', () => {
  Object.entries(NO_HALO_LINKS).forEach(([component, reason]) => {
    assert.ok(HALO_COMPONENTS.includes(component), component);
    assert.ok(reason.length > 20, component);
  });
});

test('the narrow viewport is below the 992px breakpoint, for in-scope components only', () => {
  // `$break-l` (992px) is where the action banner stops putting its text
  // over the image; the narrow pass has to land on the stacked side of it.
  assert.ok(NARROW_VIEWPORT_WIDTH < 992, String(NARROW_VIEWPORT_WIDTH));
  Object.entries(NARROW_VIEWPORT_COMPONENTS).forEach(([component, reason]) => {
    assert.ok(HALO_COMPONENTS.includes(component), component);
    assert.ok(reason.length > 20, component);
  });
  assert.deepEqual(
    storyViewports({
      importPath: './components/02-molecules/banner/action-banner.stories.js',
    }),
    [NARROW_VIEWPORT_WIDTH],
  );
  assert.deepEqual(
    storyViewports({
      importPath: './components/03-organisms/menu/menu.stories.js',
    }),
    [],
  );
});

test('the action banner is judged; the template-bound exclusions stay', () => {
  // YaleSites-Internal#1955: the action banner's text link is judged at the
  // narrow width, so it must not be excused. Quick links, the secondary nav
  // and In This Section cannot render a halo link without a template change.
  assert.equal('02-molecules/banner' in NO_HALO_LINKS, false);
  [
    '02-molecules/quick-links',
    '03-organisms/menu',
    '03-organisms/site-in-this-section',
  ].forEach((component) => {
    assert.ok(component in NO_HALO_LINKS, component);
    assert.doesNotMatch(NO_HALO_LINKS[component], /\n/, component);
  });
});
