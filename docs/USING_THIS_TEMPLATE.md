# Using This Template

To properly use this template to start your project, follow the steps below 
(most of them are simple bulk find and replace actions).

1. replace all the repository name references to your repository

```diff
- https://github.com/abelflopes/typescript-library-template
+ https://github.com/<your repo name>
```

2. replace all the references of the main package name

```diff
- @abelflopes/typescript-library-template
+ <your package name>
```

3. remove features of the template that you don't want to use

> For example, in case you don't want to use the automated documentation generation and deployment,
> you'd need to uninstall the typedoc dependency, remove the configuration file, delete the github workflow
> and remove the redundant gitignore entries for the generated docs
>
> Make sure you review the whole codebase before and after removing features 
> in order to make sure everything is kept tidy and clean

Example of a [repository using this template](https://github.com/abelflopes/eslint-config-tsr-pro) that publishes a [package](https://www.npmjs.com/package/@abelflopes/eslint-config-tsr-pro) to npm


## Automated release process

The release process is done with semantic-release through github actions, this is the most demanding part of the template in terms of configuration as you might want to tweak some settings.
- The release configuration is defined on `.releaserc.js`
    - you can enable or disable publishing to the registry
- The CI release automation is defined on `.github/workflows/release.yml`
    - there are two environment secrets that need to be configured on the repository:
        - `GIT_TOKEN` - github PAT with access to allow pushing to the repository even if there are branch protection rules set, this is necessary for the changelog and package.json version to be updated during the release
        - `NPM_TOKEN` - token that should be configured to publish to the desired registry, if publishing to github packages it can be the same as the git token, if publishing to npm it can be configured on npm access tokens
    - immediately before the release, the workflow creates an `.npmrc` file that will setup the user and registry to use, check the examples below that can be tweaked on the workflow file

Publishing a public package to npm

```yml
    - name: Setup npm auth
      run: |
        echo "//registry.npmjs.org :_authToken=${{ secrets.NPM_TOKEN }}" >> .npmrc
        echo "access=public" >> .npmrc
```

Publishing a private package to github packages

```yml
    - name: Setup npm auth
      run: |
        echo "//npm.pkg.github.com/:_authToken=${{ secrets.NPM_TOKEN }}" >> .npmrc
        echo "access=private" >> .npmrc
```

## Repository Configurations

### General

#### Default Branch

- Default branch - `master`

#### Pull Requests

- [x] - Allow merge commits - `default message`
- [x] - Allow squash merging - `default to pull request title and commit details`
- [ ] - Allow rebase merging
- [x] - Always suggest updating pull request branches
- [ ] - Allow auto-merge
- [x] - Automatically delete head branches 

### Branches

#### Branch Protection Rules

- Create branch protection rule for first/root level branches - `*`

##### Protect matching branches

- [x] - Require a pull request before merging
- [x] - Require approvals - `1` - (as many as you want)
- [x] - Dismiss stale pull request approvals when new commits are pushed
- [x] - Require review from Code Owners
- [x] - Require approval of the most recent reviewable push
- [x] - Require status checks to pass before merging - `validate`
- [x] - Require branches to be up to date before merging
- [x] - Require conversation resolution before merging
- [x] - Allow force pushes
- [x] - Specify who can force push

### Rules / Rulesets

Apply a configuration compatible with the branch protection rules

### Pages

- Build and deployment - `github actions

### Code security and analysis

#### Secret scanning

- [x] - Receive alerts on GitHub for detected secrets, keys, or other tokens
- [x] - Push protection

### Secrets and variables

#### Repository secrets

- `GIT_TOKEN` - github PAT with access to allow pushing to the repository even if there are branch protection rules set, this is necessary for the changelog and package.json version to be updated during the release

- `NPM_TOKEN` - token that should be configured to publish to the desired registry, if publishing to github packages it can be the same as the git token, if publishing to npm it can be configured on npm access tokens