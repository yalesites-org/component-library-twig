/**
 * Fails if the Storybook/Drupal control parity audit has gone stale.
 *
 * Run with the Node test runner (needs `git` on PATH, like its sibling guards):
 *   node --test components/_storybook/control-parity-audit-coverage.test.mjs
 *
 * `docs/storybook-drupal-control-parity.md` inventories every Storybook control in
 * `01-atoms`, `02-molecules` and `03-organisms` and records, per control, whether a Drupal
 * editor can actually produce that state. It exists because Storybook had drifted from what
 * the platform ships, and the colour work was being spent on component states no site builder
 * can create (yalesites-org/YaleSites-Internal#1661).
 *
 * An inventory is only worth the review time if it is complete, and a hand-maintained table
 * silently stops being complete the first time somebody adds a control. This guard is the
 * cheap enforcement of the ticket's "no component skipped" requirement: add a control to any
 * `*-props.yml` and this goes red until the audit gets a row for it.
 *
 * What it checks is deliberately limited to the cells that are RESTATEMENTS of the props
 * file -- that a row exists, and that its Label and Twig prop still match the YAML. It never
 * checks Status, the Drupal columns, the recommended disposition or the Notes. Those are
 * human judgements, made by reading `atomic/templates/**` and `yalesites-project` config
 * that this repo cannot see from CI, and ratified in review; asserting them here would
 * freeze a call that is supposed to be revisited.
 *
 * DELETE THIS FILE once the **Ratified** column in the audit is filled in and the follow-up
 * tickets are raised. At that point the document becomes a point-in-time record of what the
 * review decided, and a control added afterwards has no business being back-filled into it --
 * so the guard would be actively wrong, not merely redundant. It guards a document while the
 * document is still being completed; it is not a permanent invariant.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Repo root, two levels up from `components/_storybook/`. */
const selfPath = fileURLToPath(import.meta.url);
const projectRoot = path.dirname(path.dirname(path.dirname(selfPath)));

const AUDIT = 'docs/storybook-drupal-control-parity.md';

/** Only the three tiers the audit covers; tokens, page layouts and examples are out of scope. */
const AUDITED_TIER = /^components\/(01-atoms|02-molecules|03-organisms)\//;
const PROPS_FILE = /-props\.yml$/;

/** The `---|---` line under a table header. */
const SEPARATOR = /^\|[\s:|-]+\|$/;

/**
 * Every tracked props file in the audited tiers.
 *
 * Tracked only, so the guard cannot go red on a developer's untracked scratch YAML that CI
 * will never see. Computed once at module scope rather than per test -- that is the sibling
 * guards' idiom (see `global-theme-stories.test.mjs`) and it keeps this to one `git`
 * subprocess instead of one per test.
 */
const propsFiles = execFileSync('git', ['ls-files'], {
  cwd: projectRoot,
  encoding: 'utf8',
})
  .split('\n')
  .filter((file) => AUDITED_TIER.test(file) && PROPS_FILE.test(file));

/** A top-level key in a props file -- one Storybook control. */
const CONTROL_KEY = /^([A-Za-z_][A-Za-z0-9_]*):\s*$/;
/** Its `name:` / `twigProp:` scalars, which sit at exactly two spaces of indent. */
const CONTROL_FIELD = /^ {2}(name|twigProp):\s*(.*?)\s*$/;
/**
 * Zero-indent lines that are legitimately not a control key: blanks, comments, and the
 * document marker.
 *
 * Anything else at zero indent that `CONTROL_KEY` does not match is a control this parse
 * cannot see -- and an unseen control is never required to appear in the audit, so the guard
 * would go green while covering less than it claims. That is the one failure mode that
 * matters here, so the last test flags the whole class rather than the individual shapes.
 * `foo: bar` (an inline value instead of a nested map) is one such shape; `aria-label:` (a
 * perfectly valid nested map whose key falls outside `CONTROL_KEY`'s character class) is
 * another, and enumerating them one at a time is how you miss the third.
 */
const NOT_A_CONTROL_KEY = /^(\s*$|#|---)/;

/**
 * The controls declared in a props file, each as `{ control, label, twigProp }`.
 *
 * A deliberately minimal line-based parse rather than a YAML dependency: the guard must run
 * under a bare `node --test` with no imports beyond node builtins, matching the other guards
 * in this directory. That is safe here because the shape it reads is narrow -- top-level keys
 * are unindented and end in a colon, and `name`/`twigProp` are unquoted single-line scalars
 * at two spaces (verified across all 63 props files). Deeper keys such as the folded
 * `description: >` blocks are indented further and so cannot be mistaken for either.
 *
 * `twigProp` is optional -- ten controls have none -- and comes back undefined for those.
 */
function controlsIn(relPath) {
  return readFileSync(path.join(projectRoot, relPath), 'utf8')
    .split('\n')
    .reduce((controls, line) => {
      const key = CONTROL_KEY.exec(line);
      if (key) return [...controls, { control: key[1] }];
      const field = CONTROL_FIELD.exec(line);
      const current = controls[controls.length - 1];
      if (!field || !current) return controls;
      const [, fieldName, value] = field;
      current[fieldName === 'name' ? 'label' : 'twigProp'] = value;
      return controls;
    }, []);
}

/** `| a | b |` -> `['a', 'b']`. */
function splitRow(line) {
  return line
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((part) => part.trim());
}

/** Lines of the audit document. */
const auditLines = readFileSync(path.join(projectRoot, AUDIT), 'utf8').split(
  '\n',
);

/**
 * Where a table's body ends: the first line after `start` that is not a body row.
 *
 * A line stops the body if it is not a table line at all, or if the line AFTER it is a
 * separator -- which means it is the next table's header, not a row of this one.
 */
function bodyEnd(start) {
  const rest = auditLines.slice(start);
  const stop = rest.findIndex(
    (line, i, all) =>
      !line.trim().startsWith('|') || SEPARATOR.test((all[i + 1] ?? '').trim()),
  );
  return stop === -1 ? auditLines.length : start + stop;
}

/**
 * The audit's inventory tables, as header-keyed row objects.
 *
 * Columns are read by HEADER NAME rather than by position, so that a human reordering or
 * inserting a column does not silently turn this guard into a check on the wrong cells. The
 * document also contains explanatory tables (the column legend, the status legend); only the
 * inventory tables carry both a Control and a Source column, so keying on that pair separates
 * data from prose without hard-coding a heading or a position.
 *
 * Tables are located by their `---|---` SEPARATOR line, whose predecessor is by definition the
 * header. An earlier version split the document on blank lines instead, which is wrong in a
 * way that matters: two tables in one block had all their rows collected together and the
 * second table's rows were then keyed by the FIRST table's column order, so every cell could
 * be read from the wrong column -- silently, and with the row count going up rather than
 * down, so no count assertion could catch it. Anchoring on the separator removes both the
 * blank-line assumption and that failure mode.
 *
 * Note the audit writes any literal pipe inside a cell as `&#124;` precisely so `splitRow`
 * stays correct -- a backslash-escaped pipe is valid Markdown but still splits here.
 */
const auditRows = auditLines.flatMap((line, i) => {
  if (i === 0 || !SEPARATOR.test(line.trim())) return [];
  const header = splitRow(auditLines[i - 1]);
  if (!header.includes('Control') || !header.includes('Source')) return [];
  return auditLines
    .slice(i + 1, bodyEnd(i + 1))
    .map((row) =>
      Object.fromEntries(
        header.map((key, col) => [key, splitRow(row)[col] ?? '']),
      ),
    );
});

/** Strips the backticks the table wraps code-ish cells in. */
const bare = (cellText) => cellText.replace(/`/g, '').trim();

test('the audit covers every props file in the audited tiers', () => {
  // Narrower than the per-control test below, and kept for the one case that test cannot
  // see: a props file with no controls at all, which contributes nothing to iterate over and
  // would otherwise be skipped in silence. It also fails with a much shorter message when a
  // whole component is missing, rather than one line per control.
  // `Drupal-only` rows have no props file to point at and carry an em dash, so they simply
  // never match a tracked path here.
  const sourced = new Set(auditRows.map((row) => bare(row.Source)));
  const missing = propsFiles.filter((file) => !sourced.has(file));
  assert.deepEqual(
    missing,
    [],
    `${AUDIT} has no rows sourced from these props files:\n  ${missing.join(
      '\n  ',
    )}`,
  );
});

/**
 * The two kinds of row in the audit.
 *
 * Inventory rows name the props file they came from. `Drupal-only` rows are editor controls
 * with no Storybook counterpart, so they have no props file to point at and carry an em dash
 * instead -- they are extra findings, not coverage, and nothing below looks them up.
 */
const propsSourcedRows = auditRows.filter((row) => bare(row.Source) !== '—');
const drupalOnlyRows = auditRows.filter((row) => bare(row.Source) === '—');

/**
 * Inventory rows keyed by `<props file> -> <control>`.
 *
 * Unique among rows sourced from a props file -- NOT across the whole document, where the
 * Drupal-only rows share the em-dash source and collide with each other. Building the map
 * from `propsSourcedRows` keeps that distinction true rather than merely unobserved; the
 * duplicate assertion below is what holds it.
 */
const rowsByControl = new Map(
  propsSourcedRows.map((row) => [
    `${bare(row.Source)} -> ${bare(row.Control)}`,
    row,
  ]),
);

/** The declared controls of every tracked props file, flattened with their source path. */
const declaredControls = propsFiles.flatMap((file) =>
  controlsIn(file).map((control) => ({ ...control, file })),
);

test('the audit has a row for every control in every props file', () => {
  const missing = declaredControls
    .map(({ file, control }) => `${file} -> ${control}`)
    .filter((key) => !rowsByControl.has(key));
  assert.deepEqual(
    missing,
    [],
    `${AUDIT} is missing a row for these controls:\n  ${missing.join('\n  ')}`,
  );
});

test("each row's Label and Twig prop still match its props file", () => {
  // These two cells are pure restatements of the YAML -- no judgement in them -- so unlike
  // Status or the Drupal columns they can be verified from this repo alone. Without this,
  // renaming a control's label or changing its twigProp leaves the audit row standing with
  // stale evidence and the suite green, which is the same silent staleness the coverage
  // check above exists to prevent, just one cell to the right.
  const mismatches = declaredControls
    .map(({ file, control, label, twigProp }) => {
      const row = rowsByControl.get(`${file} -> ${control}`);
      if (!row) return null; // already reported by the coverage test above
      // The table writes a missing twigProp as an em dash rather than an empty cell.
      const expected = twigProp ?? '—';
      if (bare(row.Label) === label && bare(row['Twig prop']) === expected)
        return null;
      return (
        `${file} -> ${control}: props say label ${JSON.stringify(label)} / ` +
        `twigProp ${JSON.stringify(expected)}, audit says ` +
        `${JSON.stringify(bare(row.Label))} / ${JSON.stringify(
          bare(row['Twig prop']),
        )}`
      );
    })
    .filter(Boolean);
  assert.deepEqual(
    mismatches,
    [],
    `${AUDIT} has rows whose evidence no longer matches the props file:\n  ${mismatches.join(
      '\n  ',
    )}`,
  );
});

test('the props files the guard scans are actually found', () => {
  // Guards the guard: `git ls-files` run from the wrong directory reports nothing and every
  // assertion above would vacuously pass.
  //
  // A bare total is not enough. `01-atoms` is only 8 of the 63 files and 19 of the 281
  // controls, so if that tier alone dropped out of the scan -- a renamed directory, a moved
  // component, a path that stops matching AUDITED_TIER -- the totals would still clear any
  // sensible floor while coverage silently narrowed. So each tier is asserted separately.
  ['01-atoms', '02-molecules', '03-organisms'].forEach((tier) => {
    assert.ok(
      propsFiles.some((file) => file.startsWith(`components/${tier}/`)),
      `no props files found under components/${tier}/ -- the scan is missing a whole tier`,
    );
  });
  assert.ok(
    propsFiles.length > 50,
    `expected the audited tiers to contain many props files, found ${propsFiles.length}`,
  );
  assert.ok(
    declaredControls.length > 200,
    `expected the props files to declare many controls, found ${declaredControls.length}`,
  );
});

test('no props file has a zero-indent line the parse cannot classify', () => {
  // The parse above is not a YAML parser, and its failure mode is silence: a control it
  // cannot see is simply never required to appear in the audit. Rather than enumerate the
  // shapes it would miss, this flags every zero-indent line that is neither a control key nor
  // obviously not one -- so a hyphenated key, a quoted key, an inline value, or a shape
  // nobody has thought of yet all fail loudly and name themselves. Enumerating shapes one at
  // a time is how you miss the third.
  //
  // This parse was checked triple-equal against a real YAML parser across all 63 files and
  // 281 controls, so the tree is clean today; this is what keeps it that way.
  const offenders = propsFiles.flatMap((file) =>
    readFileSync(path.join(projectRoot, file), 'utf8')
      .split('\n')
      .filter(
        (line) =>
          !NOT_A_CONTROL_KEY.test(line) &&
          !/^\s/.test(line) &&
          !CONTROL_KEY.test(line),
      )
      .map((line) => `${file}: ${line.trim()}`),
  );
  assert.deepEqual(
    offenders,
    [],
    "These zero-indent lines are not control keys this file's line-based parse can read, so\n" +
      'the controls they declare would be skipped in silence. Give them a plain nested map\n' +
      `with \`name:\` at two spaces, or teach the parse the new shape:\n  ${offenders.join(
        '\n  ',
      )}`,
  );
});

test('the audit table parses into the columns the guard reads', () => {
  // Guards the guard again: a renamed column would leave the `Source`/`Control` lookups
  // undefined, and the assertions above would report every control as missing rather than the
  // real problem. Failing here says "the table shape changed", which is the useful message.
  ['Source', 'Control', 'Status'].forEach((key) => {
    assert.ok(
      auditRows.length > 0 && auditRows.every((row) => key in row),
      `every audit table needs a "${key}" column`,
    );
  });

  // Exact, not a floor. A floor cannot see a table quietly falling out of the parse: drop the
  // ten-row Drupal-only table and 281 rows still clears any "> 200", with no props file
  // referencing those rows to notice. Tying the count to the data catches that, and catches a
  // duplicated or orphaned inventory row at the same time.
  assert.equal(
    propsSourcedRows.length,
    declaredControls.length,
    `expected one audit row per declared control (${declaredControls.length}), parsed ` +
      `${propsSourcedRows.length} rows sourced from a props file -- a row was duplicated, ` +
      'orphaned, or lost from the parse',
  );
  assert.equal(
    rowsByControl.size,
    propsSourcedRows.length,
    `${AUDIT} has duplicate rows for the same props file and control -- ` +
      `${propsSourcedRows.length} rows collapsed to ${rowsByControl.size} unique keys`,
  );
  assert.ok(
    drupalOnlyRows.length > 0,
    'the Drupal-only findings table parsed to zero rows -- it was removed, or its shape ' +
      'changed enough that the parse no longer sees it',
  );
});
