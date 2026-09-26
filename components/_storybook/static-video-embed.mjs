/**
 * Stand-in for the live YouTube iframe in the video fixtures, for visreg
 * stories: same slot and sizing, inline black page, no outside request.
 * See "Video embeds" in STORYBOOK.md; `visreg-video-embed.test.mjs` enforces it.
 */
const STATIC_VIDEO_EMBED =
  '<iframe width="560" height="315" title="Video placeholder" frameborder="0" srcdoc="<style>html{background:#000}</style>"></iframe>';

export default STATIC_VIDEO_EMBED;
