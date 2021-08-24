# noteli

A CLI based Notes App built using TypeScript, MongoDB and Auth0.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/noteli.svg)](https://npmjs.org/package/noteli)
[![Downloads/week](https://img.shields.io/npm/dw/noteli.svg)](https://npmjs.org/package/noteli)
[![License](https://img.shields.io/npm/l/noteli.svg)](https://github.com/sahilpabale/noteli/blob/master/package.json)

<!-- toc -->

- [noteli](#noteli)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g noteli
$ noteli COMMAND
running command...
$ noteli (-v|--version|version)
noteli/1.1.5 win32-x64 node-v14.16.1
$ noteli --help [COMMAND]
USAGE
  $ noteli COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`noteli auth`](#noteli-auth)
- [`noteli help [COMMAND]`](#noteli-help-command)
- [`noteli whoami`](#noteli-whoami)

## `noteli auth`

```
USAGE
  $ noteli auth
```

_See code: [src/commands/auth.ts](https://github.com/sahilpabale/noteli/blob/v1.1.5/src/commands/auth.ts)_

## `noteli help [COMMAND]`

display help for noteli

```
USAGE
  $ noteli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `noteli whoami`

```
USAGE
  $ noteli whoami
```

_See code: [src/commands/whoami.ts](https://github.com/sahilpabale/noteli/blob/v1.1.5/src/commands/whoami.ts)_

<!-- commandsstop -->
