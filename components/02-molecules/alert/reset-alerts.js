/**
 * Exposes the story-only "Reset dismissed alerts" handler.
 *
 * The alert stories used to define this in an inline `<script>` inside the
 * returned markup. Storybook inserts a story's HTML string with `innerHTML`, and
 * per the HTML spec a `script` element inserted that way is never executed -- so
 * the function did not exist and the button's `onclick` threw
 * `ReferenceError: resetAlerts is not defined`. Two stories on the same docs page
 * also emitted the same `const resetAlerts`, so whichever script did run first
 * made the second a duplicate declaration.
 *
 * A story module, by contrast, is bundled and executed, so assigning to `window`
 * here reliably gives the inline `onclick` something to call. Nothing imports the
 * function itself -- the stories import this module purely for that side effect,
 * which is why it is not exported.
 */

/** Matches the prefix yds-alert.js writes its per-alert state under. */
const ALERT_STORAGE_PREFIX = 'ys-alert-id-';

/**
 * Clears remembered alert state and reloads so the alerts render fresh.
 *
 * Storage can be unavailable (private browsing, blocking extensions, quota), and
 * the reload is still worth doing in that case -- there is simply nothing stored
 * to clear.
 */
function resetAlerts() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(ALERT_STORAGE_PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  } catch (e) {
    // Nothing stored, so nothing to clear.
  }

  window.location.reload();
}

window.resetAlerts = resetAlerts;
