// Emulsify Core's Drupal behavior shim loads asynchronously (awaited inside a
// useEffect), so window.Drupal doesn't exist yet at module-evaluation time.
// lib/link-treatment/link-treatment.js registers Drupal.behaviors.linkPurpose
// at its own top level and needs window.Drupal.behaviors to exist synchronously
// before it's imported. Core's real shim later enriches this same object
// without clobbering it (window.Drupal = window.Drupal || {}).
window.Drupal = window.Drupal || { behaviors: {} };
