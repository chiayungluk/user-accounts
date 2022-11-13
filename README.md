# Try-Node-Nest

[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/chiayungluk/try-node-nest)
![GitHub](https://img.shields.io/github/license/chiayungluk/try-node-nest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)


## Description

This repository intends to be used as a starter for developing
<a href="http://nodejs.org" target="_blank">Node.js</a> server-side applications with the framework [Nest](https://nestjs.com).

It setup a full-featured development environment using <a href="https://code.visualstudio.com/docs/devcontainers/containers" target="_blank">Visual Studio Code Dev Containers</a>, which is a <a href="https://www.docker.com" target="_blank">Docker</a> container with a well-defined tool/runtime stack and its prerequisites. It also enforces 
<a href="https://eslint.org" target="_blank">ESLint</a>,
<a href="https://eslint.org" target="_blank">Prettier</a> and
<a href="https://commitlint.js.org/#/" target="_blank">commitlint</a> by git hooks, and the version management and release publishing will be fully automated by <a href="https://semantic-release.gitbook.io/semantic-release/" target="_blank">semantic-release</a>.

Click [here](https://github.com/codespaces/new?template_repository=chiayungluk/try-node-nest) to try it quickly in github codespace or [here](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/chiayungluk/try-node-nest) to open the repository in Visual Studio Desktop.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Try-Node-Nest is [MIT licensed](LICENSE).
