# YaleSites Twig component library

All YaleSites projects have access to components in the YaleSites component library. Themes may choose which variations of components to implement, and options are available.

## Live component library

You can view the latest version of the component library at any time by visiting the [Deployed Storybook](https://yalesites-org.github.io/component-library-twig). All new commits to the `main` branch trigger a rebuild and deploy of the component library, so it will always be up-to-date with the latest released code.

## Viewing the component library locally

You may want to see work-in-progress on the component library, e.g. when reviewing a PR. These are the steps to do that:

- Clone this repo to the directory of your choice and move into it `git clone git@github.com:yalesites-org/component-library-twig.git && cd component-library-twig`
- If necessary, checkout the branch that has the work you want to review `git checkout <branch>` (replace `<branch>` with the actual branch name.)
- Install dependencies `npm install`
- Run the develop script `npm run develop`
- View the local storybook instance at the URL provided (typically `http://localhost:6006`.)

## Developing on this component library

If you need to make code changes in the component library, follow the steps above in the "Viewing the component library locally" section to get StoryBook running. Then, open the codebase in your editor of choice, and begin making code changes. Most changes will be reflected in the browser as you save files. If you create or add new files, you may need to cancel (<kbd>Ctrl</kbd> + <kbd>C</kbd>) and restart the `npm run develop` script in order for StoryBook to pick those up. Changes to existing file, however, should just take effect each time you save.

## Developing on the tokens repo within this one

There may be times when you need to create "hand-crafted" tokens, or pull in updates from Figma before they are actually published as a released package. You can use `npm link` to develop the tokens, and use them in this repo.

- Clone the tokens repo to your local machine and move into it `git clone git@github.com:yalesites-org/tokens.git && cd tokens`
- Run `npm link` to create a global link to this folder on your local machine.
- In the `component-library-twig` repo on your local machine, run `npm link @yalesites-org/tokens`. This will tell the component library to use your locally cloned version of the `tokens` repo, instead of downloading the package via npm.
- Now, you can make changes in the `tokens` repo locally, and run the build script to generate the build directory. Any time you do that, your local copy of the component library will use those locally built tokens. This make it really easy to verify the new tokens are being generated as expected before they are actually published.
- Once the new tokens are "finalized", they should be pushed up to a new PR against the `tokens` repo, and merged into `main` to publish them as a new version.
- After that is complete (usually takes a couple minutes), you should run `npm update @yalesites-org/tokens` in the component library to update the lock file to reference the new release of the tokens. If you skip this step, you'll continue to pull the previous tokens package, without the new tokens.

## Installing this package in another project

<details><summary>Prerequisites</summary>

Each environment that needs to pull @yalesites-org packages from GitHub needs to be authenticated using a "Personal Access Token". This only needs to be done once per-environment.

- Go to `https://github.com/settings/tokens/new`
  - In the "Note" field add something like "YaleSites GitHub Packages"
  - Choose an expiration value
  - Check the box for "write:packages" (this will automatically check all of the "repo" boxes as well)
  - Click "Generate token"
- On your local machine, create an environment variable. This process varies depending on the shell and operating system you use. It will be something similar to this though: `export KEY=value`.
  - The `key` for YaleSites projects needs to be `YALESITES_BUILD_TOKEN`
  - The `value` is the token you created above
- Done!

</details>

### Installation steps

There must be a `.npmrc` file in the project root that tells npm to get `@yalesites-org` packages from GitHub rather than npm.

- Create a `.npmrc` file in your project root (or modify an existing one) and add the following:

```bash
@yalesites-org:registry=https://npm.pkg.github.com
```

Then you can install the package like any other npm dependency.

```bash
npm install @yalesites-org/component-library-twig
```

## Releases

Any time something is pushed to the `main` branch on GitHub, a [GitHub Action](.github/workflows/release.yml) is run to determine whether a new release is needed (via semantic-release.)

This is an entirely automated process, so whether changes are pushed directly to `main` or if they go through the preferred PR workflow the release process will be run.
