# Typescript Package/Library Template

A plug and play template project to help you quickly implement and distribute a library, written in typescript.

## Features

- Typescript with file emitting to dist
- Strict code linting and formatting setup with eslint and prettier
- Plug and play tests with jest
- Compatible git, editor, prettier and eslint configs so that you don't run into linebreak related issues with contributors using other operating systems (unix/windows)
- Automated documentation generation based on code annotations with automated deployment through CI/CD workflows
- Listing of TODO's and FIXME's in code
- Validation CI/CD workflow
- Automated versioning with conventional commits and automated release through CI/CD workflows
- Github action to cleanup workflows and caches
- Pre configured package, make sure you rename it :)

## Using this template

### Commands

| Command | Description | Extra options |
| - | - | - |
| `npm start` | compiles into dist in watch mode |
| `npm run build` | compiles into dist |
| `npm run format` | checks for formatting issues | add ` -- --write` to fix formatting automatically |
| `npm run lint` | checks for code issues | add ` -- --fix` to fix issues automatically |
| `npm run test`| runs unit tests | add ` -- --watch` to run in watch mode |
| `npm run docs`| build the generated docs |
| `npm run todo`| list all TODO's and FIXME's |
| `npm run release`| perform a release, should not be used as this is set up to run through CI/CD workflows |