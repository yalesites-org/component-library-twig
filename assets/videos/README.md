# Placeholder video

A committed stand-in for the sample video in the video-background fixtures and the
components that default to one.

## Why this is committed

The fixtures pointed at
`https://ia800301.us.archive.org/17/items/VjmorphVjLoops4/SequinSparkle02.mp4`.
That URL hardcodes a **specific** archive.org storage node, and archive.org moves items
between nodes: the item and the file both still exist, but `ia800301.us.archive.org` no
longer serves them, so the request now hangs and times out. The Video Background story
rendered an empty box with a play button, on production as well as in previews.

Repointing at whichever node currently serves the item would rot the same way, so the
sample is committed instead -- the same reasoning that moved the placeholder images off
`picsum.photos` (see `assets/images/placeholders/README.md`).

## Licensing

**Procedurally generated for this repository with ffmpeg -- no third-party source, no
attribution required.** It contains no filmed content.

## The file

`placeholder-loop.mp4` -- 1280x720, 10s, H.264, no audio track, 75 KB. Deliberately tiny
and low-contrast: it exists to prove the component plays a video and to sit behind text,
not to be looked at. Kept small because everything under `assets/` is copied into the
static Storybook build.

Reference it by URL, the same way the placeholder images are:

```yaml
video_background__content: '/assets/videos/placeholder-loop.mp4'
```

That resolves because Emulsify Core mounts the project's `assets/` directory at `/assets`.

## Regenerating

```bash
ffmpeg -f lavfi -i "gradients=s=1280x720:c0=0x0A2138:c1=0x2A5C8A:c2=0x0A2138:nb_colors=3:speed=0.015:d=10" \
  -t 10 -r 24 -c:v libx264 -pix_fmt yuv420p -crf 36 -preset slow -movflags +faststart -an \
  assets/videos/placeholder-loop.mp4 -y
```
