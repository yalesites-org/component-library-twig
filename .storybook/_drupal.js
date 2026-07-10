// Simple Drupal.behaviors usage for Storybook

window.Drupal = { behaviors: {} };

(function (Drupal, drupalSettings) {
  Drupal.throwError = function (error) {
    setTimeout(function () {
      throw error;
    }, 0);
  };

  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || drupalSettings;

    // Guard against duplicate attachment within the same render cycle.
    // Without this, multiple useEffect calls in Storybook Docs view attach
    // duplicate event listeners, causing toggles to fire twice and appear broken.
    if (context._drupalBehaviorsAttached) return;
    context._drupalBehaviorsAttached = true;

    const behaviors = Drupal.behaviors;

    Object.keys(behaviors).forEach(function (i) {
      if (typeof behaviors[i].attach === 'function') {
        try {
          behaviors[i].attach(context, settings);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };

  Drupal.detachBehaviors = function (context, settings, trigger) {
    context = context || document;
    settings = settings || drupalSettings;
    trigger = trigger || 'unload';

    // Clear the attachment guard so behaviors re-attach on the next render.
    delete context._drupalBehaviorsAttached;

    const behaviors = Drupal.behaviors;

    Object.keys(behaviors).forEach(function (i) {
      if (typeof behaviors[i].detach === 'function') {
        try {
          behaviors[i].detach(context, settings, trigger);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };
})(Drupal, window.drupalSettings);
