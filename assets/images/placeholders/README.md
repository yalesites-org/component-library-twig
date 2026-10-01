# Placeholder images

Committed stand-ins for the sample images in Storybook fixtures and page examples.

## Why these are committed

The visual regression stories used to pull ~256 images from `picsum.photos`. Placeholder
images affect a story's rendered height, so the CI pixel-ceiling check cannot block them
while it measures — which made the build's outcome depend on a third-party host being up
and responsive. A slow or down `picsum.photos` turned CI red for reasons unrelated to the
code under review.

Committing them also removes real snapshot noise: `picsum.photos` served a _random_ photo
per request, so every capture of an image-bearing story differed from the last. These files
are byte-identical on every run.

`components/_storybook/no-third-party-images.test.mjs` fails the unit suite if a fixture
drifts back to a remote host. `components/_storybook/fixture-asset-urls.test.mjs` fails it
if a fixture points at an asset URL that no longer resolves.

## Licensing

**Procedurally generated for this repository with ImageMagick — no third-party source, no
attribution required.** They contain no photographic content and are not derived from any
existing image.

## The files

One image per aspect ratio used by the fixtures, sized to the largest width its `srcset`
advertises. `_image.twig` emits no `width`/`height` attributes, so a placeholder's real
aspect ratio is what drives rendered height — each file therefore matches the ratio of the
URL it replaced exactly, and swapping them in leaves measured story heights unchanged.

| File                   | Dimensions | Fixture ratio key | Used by                                         |
| ---------------------- | ---------- | ----------------- | ----------------------------------------------- |
| `placeholder-1x1.png`  | 2400x2400  | `1x1`             | `image.yml`, `media-grid.yml`                   |
| `placeholder-4x3.png`  | 2400x1800  | `4x3`             | `image.yml`, `media-grid.yml`                   |
| `placeholder-3x2.png`  | 2400x1600  | `3x2`             | `image.yml`, `media-grid.yml`, `post-grid.twig` |
| `placeholder-16x9.png` | 2400x1350  | `16x9`            | `image.yml`                                     |
| `placeholder-2x3.png`  | 1600x2400  | `2x3`             | `image.yml`                                     |
| `placeholder-5x8.png`  | 2400x3840  | `1x1.6`           | `image.yml`, `media-grid.yml`                   |
| `placeholder-6x1.png`  | 1200x200   | —                 | `figure.yml`                                    |

`placeholder-5x8.png` is the `1x1.6` fixture ratio written as whole numbers, so the
filenames read consistently.

Reference them by URL, the same way `assets/images/patterns/wavy.png` is referenced:

```yaml
image__src: '/assets/images/placeholders/placeholder-3x2.png'
```

That path resolves because Emulsify Core mounts the project's `assets/` directory at
`/assets` as a Storybook static directory — see `buildAssetStaticDirs()` in
`@emulsify/core/.storybook/main-static-assets.js`. **The `/assets` prefix is load-bearing:
nothing mounts a bare `images/` at the site root, so a URL written as
`/images/placeholders/...` returns a 404.** Anything new that stories need to fetch by URL
therefore belongs under `assets/`, and no build config has to change to serve it.

## Regenerating

Each file is a flat fill with an inset border and a diagonal cross — the conventional
"missing image" placeholder. Flat colour keeps them small (116 KB for all seven) and
PNG8 keeps them deterministic. Colours are muted and vary per ratio so it is obvious at
a glance which fixture a story is rendering; they are placeholder chrome rather than
design values, so they are intentionally not drawn from `@yalesites-org/tokens`.

```bash
cd assets/images/placeholders
gen() { RATIO=$1; W=$2; H=$3; BG=$4; FG=$5
  SW=$(( W/400 + 2 )); I=$(( SW/2 ))
  magick -size ${W}x${H} "xc:${BG}" \
    -stroke "$FG" -strokewidth $SW -fill none \
    -draw "line 0,0 $((W-1)),$((H-1))" \
    -draw "line $((W-1)),0 0,$((H-1))" \
    -draw "rectangle $I,$I $((W-1-I)),$((H-1-I))" \
    -strip -colors 16 "PNG8:placeholder-${RATIO}.png"; }

gen 1x1  2400 2400 '#e4e7ea' '#7d858d'
gen 4x3  2400 1800 '#e6e9e2' '#828a78'
gen 3x2  2400 1600 '#eae7e2' '#8d8579'
gen 16x9 2400 1350 '#e2e8ea' '#78878d'
gen 2x3  1600 2400 '#e7e3ea' '#857d8d'
gen 5x8  2400 3840 '#eae3e5' '#8d7d82'
gen 6x1  1200  200 '#e6e6e6' '#858585'
```

The bytes the command produces are the bytes that ship. The Vite build serves `assets/`
statically and runs no image optimisation over it, so — unlike the previous webpack build,
whose `ImageminPlugin` rewrote these files in place on a `NODE_ENV=production` build — there
is no post-processing pass to account for and no risk of a release build dirtying the
working tree. Commit whatever the command above writes.
