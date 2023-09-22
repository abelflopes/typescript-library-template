/**
 * Semantic Release setup
 * NOTE: cli flags will override configurations specified on this file
 * https://semantic-release.gitbook.io/semantic-release/
 *
 * This is a custom semantic release configuration, extends plugins to push to git and has some
 * environment based configurations relying on GH Actions environment variables
 *
 * Customizations differing from a standard config:
 * - dry run - dry run disables some plugins, and is allowed to run on any branch in a CI environment
 * - commit analyzer is running with conventional commits and chore and refactor changes trigger a patch version increase
 * - customized sections of release notes
 * - publish to npm when not in dry run and if npm publish flag is enabled, otherwise will just crate a release
 * - creates a github release when in CI and not in dry run
 * - pushes package & changelog changes to git when not in dry run and when push option is set
 */

const args = process.argv.slice(2).map((i) => i.split("-").join("").toLowerCase());

const options = {
  /** set to true if running on ci environment - allow publishing GitHub releases */
  // https://semantic-release.gitbook.io/semantic-release/usage/configuration#ci
  // process.env.CI is injected by GH Actions - https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
  // ci checks are disabled for dry run so that it is allowed to run on pull requests
  ci: !!process.env.CI,
  /** if set to true will prevent:
   * - package publish
   * - tag creation
   * - pushing to remote  */
  dryRun: args.includes("dryrun") || false,
  // If to tot true will publish package to registry
  npmPublish: true,
  //if set to true, will push version & changelog changes to remote
  push: true,
  // Path for changelog file
  changelogFile: "CHANGELOG.md",
};

/**
 * https://semantic-release.gitbook.io/semantic-release/usage/configuration
 * @type import("semantic-release").GlobalConfig
 */

const config = {
  // https://semantic-release.gitbook.io/semantic-release/usage/configuration#tagformat
  tagFormat: "v${version}",
  // https://semantic-release.gitbook.io/semantic-release/usage/configuration#extends
  // https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#workflow-configuration
  /**
   * sync with release workflow config
   * @see {@link file://./.github/workflows/release.yml}
   */
  branches: [
    // in case of dry run, allow any branch
    options.dryRun
      ? "**"
      : {
          name: "master",
          prerelease: false,
          channel: false,
        },
  ],
  // https://semantic-release.gitbook.io/semantic-release/usage/configuration#ci
  ci: options.ci,
  // https://semantic-release.gitbook.io/semantic-release/usage/configuration#debug
  debug: false,
  // https://semantic-release.gitbook.io/semantic-release/usage/configuration#dryrun
  dryRun: options.dryRun,
  plugins: (() => {
    const plugins = [
      // Defines versioning effects commits cause
      // https://github.com/semantic-release/commit-analyzer
      [
        "@semantic-release/commit-analyzer",
        {
          // Sync with commit convention tools
          // https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-conventionalcommits
          preset: "conventionalcommits",
          releaseRules: [
            /**
             * Prevent docs, chore and refactor(docs) typed / scoped commits
             * from affecting versions
             * https://github.com/semantic-release/commit-analyzer#releaserules
             * Defaults (when unmatched)
             * https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js
             */
            { type: "refactor", release: "patch" },
            { type: "style", release: "patch" },
          ],
        },
      ],
      // Defined how the changelog content (release notes) is structured & generated
      // https://github.com/semantic-release/release-notes-generator
      [
        "@semantic-release/release-notes-generator",
        {
          preset: "conventionalCommits", // NOTE: should be synced with lerna config
          presetConfig: {
            // https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.0.0/README.md#types
            types: [
              {
                type: "feat",
                section: "Features",
                hidden: false,
              },
              {
                type: "fix",
                section: "Bug Fixes",
                hidden: false,
              },
              {
                type: "perf",
                section: "Performance",
                hidden: false,
              },
              {
                type: "refactor",
                section: "Code Refactoring",
                hidden: false,
              },
              {
                type: "revert",
                section: "Changes Reverted",
                hidden: false,
              },
              { type: "docs", hidden: true },
              { type: "test", hidden: true },
              { type: "style", hidden: true },
              { type: "chore", hidden: true },
            ],
          },
        },
      ],
      // Create/update changelog file
      // https://github.com/semantic-release/changelog
      [
        "@semantic-release/changelog",
        {
          changelogFile: options.changelogFile,
        },
      ],
    ];

    // Publish in npm registry
    // https://github.com/semantic-release/npm
    if (!options.dryRun)
      plugins.push([
        "@semantic-release/npm",
        {
          npmPublish: options.npmPublish,
        },
      ]);

    // Create GitHub release
    // https://github.com/semantic-release/github
    if (!options.dryRun && options.ci)
      plugins.push([
        "@semantic-release/github",
        {
          // sync with package.json files
          assets: "dist/**/*",
          successComment: false,
          failComment: false,
        },
      ]);

    // Push changes to remote
    // https://github.com/semantic-release/git
    if (!options.dryRun && options.push)
      plugins.push([
        "@semantic-release/git",
        {
          assets: ["package.json", options.changelogFile],
          message: "chore(release): publish [no ci]",
        },
      ]);

    return plugins;
  })(),
};

module.exports = config;
