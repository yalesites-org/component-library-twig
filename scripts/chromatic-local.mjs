// Runs Chromatic from a developer machine against the branch you are on.
//
// Why this exists: Chromatic baselines attach to a git branch, not to `develop`, so a
// baseline can be taken without merging anything. That is the whole point while the
// visual-regression epic (YaleSites-Internal#1321) is still in flight -- see #1606.
//
// The safety that matters here is the snapshot allowance. "Local" only describes where
// the CLI runs: snapshots still upload to Chromatic and draw on the same monthly quota as
// CI, and one unscoped run of this library is a material slice of it. So this script
// DRY RUNS BY DEFAULT and only publishes when you pass `--publish`. Publishing before
// #1602 (scope to visreg-tagged stories) and #1603 (port the masks) means re-baselining
// against a noisy baseline, which is exactly what #1606 warns off.
//
// Usage:
//   export CHROMATIC_PROJECT_TOKEN=...        # from Chromatic project settings, never committed
//   npm run chromatic:local                   # build + dry run, publishes nothing
//   npm run chromatic:local -- --publish      # build + publish (takes/updates the baseline)
//   npm run chromatic:local -- --skip-build   # reuse the existing .out build
//   npm run chromatic:local -- --publish --only-story-names 'Organisms/Banners/**'
//
// Any argument this script does not recognise is forwarded to the Chromatic CLI, so
// `--only-story-names`, `--branch-name`, `--auto-accept-changes` and friends all work.
import { spawnSync } from 'child_process';
import fs from 'fs';

const OWN_FLAGS = new Set(['--publish', '--skip-build', '--help', '-h']);

const argv = process.argv.slice(2);
const wantsHelp = argv.some((arg) => arg === '--help' || arg === '-h');
const publish = argv.includes('--publish');
const skipBuild = argv.includes('--skip-build');
const passthrough = argv.filter((arg) => !OWN_FLAGS.has(arg));

const buildDir = new URL('../.out/', import.meta.url);
const chromaticBin = new URL('../node_modules/.bin/chromatic', import.meta.url);

if (wantsHelp) {
  // The usage block above is the documentation; print it rather than restating it.
  const source = fs.readFileSync(new URL(import.meta.url), 'utf8');
  const usage = source
    .split('\n')
    .filter((line) => line.startsWith('//'))
    .map((line) => line.replace(/^\/\/ ?/, ''))
    .join('\n');
  process.stdout.write(`${usage}\n`);
  process.exit(0);
}

if (!process.env.CHROMATIC_PROJECT_TOKEN) {
  process.stderr.write(
    'CHROMATIC_PROJECT_TOKEN is not set.\n\n' +
      'Get the project token from the Chromatic project settings and export it:\n' +
      '  export CHROMATIC_PROJECT_TOKEN=<token>\n\n' +
      'It is a secret: do not commit it or paste it into a PR.\n',
  );
  process.exit(1);
}

if (!fs.existsSync(chromaticBin)) {
  process.stderr.write(
    'The Chromatic CLI is not installed. It ships as a dependency of\n' +
      '@chromatic-com/storybook, so run `npm install` first.\n',
  );
  process.exit(1);
}

const run = (command, args, label) => {
  process.stdout.write(`\n> ${label}\n`);
  const result = spawnSync(command, args, { stdio: 'inherit', shell: false });
  if (result.error) {
    process.stderr.write(`${label} could not start: ${result.error.message}\n`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

if (skipBuild) {
  if (!fs.existsSync(buildDir)) {
    process.stderr.write(
      '--skip-build was passed but .out does not exist. Drop the flag to build it.\n',
    );
    process.exit(1);
  }
  process.stdout.write('Reusing the existing .out build (--skip-build).\n');
} else {
  // `storybook:build` carries the raised heap the Vite build needs and writes to `.out`.
  run('npm', ['run', 'storybook:build'], 'npm run storybook:build');
}

// `storybookBuildDir` is already `.out` in chromatic.config.json. It is repeated here
// because it is the setting that fails quietly: pointed anywhere else, Chromatic
// publishes whatever it finds and reports success.
const chromaticArgs = ['--storybook-build-dir', '.out'];

if (publish) {
  process.stdout.write(
    '\nPublishing to Chromatic. These snapshots count against the monthly allowance.\n',
  );
} else {
  chromaticArgs.push('--dry-run');
  process.stdout.write(
    '\nDry run: checks the config and git ancestry, uploads nothing, costs no snapshots.\n' +
      'Re-run with --publish when you actually want to take or update the baseline.\n',
  );
}

run(
  chromaticBin.pathname,
  [...chromaticArgs, ...passthrough],
  `chromatic ${[...chromaticArgs, ...passthrough].join(' ')}`,
);
