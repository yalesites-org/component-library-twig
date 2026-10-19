/**
 * Pins the open state of the listing filter dropdowns (#1930):
 * - the open filter keeps its closed one-line height, with the "+N more"
 *   badge, instead of growing to show every pill;
 * - the "Type to filter" input sits at the top of the open panel;
 * - opening the list with the mouse highlights no term: the highlight (and
 *   the input's aria-activedescendant) only follows the keyboard.
 *
 *   node --test components/01-atoms/forms/views-filter-open-one-line.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// jsdom is not a direct dependency: it comes with @emulsify/core (through
// jest-environment-jsdom). jQuery needs a real DOM to run the behavior.
// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { parse } from 'postcss';
import * as sass from 'sass';

const dir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(dir, '../../..');

const root = parse(
  sass.compile(path.join(dir, '_yds-form.scss'), {
    loadPaths: [repoRoot, path.join(repoRoot, 'node_modules')],
    importers: [
      {
        findFileUrl: (url) =>
          url.startsWith('~')
            ? pathToFileURL(path.join(repoRoot, 'node_modules', url.slice(1)))
            : null,
      },
    ],
    quietDeps: true,
    logger: sass.Logger.silent,
  }).css,
);

const scaffold = '.ys-filter-form--scaffold';
const norm = (s) => s.replace(/\s+/g, ' ').trim();

// Declarations (prop, value) of every rule whose selector matches `matches`.
const decls = (matches) => {
  const found = [];
  root.walkRules((rule) => {
    if (rule.selectors.some((s) => matches(norm(s)))) {
      rule.walkDecls((d) => found.push([d.prop, d.value]));
    }
  });
  return found;
};
const has = (list, prop, value) =>
  list.some(([p, v]) => p === prop && (value === undefined || v === value));

const open = `${scaffold} .chosen-with-drop`;

test('an open filter keeps its fixed closed height', () => {
  const container = decls((s) => s === open);
  assert.ok(!has(container, 'height', 'auto'), 'open state releases height');
  const fixed = decls((s) => s === `${scaffold} .chosen-container`);
  assert.ok(has(fixed, 'height', '3.125rem'));
});

test('the open pill row stays on one line', () => {
  const row = decls(
    (s) => s.startsWith(open) && s.endsWith(' .chosen-choices'),
  );
  assert.ok(!has(row, 'flex-wrap', 'wrap'), 'open row wraps');
  assert.ok(!has(row, 'white-space', 'normal'), 'open row wraps');
  assert.ok(!has(row, 'overflow', 'visible'), 'open row spills');
});

test('the "+N more" badge and collapsed pills stay as they are while open', () => {
  const badge = decls(
    (s) => s.startsWith(open) && s.endsWith('.ys-select-more'),
  );
  assert.ok(!has(badge, 'display', 'none'), 'badge hidden while open');
  const overflow = decls(
    (s) => s.startsWith(open) && s.endsWith('.ys-search-choice--overflow'),
  );
  assert.ok(!has(overflow, 'display'), 'collapsed pills revealed while open');
});

test('the search input sits at the top of the open panel', () => {
  const field = decls((s) => s === `${open} li.search-field`);
  assert.ok(has(field, 'position', 'absolute'), 'search field not lifted');
  assert.ok(has(field, 'top', '100%'), 'search field not below the head');
  // On the panel in either state, so Chosen's drop-up check, which runs
  // before the list opens, measures the search row too.
  const drop = decls((s) => s === `${scaffold} .chosen-drop`);
  assert.ok(has(drop, 'padding-top'), 'panel keeps no room for the search');
  // The row must not be the search field's containing block, or its
  // overflow clip would hide the field.
  const row = decls((s) => s === `${open} .chosen-choices`);
  assert.ok(has(row, 'position', 'static'));
});

// Behavior: run yds-select.js against a stub Chosen instance. `picks` are
// the labels of the pills already in the row.
const setUpDom = ({ picks = [] } = {}) => {
  const pills = picks
    .map(
      (label, i) =>
        `<li class="search-choice"><span>${label}</span><button type="button" class="search-choice-close" data-option-array-index="${i}"></button></li>`,
    )
    .join('');
  const options = picks
    .map((label) => `<option selected>${label}</option>`)
    .join('');
  const dom = new JSDOM(
    `<form class="ys-filter-form ys-filter-form--scaffold">
      <div class="form-item__dropdown">
        <select multiple id="aud">${options}<option>A</option><option>B</option></select>
        <div class="chosen-container chosen-container-multi">
          <ul class="chosen-choices">
            ${pills}
            <li class="search-field"><input class="chosen-search-input" type="text"></li>
          </ul>
          <div class="chosen-drop"><ul class="chosen-results">
            <li class="active-result" id="aud-r-0">A</li>
            <li class="active-result" id="aud-r-1">B</li>
          </ul></div>
        </div>
      </div>
    </form>`,
    { runScripts: 'outside-only', pretendToBeVisual: true },
  );
  const { window } = dom;
  window.eval(
    fs.readFileSync(
      path.join(repoRoot, 'node_modules/jquery/dist/jquery.js'),
      'utf8',
    ),
  );
  // core/once: each id runs once per element.
  const seen = new WeakMap();
  window.once = (id, selector, context) => {
    const els =
      typeof selector === 'string'
        ? [...(context || window.document).querySelectorAll(selector)]
        : [selector];
    return els.filter((el) => {
      const ids = seen.get(el) || new Set();
      seen.set(el, ids);
      if (ids.has(id)) return false;
      ids.add(id);
      return true;
    });
  };
  window.Drupal = {
    behaviors: {},
    t: (s, args = {}) =>
      Object.keys(args).reduce((acc, k) => acc.split(k).join(args[k]), s),
  };
  const $ = window.jQuery;
  const select = window.document.getElementById('aud');
  const $input = $('.chosen-search-input');
  // jsdom has no layout: each visible pill is 100px, the badge 50px, and the
  // row 200px, so two pills fit alone but only one beside the badge.
  const row = window.document.querySelector('.chosen-choices');
  Object.defineProperty(row, 'clientWidth', { get: () => 200 });
  Object.defineProperty(row, 'scrollWidth', {
    get: () =>
      [...row.querySelectorAll('li.search-choice')].filter(
        (li) => !li.classList.contains('ys-search-choice--overflow'),
      ).length *
        100 +
      (row.querySelector('.ys-select-more') ? 50 : 0),
  });
  // Just the parts of Chosen 2.2.1 the behavior touches.
  const chosen = {
    container: $('.chosen-container'),
    search_field: $input,
    search_results: $('.chosen-results'),
    results_showing: false,
    is_disabled: false,
    results_data: [],
    result_highlight: null,
    result_do_highlight(el) {
      this.result_clear_highlight();
      this.result_highlight = el.addClass('highlighted');
      this.search_field.attr('aria-activedescendant', el.attr('id'));
    },
    result_clear_highlight() {
      if (this.result_highlight) {
        this.result_highlight.removeClass('highlighted');
      }
      this.result_highlight = null;
    },
    winnow_results_set_highlight() {
      this.result_do_highlight(
        this.search_results.find('.active-result').first(),
      );
    },
    winnow_results() {
      this.result_clear_highlight();
      this.winnow_results_set_highlight();
    },
    results_show() {
      this.results_showing = true;
      this.container.addClass('chosen-with-drop');
      this.winnow_results();
      $(select).trigger('chosen:showing_dropdown');
    },
    results_hide() {
      this.result_clear_highlight();
      this.results_showing = false;
      this.container.removeClass('chosen-with-drop');
      $(select).trigger('chosen:hiding_dropdown');
    },
    close_field() {
      this.results_hide();
    },
    keyupArrowCalls: 0,
    keyup_arrow() {
      this.keyupArrowCalls += 1;
    },
    showCalls: 0,
    // Chosen 2.2.1: with no highlight, Down re-runs results_show.
    keydown_arrow() {
      if (this.results_showing && this.result_highlight) {
        this.result_do_highlight(
          this.result_highlight.nextAll('li.active-result').first(),
        );
      } else {
        this.results_show();
      }
    },
    dropdown: $('.chosen-drop'),
    search_container: $('li.search-field'),
    pending_backstroke: null,
    // Chosen 2.2.1 with single_backstroke_delete on (the Drupal default).
    keydown_backstroke() {
      if (this.pending_backstroke) {
        this.choice_destroy(
          this.pending_backstroke.find('.search-choice-close'),
        );
        return this.clear_backstroke();
      }
      const last = this.search_container.siblings('li.search-choice').last();
      if (last.length) {
        this.pending_backstroke = last;
        return this.keydown_backstroke();
      }
      return undefined;
    },
    clear_backstroke() {
      if (this.pending_backstroke) {
        this.pending_backstroke.removeClass('search-choice-focus');
      }
      this.pending_backstroke = null;
    },
    choice_destroy(link) {
      const li = link.closest('li');
      const label = li.find('span').text();
      [...select.options].forEach((o) => {
        if (o.text === label) {
          Object.assign(o, { selected: false });
        }
      });
      li.remove();
    },
    should_dropup() {
      return false;
    },
  };
  $(select).on('chosen:showing_dropdown', () => {
    chosen.showCalls += 1;
  });
  $(select).data('chosen', chosen);
  window.eval(fs.readFileSync(path.join(dir, 'select/yds-select.js'), 'utf8'));
  window.Drupal.behaviors.chosenSelect.attach(window.document);
  const key = (k, target = $input[0]) =>
    target.dispatchEvent(
      new window.KeyboardEvent('keydown', { key: k, bubbles: true }),
    );
  const mousedown = (target = chosen.container[0]) =>
    target.dispatchEvent(
      new window.MouseEvent('mousedown', { bubbles: true, which: 1 }),
    );
  const frame = () =>
    new Promise((resolve) => {
      window.requestAnimationFrame(() => resolve());
    });
  const visiblePills = () =>
    [...row.querySelectorAll('li.search-choice')]
      .filter((li) => !li.classList.contains('ys-search-choice--overflow'))
      .map((li) => li.querySelector('span').textContent);
  const badge = () => $('.ys-select-more').text();
  return {
    $,
    window,
    chosen,
    select,
    $input,
    key,
    mousedown,
    frame,
    visiblePills,
    badge,
  };
};

test('opening the list with the mouse highlights no term', () => {
  const { chosen, $input, mousedown } = setUpDom();
  mousedown();
  chosen.results_show();
  assert.equal(chosen.search_results.find('.highlighted').length, 0);
  assert.equal($input.attr('aria-activedescendant'), undefined);
});

test('a list opened without a key (Tab focus) highlights no term', () => {
  const { chosen, key } = setUpDom();
  key('Tab');
  chosen.results_show();
  assert.equal(chosen.search_results.find('.highlighted').length, 0);
});

test('arrow keys and typing bring the highlight back', () => {
  ['ArrowDown', 'ArrowUp', 'a'].forEach((k) => {
    const { chosen, $input, key, mousedown } = setUpDom();
    mousedown();
    chosen.results_show();
    key(k);
    chosen.winnow_results();
    assert.equal(chosen.search_results.find('.highlighted').text(), 'A', k);
    assert.equal($input.attr('aria-activedescendant'), 'aud-r-0', k);
  });
});

test('a mouse click drops back to no highlight on the next refresh', () => {
  const { chosen, key, mousedown } = setUpDom();
  key('ArrowDown');
  chosen.results_show();
  assert.equal(chosen.search_results.find('.highlighted').length, 1);
  mousedown(chosen.search_results.find('li')[1]);
  chosen.winnow_results();
  assert.equal(chosen.search_results.find('.highlighted').length, 0);
});

test('closing the list forgets the keyboard cursor', () => {
  const { chosen, key } = setUpDom();
  key('ArrowDown');
  chosen.results_show();
  chosen.results_hide();
  chosen.results_show();
  assert.equal(chosen.search_results.find('.highlighted').length, 0);
});

test('clearing the highlight drops aria-activedescendant', () => {
  const { chosen, $input, key } = setUpDom();
  key('ArrowDown');
  chosen.results_show();
  assert.equal($input.attr('aria-activedescendant'), 'aud-r-0');
  chosen.result_clear_highlight();
  assert.equal($input.attr('aria-activedescendant'), undefined);
});

test('hover still highlights the term under the mouse', () => {
  const { chosen, $input, mousedown } = setUpDom();
  mousedown();
  chosen.results_show();
  // Chosen's mouseover handler calls result_do_highlight directly.
  chosen.result_do_highlight(chosen.search_results.find('#aud-r-1'));
  assert.equal(chosen.search_results.find('.highlighted').text(), 'B');
  assert.equal($input.attr('aria-activedescendant'), 'aud-r-1');
});

test('Up with no highlight starts at the last term', () => {
  const { chosen, $input, mousedown } = setUpDom();
  mousedown();
  chosen.results_show();
  chosen.keyup_arrow();
  assert.equal(chosen.search_results.find('.highlighted').text(), 'B');
  assert.equal($input.attr('aria-activedescendant'), 'aud-r-1');
  // With a highlight, Chosen's own Up handling runs.
  chosen.keyup_arrow();
  assert.equal(chosen.keyupArrowCalls, 1);
});

test('Down with no highlight highlights the first term without reopening', () => {
  const { chosen, $input, key, mousedown } = setUpDom();
  mousedown();
  chosen.results_show();
  assert.equal(chosen.showCalls, 1);
  key('ArrowDown');
  chosen.keydown_arrow();
  // results_show again would re-check drop-up and re-fire showing_dropdown.
  assert.equal(chosen.showCalls, 1, 'Down re-ran results_show');
  assert.equal(chosen.search_results.find('.highlighted').text(), 'A');
  assert.equal($input.attr('aria-activedescendant'), 'aud-r-0');
  chosen.keydown_arrow();
  assert.equal(chosen.search_results.find('.highlighted').text(), 'B');
});

test('Down on a closed field still opens it', () => {
  const { chosen, key } = setUpDom();
  key('ArrowDown');
  chosen.keydown_arrow();
  assert.equal(chosen.results_showing, true);
  assert.equal(chosen.showCalls, 1);
});

test('Backspace shows a collapsed last pill before removing it', async () => {
  const { chosen, select, frame, visiblePills, badge, $ } = setUpDom({
    picks: ['P1', 'P2', 'P3', 'P4'],
  });
  await frame();
  await frame();
  assert.deepEqual(visiblePills(), ['P1']);
  assert.equal(badge(), '+ 3 more');

  // First Backspace: P4 is collapsed, so mark it and bring it into view.
  chosen.keydown_backstroke();
  assert.equal(select.selectedOptions.length, 4, 'removed an unseen term');
  assert.deepEqual(visiblePills(), ['P4']);
  assert.ok(chosen.pending_backstroke.hasClass('search-choice-focus'));
  assert.equal(badge(), '+ 3 more');
  assert.equal(
    $('.ys-select-more').attr('aria-label'),
    '+ 3 more selected: P1, P2, P3',
  );

  // Second Backspace removes it.
  chosen.keydown_backstroke();
  assert.deepEqual(
    [...select.selectedOptions].map((o) => o.text),
    ['P1', 'P2', 'P3'],
  );
});

test('another key cancels the pending pill and restores the row', async () => {
  const { chosen, frame, visiblePills, badge } = setUpDom({
    picks: ['P1', 'P2', 'P3'],
  });
  await frame();
  await frame();
  chosen.keydown_backstroke();
  assert.deepEqual(visiblePills(), ['P3']);
  chosen.clear_backstroke();
  assert.deepEqual(visiblePills(), ['P1']);
  assert.equal(badge(), '+ 2 more');
});

test('Backspace still removes a visible last pill at once', async () => {
  const { chosen, select, frame } = setUpDom({ picks: ['P1', 'P2'] });
  await frame();
  await frame();
  chosen.keydown_backstroke();
  assert.deepEqual(
    [...select.selectedOptions].map((o) => o.text),
    ['P1'],
  );
});

test('the drop-up check counts the panel search row', () => {
  const { window, chosen } = setUpDom();
  // Room below the field: 300px. Panel: 280px of results, plus the 56px
  // search row that only the outer height includes.
  chosen.container.offset = () => ({ top: 0 });
  chosen.container.height = () => 50;
  chosen.dropdown.height = () => 280;
  chosen.dropdown.outerHeight = () => 336;
  Object.defineProperty(window.document.documentElement, 'clientHeight', {
    value: 350,
  });
  window.jQuery(window).scrollTop(0);
  assert.equal(chosen.should_dropup(), true);
});
