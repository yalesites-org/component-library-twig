// @emulsify/core's Storybook Drupal-behavior bootstrap has two bugs that
// break component interactivity in Storybook (canvas and Docs alike):
//
// 1. platform-behaviors.js's attachStorybookBehaviors() only waits for the
//    async Drupal shim (.storybook/_drupal.js) when a caller explicitly
//    passes `behaviorShimReady`. render-twig.js's TwigHtmlStory does not, so
//    it can race the shim's dynamic import and silently no-op forever for
//    that story instance.
// 2. .storybook/_drupal.js's Drupal.attachBehaviors has no duplicate-
//    attachment guard and never implements Drupal.detachBehaviors, so once
//    the race above is fixed, the two attach call sites (element-scoped and
//    document-wide) can double-bind click listeners, which then cancel each
//    other out on click.
//
// Patches both files directly. Idempotent via marker check per file.
import fs from 'fs';

function patchFile({ target, marker, replacements }) {
  const content = fs.readFileSync(target, 'utf8');

  if (content.includes(marker)) {
    return;
  }

  let patched = content;
  for (const { from, to } of replacements) {
    const next = patched.replace(from, to);
    if (next === patched) {
      throw new Error(
        `patch-emulsify-core-storybook-behaviors: expected content not found in ${target} — @emulsify/core may have changed shape. Check this script against the current file.`,
      );
    }
    patched = next;
  }

  fs.writeFileSync(target, patched);
}

// --- Fix 1: close the behavior-shim race in attachStorybookBehaviors() ---
patchFile({
  target: new URL(
    '../node_modules/@emulsify/core/src/storybook/platform-behaviors.js',
    import.meta.url,
  ),
  marker: 'YALESITES_STORYBOOK_BEHAVIOR_SHIM_READY',
  replacements: [
    {
      from: `export async function attachStorybookBehaviors(options = {}) {
  const adapter = normalizeStorybookPlatformAdapter(options.adapter);
  if (!adapter.attachDrupalBehaviors) {
    return false;
  }

  await (options.behaviorShimReady || Promise.resolve());`,
      to: `// YALESITES_STORYBOOK_BEHAVIOR_SHIM_READY
// Caches the shim import so any caller is safe by default, even one that
// forgets to pass behaviorShimReady (this is what previously raced).
let cachedBehaviorShimReady;

function getDefaultBehaviorShimReady(adapter) {
  if (!adapter.loadDrupalBehaviorShim) {
    return Promise.resolve();
  }
  if (!cachedBehaviorShimReady) {
    cachedBehaviorShimReady = import('../../.storybook/_drupal.js').catch(
      () => undefined,
    );
  }
  return cachedBehaviorShimReady;
}

export async function attachStorybookBehaviors(options = {}) {
  const adapter = normalizeStorybookPlatformAdapter(options.adapter);
  if (!adapter.attachDrupalBehaviors) {
    return false;
  }

  await (options.behaviorShimReady || getDefaultBehaviorShimReady(adapter));`,
    },
  ],
});

// --- Fix 2: restore a duplicate-attachment guard + detachBehaviors ---
patchFile({
  target: new URL(
    '../node_modules/@emulsify/core/.storybook/_drupal.js',
    import.meta.url,
  ),
  marker: 'YALESITES_STORYBOOK_BEHAVIOR_DEDUPE_GUARD',
  replacements: [
    {
      from: `  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || drupalSettings;
    /** @type {Object.<string, {attach: Function}>} */
    const behaviors = Drupal.behaviors;

    // Attach each registered behavior while isolating individual failures.
    Object.keys(behaviors).forEach(function (behaviorName) {
      // Drupal behavior names are project/module-defined by design.
      const behavior = behaviors[behaviorName];
      if (typeof behavior.attach === 'function') {
        try {
          behavior.attach(context, settings);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };
})(window.Drupal, window.drupalSettings);`,
      to: `  // YALESITES_STORYBOOK_BEHAVIOR_DEDUPE_GUARD
  // Marks each (element, behaviorName) pair once attached, so repeated
  // attachBehaviors() calls (from both the element-scoped TwigHtmlStory
  // effect and the document-wide preview decorator) don't double-bind
  // listeners. Walks the ancestor chain so a broader call recognizes work
  // already done by a narrower one.
  const ATTACHED_ATTR = 'data-drupal-behaviors-attached';

  function attachedBehaviorSet(node) {
    if (!node || typeof node.getAttribute !== 'function') return new Set();
    return new Set(
      (node.getAttribute(ATTACHED_ATTR) || '').split(' ').filter(Boolean),
    );
  }

  function markBehaviorAttached(node, name) {
    if (!node || typeof node.setAttribute !== 'function') return;
    const set = attachedBehaviorSet(node);
    set.add(name);
    node.setAttribute(ATTACHED_ATTR, [...set].join(' '));
  }

  function unmarkBehaviorAttached(node, name) {
    if (!node || typeof node.getAttribute !== 'function') return;
    const set = attachedBehaviorSet(node);
    set.delete(name);
    if (set.size) node.setAttribute(ATTACHED_ATTR, [...set].join(' '));
    else node.removeAttribute(ATTACHED_ATTR);
  }

  function coveredByAncestor(node, name) {
    for (let el = node; el; el = el.parentElement) {
      if (attachedBehaviorSet(el).has(name)) return true;
    }
    return false;
  }

  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || drupalSettings;
    const root = context === document ? document.documentElement : context;
    /** @type {Object.<string, {attach: Function}>} */
    const behaviors = Drupal.behaviors;

    // Attach each registered behavior while isolating individual failures.
    Object.keys(behaviors).forEach(function (behaviorName) {
      // Drupal behavior names are project/module-defined by design.
      const behavior = behaviors[behaviorName];
      if (typeof behavior.attach !== 'function' || !root) return;
      if (coveredByAncestor(root, behaviorName)) return;

      try {
        behavior.attach(context, settings);
      } catch (e) {
        Drupal.throwError(e);
      }
      markBehaviorAttached(root, behaviorName);
    });
  };

  Drupal.detachBehaviors = function (context, settings, trigger) {
    context = context || document;
    settings = settings || drupalSettings;
    const root = context === document ? document.documentElement : context;
    /** @type {Object.<string, {detach: Function}>} */
    const behaviors = Drupal.behaviors;

    Object.keys(behaviors).forEach(function (behaviorName) {
      const behavior = behaviors[behaviorName];
      if (typeof behavior.detach === 'function') {
        try {
          behavior.detach(context, settings, trigger || 'unload');
        } catch (e) {
          Drupal.throwError(e);
        }
      }
      if (root) unmarkBehaviorAttached(root, behaviorName);
    });
  };
})(window.Drupal, window.drupalSettings);`,
    },
  ],
});
