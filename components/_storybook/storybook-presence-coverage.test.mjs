/**
 * Keeps the audit's "no Storybook presence" list honest, permanently.
 *
 * Run with the Node test runner (needs `git` on PATH, like its sibling guards):
 *   node --test components/_storybook/storybook-presence-coverage.test.mjs
 *
 * `docs/storybook-drupal-control-parity.md` ends with a table of components that ship
 * templates but appear in no story, so they have zero controls, no documentation page and --
 * the reason it matters -- no contrast coverage. Two of them, `menu-toggle` and
 * `menu-in-this-section-toggle`, are real interactive UI that editors reach on every page
 * (yalesites-org/YaleSites-Internal#1757 tracks giving them stories).
 *
 * THIS FILE HAS NO EXPIRY, unlike its sibling `control-parity-audit-coverage.test.mjs`. That
 * one guards the inventory while the inventory is being completed and deletes itself once the
 * dispositions are ratified. This one guards a list that stays true afterwards, so the two
 * were split apart on 2026-09-21: a single file cannot both delete itself on ratification and
 * live forever, and welding the two lifetimes together is what turned CI red when the file was
 * restored with the column filled (yalesites-org/component-library-twig#728).
 *
 * WHAT IT DOES NOT DO, deliberately: it does not fail when a listed component GAINS a story.
 * Closing one of these gaps is the outcome the list exists to provoke, and the previous
 * version failed on exactly that -- it would have gone red the moment
 * yalesites-org/component-library-twig#741 merged, which is the PR that gives both menu
 * toggles their stories. A guard that fires on its own fix is a tripwire, so a newly covered
 * component is a PASS here; the row is then stale documentation, which review catches and CI
 * should not.
 *
 * The inverse -- failing when a storyless component is MISSING from the table -- was
 * considered and does not hold: `02-molecules/cards/reference-card` and its `event` child
 * ship templates, are rendered through no relative twig import, and are legitimately absent,
 * so the check would start red. Whether an unrendered directory is a component worth listing
 * or an implementation partial is a human call, and pinning it in a test would freeze that
 * call.
 *
 * What is left is the rot that is not a judgement: a row naming a component that no longer
 * exists or no longer ships templates, and a scan that has silently stopped seeing anything.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Repo root, two levels up from `components/_storybook/`. */
const selfPath = fileURLToPath(import.meta.url);
const projectRoot = path.dirname(path.dirname(path.dirname(selfPath)));

const AUDIT = 'docs/storybook-drupal-control-parity.md';

/** Only the three tiers the audit covers; tokens, page layouts and examples are out of scope. */
const AUDITED_TIERS = ['01-atoms', '02-molecules', '03-organisms'];
const AUDITED_TIER = new RegExp(`^components/(${AUDITED_TIERS.join('|')})/`);

/**
 * Every tracked file in the audited tiers.
 *
 * Tracked only, so the guard cannot go red on a developer's untracked scratch file that CI
 * will never see. One `git` subprocess for the whole file, as in the sibling guards.
 */
const trackedFiles = execFileSync('git', ['ls-files'], {
  cwd: projectRoot,
  encoding: 'utf8',
})
  .split('\n')
  .filter((file) => AUDITED_TIER.test(file));

const storyFiles = trackedFiles.filter((file) => /\.stories\.js$/.test(file));

/** Component directories that ship at least one template, audit-style (`02-molecules/menu`). */
const dirsWithTemplates = new Set(
  trackedFiles
    .filter((file) => /\.twig$/.test(file))
    .map((file) => path.posix.dirname(file).replace(/^components\//, '')),
);

/** `import x from './a/b.twig';` -- every story imports its markup relatively (asserted below). */
const TWIG_IMPORT = /from\s+'(\.[^']*\.twig)'/g;

/**
 * The same thing, but permissive: any quote style, any specifier.
 *
 * Exists only to be compared against `TWIG_IMPORT`. A story importing its markup through an
 * Emulsify namespace (`@organisms/...`) or in double quotes would not match the strict form,
 * so its directory would quietly never be credited as "rendered by a story" and the scan would
 * keep passing while seeing less than it claims.
 */
const ANY_TWIG_IMPORT = /from\s+['"]([^'"]*\.twig)['"]/g;

/**
 * Component directories some story renders, as audit-style paths.
 *
 * A directory counts as having Storybook presence when a story imports a `.twig` out of it,
 * which correctly credits the parent-story case the audit relies on: `layout.stories.js` sits
 * one level up from the template it imports, and `01-atoms/controls/*` are rendered by a story
 * in `01-atoms/controls/`.
 *
 * `path.posix` throughout: `git ls-files` always emits forward slashes and the import
 * specifier is source text, so both inputs are already POSIX.
 */
const dirsRenderedByAStory = new Set(
  storyFiles.flatMap((file) =>
    [
      ...readFileSync(path.join(projectRoot, file), 'utf8').matchAll(
        TWIG_IMPORT,
      ),
    ].map((match) =>
      path.posix
        .join(path.posix.dirname(file), path.posix.dirname(match[1]))
        .replace(/^components\//, ''),
    ),
  ),
);

/** The `---|---` line under a table header. */
const SEPARATOR = /^\|[\s:|-]+\|$/;

/** Lines of the audit document. */
const auditLines = readFileSync(path.join(projectRoot, AUDIT), 'utf8').split(
  '\n',
);

/** `| a | b |` -> `['a', 'b']`. */
function splitRow(line) {
  return line
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((part) => part.trim());
}

/**
 * How many lines of table body follow `start`.
 *
 * A line ends the body if it is not a table line, or if the line after it is a separator --
 * which makes it the next table's header rather than a row of this one.
 */
function bodyLength(start) {
  const rest = auditLines.slice(start);
  const stop = rest.findIndex(
    (line, i, all) =>
      !line.trim().startsWith('|') || SEPARATOR.test((all[i + 1] ?? '').trim()),
  );
  return stop === -1 ? rest.length : stop;
}

/**
 * The components the audit declares have no Storybook presence at all.
 *
 * Located by its own column shape (`Component` + `Templates`, and no `Control`), which is what
 * separates it from the inventory tables and the explanatory ones without hard-coding a
 * heading or a line number. Reading by header name rather than position means a human
 * reordering the columns cannot silently turn this into a check on the wrong cells.
 *
 * Kept deliberately small and local rather than shared with the expiring sibling: that file
 * gets deleted on ratification, and a permanent guard must not import from something designed
 * to disappear.
 */
const noPresenceComponents = auditLines.flatMap((line, i) => {
  if (i === 0 || !SEPARATOR.test(line.trim())) return [];
  const header = splitRow(auditLines[i - 1]);
  if (!header.includes('Component') || !header.includes('Templates')) return [];
  if (header.includes('Control')) return [];
  const column = header.indexOf('Component');
  return auditLines
    .slice(i + 1)
    .slice(0, bodyLength(i + 1))
    .map((row) => splitRow(row)[column].replace(/`/g, '').trim());
});

test('every component listed as having no Storybook presence still exists', () => {
  // The rot a permanent guard can catch without asserting a judgement: a row that names a
  // directory somebody has since renamed, moved or deleted. The list is only worth enforcing
  // while every line of it points at something real.
  const missing = noPresenceComponents.filter(
    (component) => !existsSync(path.join(projectRoot, 'components', component)),
  );
  assert.deepEqual(
    missing,
    [],
    `${AUDIT} lists these under "no Storybook presence" but the directory no longer exists ` +
      `-- update the table to match the tree:\n  ${missing.join('\n  ')}`,
  );

  const withoutTemplates = noPresenceComponents.filter(
    (component) =>
      existsSync(path.join(projectRoot, 'components', component)) &&
      !dirsWithTemplates.has(component),
  );
  assert.deepEqual(
    withoutTemplates,
    [],
    `${AUDIT} lists these as shipping templates with no story, but they have no tracked ` +
      `.twig at all -- they are container directories, which the table above them covers:\n  ${withoutTemplates.join(
        '\n  ',
      )}`,
  );
});

test('the story scan this check relies on is actually finding stories', () => {
  // Guards the guard. A scan run from the wrong directory reports nothing and every
  // assertion that iterates it passes vacuously. Per tier, not a bare total: `01-atoms` holds
  // a small minority of the files, so if that tier alone dropped out any sensible total would
  // still clear while coverage silently narrowed.
  AUDITED_TIERS.forEach((tier) => {
    assert.ok(
      storyFiles.some((file) => file.startsWith(`components/${tier}/`)),
      `no stories found under components/${tier}/ -- the scan is missing a whole tier`,
    );
  });

  assert.ok(
    dirsRenderedByAStory.size > 50,
    `expected stories to render many component directories, found ${dirsRenderedByAStory.size}`,
  );
  assert.ok(
    noPresenceComponents.length > 0,
    'the no-Storybook-presence table parsed to zero rows -- it was removed, or its shape ' +
      'changed enough that the parse no longer sees it',
  );

  // And that the strict scan saw every twig import there is to see. Without this, a story
  // written with a namespace or double-quoted specifier drops out silently.
  const missed = storyFiles.flatMap((file) => {
    const source = readFileSync(path.join(projectRoot, file), 'utf8');
    const strict = new Set([...source.matchAll(TWIG_IMPORT)].map((m) => m[1]));
    return [...source.matchAll(ANY_TWIG_IMPORT)]
      .map((m) => m[1])
      .filter((spec) => !strict.has(spec))
      .map((spec) => `${file} -> ${spec}`);
  });
  assert.deepEqual(
    missed,
    [],
    'these stories import twig in a form the presence scan does not match, so their ' +
      'directories are never credited -- make the import relative and single-quoted, or ' +
      `widen TWIG_IMPORT:\n  ${missed.join('\n  ')}`,
  );
});
