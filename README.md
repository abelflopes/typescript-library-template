[![Deploy Documentation](https://github.com/abelflopes/typescript-library-template/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/abelflopes/typescript-library-template/actions/workflows/deploy-docs.yml)
&nbsp;
[![Release](https://github.com/abelflopes/typescript-library-template/actions/workflows/release.yml/badge.svg)](https://github.com/abelflopes/typescript-library-template/actions/workflows/release.yml)
&nbsp;
[![Validate](https://github.com/abelflopes/typescript-library-template/actions/workflows/validate.yml/badge.svg)](https://github.com/abelflopes/typescript-library-template/actions/workflows/validate.yml)

# Typescript Library Package Template

A plug and play template project to help you quickly implement and distribute a library, written in typescript.

## Features

- **Typescript** with file emitting to dist
- Strict code linting and formatting setup with **eslint** and **prettier**
- Plug and play tests **with** jest
- Compatible git, editor, prettier and eslint configs so that you don't run into linebreak related issues with contributors using other operating systems (unix/windows)
- **Automated documentation generation** based on code annotations with automated deployment through CI/CD workflows, check it [here](https://abelflopes.github.io/typescript-library-template/)
- Listing of TODO's and FIXME's in code
- Validation CI/CD workflow
- **Automated versioning** with conventional commits and automated release through CI/CD workflows
- Github action to cleanup workflows and caches
- Local branch name validation & local + CI commit validation

## Using the template

- [Guide](./docs/USING_THIS_TEMPLATE.md)
- [Development](./docs/DEVELOPMENT.md)

## Tech stack

[Typescript](https://www.typescriptlang.org/)
&nbsp;
[Jest](https://jestjs.io/)
&nbsp;
[Husky](https://github.com/typicode/husky)
&nbsp;
[Commitlint](https://commitlint.js.org/#/)
&nbsp;
[Github Actions](https://docs.github.com/en/actions)
&nbsp;
[Semantic Release](https://semantic-release.gitbook.io/semantic-release/)
&nbsp;
[Eslint](https://eslint.org/)
&nbsp;
[Prettier](https://prettier.io/)
&nbsp;
[Typedoc](https://typedoc.org/)