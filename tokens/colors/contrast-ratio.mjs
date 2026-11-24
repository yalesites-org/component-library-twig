/**
 * WCAG 2.1 contrast math shared by the Tokens/Colors stories.
 *
 * Kept dependency-free on purpose: `colord` and `polished` are only present in
 * node_modules transitively, so neither may be imported directly. The formulas
 * below are the ones defined by WCAG 2.1 (relative luminance and contrast
 * ratio).
 *
 * Checks live in contrast-ratio.test.mjs — `node --test` runs them.
 */

/**
 * Contrast thresholds that actually exist in WCAG 2.1.
 *
 * Level A has no contrast success criterion at all, so it is deliberately
 * absent. AAA is included as secondary information rather than as a target.
 */
export const WCAG_LEVELS = [
  {
    id: 'normal-aa',
    label: 'Normal text',
    level: 'AA',
    criterion: '1.4.3',
    minimum: 4.5,
  },
  {
    id: 'large-aa',
    label: 'Large text',
    level: 'AA',
    criterion: '1.4.3',
    minimum: 3,
  },
  {
    id: 'non-text',
    label: 'UI & graphics',
    level: 'AA',
    criterion: '1.4.11',
    minimum: 3,
  },
  {
    id: 'normal-aaa',
    label: 'Normal text',
    level: 'AAA',
    criterion: '1.4.6',
    minimum: 7,
  },
  {
    id: 'large-aaa',
    label: 'Large text',
    level: 'AAA',
    criterion: '1.4.6',
    minimum: 4.5,
  },
];

/**
 * The AA normal-text minimum — the usual headline threshold.
 * Read from WCAG_LEVELS rather than restated, so there is one 4.5 in this file.
 */
export const AA_NORMAL_TEXT = WCAG_LEVELS.find(
  (level) => level.id === 'normal-aa',
).minimum;

/**
 * The distinct minimums, ascending, each with the criteria that share it.
 *
 * The five criteria only use three numbers — 3, 4.5 and 7 — so reporting per
 * *minimum* rather than per criterion says everything there is to say without
 * repeating a threshold under two names.
 */
export function thresholdGroups() {
  const minimums = [...new Set(WCAG_LEVELS.map((level) => level.minimum))];

  return minimums
    .sort((a, b) => a - b)
    .map((minimum) => ({
      minimum,
      levels: WCAG_LEVELS.filter((level) => level.minimum === minimum),
    }));
}

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

const HSL_PATTERN =
  /^hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)$/i;

/**
 * Parse a hex color into 8-bit RGB components.
 *
 * Accepts `#abc`, `#aabbcc`, and the same without the leading hash, in any
 * case, with surrounding whitespace. Returns null for anything else — callers
 * render guidance for a null rather than computing a ratio from a guess.
 */
export function parseHex(value) {
  if (typeof value !== 'string') return null;

  const match = value.trim().match(HEX_PATTERN);
  if (!match) return null;

  const digits = match[1];
  const full =
    digits.length === 3
      ? digits
          .split('')
          .map((d) => d + d)
          .join('')
      : digits;

  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/**
 * Parse the `hsl(h, s%, l%)` string format the color tokens are stored in.
 */
export function parseHsl(value) {
  if (typeof value !== 'string') return null;

  const match = value.trim().match(HSL_PATTERN);
  if (!match) return null;

  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;
  const a = s * Math.min(l, 1 - l);
  const channel = (n) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
  };

  return { r: channel(0), g: channel(8), b: channel(4) };
}

/** Format RGB components as a `#rrggbb` string. Passes null through. */
export function rgbToHex(rgb) {
  if (!rgb) return null;
  const toHex = (n) => n.toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/** Format RGB components as a `r, g, b` string. Passes null through. */
export function rgbToString(rgb) {
  if (!rgb) return null;
  return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

/**
 * WCAG 2.1 relative luminance.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 *
 * Module-private: callers want a ratio, and exporting this would be public API
 * with no consumer.
 */
function relativeLuminance(rgb) {
  if (!rgb) return null;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((component) => {
    const channel = component / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * WCAG 2.1 contrast ratio between two colors, from 1 to 21.
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function contrastRatio(rgbA, rgbB) {
  const a = relativeLuminance(rgbA);
  const b = relativeLuminance(rgbB);
  if (a === null || b === null) return null;

  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Format a ratio for display, truncated rather than rounded.
 *
 * Rounding would print a failing 4.499 as "4.50" beside a FAIL badge, which
 * reads as a bug in the table. Truncating keeps the number consistent with the
 * verdict, which is always computed from the unrounded ratio.
 */
export function formatRatio(ratio) {
  if (typeof ratio !== 'number' || Number.isNaN(ratio)) return null;
  // The epsilon absorbs binary representation error: 2.26 * 100 is
  // 225.99999999999997, which would otherwise truncate to 2.25. It is far too
  // small to lift a genuinely failing ratio over a threshold.
  return (Math.floor(ratio * 100 + 1e-9) / 100).toFixed(2);
}

/** Evaluate a ratio against every WCAG level. Returns [] for a null ratio. */
export function evaluateRatio(ratio) {
  if (typeof ratio !== 'number' || Number.isNaN(ratio)) return [];
  return WCAG_LEVELS.map((level) => ({
    ...level,
    passes: ratio >= level.minimum,
  }));
}

/** Pad every cell to its column's widest value so text columns line up. */
function formatTextTable(header, rows) {
  const widths = header.map((_, column) =>
    Math.max(
      header[column].length,
      ...rows.map((row) => String(row[column]).length),
    ),
  );
  const line = (cells) =>
    cells
      .map((cell, column) => String(cell).padEnd(widths[column]))
      .join('  ')
      .trimEnd();

  return [line(header), line(widths.map((width) => '-'.repeat(width)))]
    .concat(rows.map(line))
    .join('\n');
}

/**
 * A plain-text report of a contrast check, for handing to someone who was not
 * looking at the page — a designer proposing a palette, or a ticket.
 *
 * Text rather than CSV because the audience is a person reading it, not a
 * spreadsheet. Kept here rather than in the story so the layout is testable.
 *
 * @param {Object} report
 * @param {string} report.generatedOn Date stamp, supplied by the caller.
 * @param {Array} report.colors [{ label, hex }] in display order.
 * @param {Array} report.thresholds [{ minimum, usedFor, passing, total, isolated }].
 * @param {Array} report.pairs [{ a, b, ratio, verdict }] every pairing.
 */
export function formatContrastReport({
  generatedOn,
  colors,
  thresholds,
  pairs,
}) {
  const sections = [
    `YaleSites contrast check`,
    `Generated ${generatedOn}`,
    '',
    'COLORS CHECKED',
    formatTextTable(
      ['Name', 'Hex'],
      colors.map((color) => [color.label, color.hex]),
    ),
    '',
    'COVERAGE BY WCAG MINIMUM',
    formatTextTable(
      ['Minimum', 'Used for', 'Pairings passing', 'Slots with no partner'],
      thresholds.map((group) => [
        `${group.minimum}:1`,
        group.usedFor,
        `${group.passing} of ${group.total}`,
        group.isolated.length ? group.isolated.join(', ') : 'None',
      ]),
    ),
    '',
    'EVERY PAIRING',
    formatTextTable(
      ['Pairing', 'Ratio', 'Verdict'],
      pairs.map((pair) => [
        `${pair.a} / ${pair.b}`,
        `${formatRatio(pair.ratio)}:1`,
        pair.verdict,
      ]),
    ),
    '',
    'WCAG 2.1 thresholds',
    ...WCAG_LEVELS.map(
      (level) =>
        `  ${level.minimum}:1  ${level.label} (${level.level}), SC ${level.criterion}`,
    ),
    '  Level A has no contrast success criterion.',
    '',
  ];

  return sections.join('\n');
}

/**
 * Slots that cannot be paired with any *other* slot in the same palette at the
 * given minimum — the "no passing partner" case the story has to call out, not
 * bury in a wall of failures.
 *
 * @param {Object} palette Map of slot name to RGB components.
 * @param {number} minimum Ratio a pairing has to reach to count as a partner.
 */
export function findIsolatedSlots(palette, minimum) {
  const slots = Object.keys(palette);

  return slots.filter((slot) =>
    slots.every(
      (other) =>
        other === slot ||
        contrastRatio(palette[slot], palette[other]) < minimum,
    ),
  );
}
