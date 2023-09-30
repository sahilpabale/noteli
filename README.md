# noteli

# What is Noetli
Noetli is a transformative notes application for all of your note-taking needs including making lists, scribbling down thoughts, etc. The application runs completley on the CLI. It is built using TypeScript for its User Interface, MongoDB for its backend database, and Auth0 for security/authentication. You can utilize a google, facebook, and/or microsoft account to store and maintain your notes.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/noteli.svg)](https://npmjs.org/package/noteli)
[![Downloads/week](https://img.shields.io/npm/dw/noteli.svg)](https://npmjs.org/package/noteli)
[![License](https://img.shields.io/npm/l/noteli.svg)](https://github.com/sahilpabale/noteli/blob/master/package.json)

<!-- toc -->
## _**Table of Contents**_
* [noteli](#noteli)
* [What is Noetli](#whatisnoteli)
* [Installation](#Installation)
* [Tutorial](#Tutorial)
* [Commands](#commands)
<!-- tocstop -->

# Installation
You will need to install [Node.js](https://nodejs.org/en/download) before being able to download run the noteli application.        
Then use the following command to download noteli:
<!-- usage -->
```sh-session
$ npm install -g noteli
```
Confirm the succesful download with the following command:
```sh-session
$ noteli (-v|--version|version)
noteli/1.5.4 win32-x64 node-v14.16.1
...
```
<!-- usagestop -->

# Tutorial
Steps to create your first note      
1. Login via login command(#noteli-create)
2. Create a note(name, contents, and id) with create command
3. Edit/update/read note based off respective command
4. Logout via logout command


For a step by step tutorial on installation guide, login/logout, how to create/edit your first note, etc. please visit the following [link](https://www.youtube.com/watch?v=GjddqepNroo)

# Commands

<!-- commands -->
* [`noteli create`](#noteli-create)
* [`noteli delete <ID>`](#noteli-delete-id)
* [`noteli help [COMMAND]`](#noteli-help-command)
* [`noteli login`](#noteli-login)
* [`noteli logout`](#noteli-logout)
* [`noteli read`](#noteli-read)
* [`noteli update <ID>`](#noteli-update-id)
* [`noteli whoami`](#noteli-whoami)

## `noteli create`

create a new note

```
USAGE
  $ noteli create

DESCRIPTION
  Helps you create a fresh new Note :)
```

_See code: [src/commands/create.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/create.ts)_

## `noteli delete <ID>`

delete your note(s)

```
USAGE
  $ noteli delete <ID>

DESCRIPTION
  You can delete some specific notes if you think they are not worthy.

EXAMPLE
  $ noteli delete 2
```

_See code: [src/commands/delete.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/delete.ts)_

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

## `noteli login`

login the user for noteli

```
USAGE
  $ noteli login

DESCRIPTION
  Uses Auth0 Social Login to authorize user using browser.
```

_See code: [src/commands/login.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/login.ts)_

## `noteli logout`

logout the user from noteli

```
USAGE
  $ noteli logout

DESCRIPTION
  Revokes the token and logs out user from system.
```

_See code: [src/commands/logout.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/logout.ts)_

## `noteli read`

read all your notes

```
USAGE
  $ noteli read
  $ noteli read <ID>

DESCRIPTION
  You can read all your notes or some specific note too.

EXAMPLES
  $ noteli read
  $ noteli read 2
```

_See code: [src/commands/read.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/read.ts)_

## `noteli update <ID>`

update your note(s)

```
USAGE
  $ noteli update <ID>

DESCRIPTION
  You can update some specific notes if you think they need some change.

EXAMPLE
  $ noteli update 2
```

_See code: [src/commands/update.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/update.ts)_

## `noteli whoami`

shows the current logged-in user

```
USAGE
  $ noteli whoami

DESCRIPTION
  Checks for the token and verifies with Auth0 for authencticity.
```

_See code: [src/commands/whoami.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/whoami.ts)_
<!-- commandsstop -->
