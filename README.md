# noteli

A CLI based Notes App built using TypeScript, MongoDB and Auth0. 

If you already use the command line for coding, why not use it to take notes? Now all of your notes can be stored conveniently within the command line, so you don't need to open a second application to take notes.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/noteli.svg)](https://npmjs.org/package/noteli)
[![Downloads/week](https://img.shields.io/npm/dw/noteli.svg)](https://npmjs.org/package/noteli)
[![License](https://img.shields.io/npm/l/noteli.svg)](https://github.com/sahilpabale/noteli/blob/master/package.json)

<!-- toc -->
* [noteli](#noteli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session

To install noteli, run the following command:
$ npm install -g noteli

Once noteli is installed, to run any command, type "noteli" followed by the command:
$ noteli COMMAND

To check which version of noteli you have installed, run the following command:
$ noteli (-v|--version|version)
Example result: noteli/1.5.4 win32-x64 node-v14.16.1

If you need help figuring out how a command works, run the following command:
$ noteli --help [COMMAND]

...
```
<!-- usagestop -->

# Commands
These are the commands that can be used within noteli:
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

This command creates a new note. 
```
USAGE
  $ noteli create

DESCRIPTION
  Helps you create a fresh new Note :)
  After you run the command, you will be prompted to enter a title for the note and the contents of the note.
  If the note is successfully created, you will see the message "Successfully created your note" along with the ID number of the note. 
```

_See code: [src/commands/create.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/create.ts)_

## `noteli delete <ID>`

This command can be used to delete your note(s).

```
USAGE
  $ noteli delete <ID>

DESCRIPTION
  You can delete specific notes using the note ID that was shown when the note was created.
  If the note was successfully deleted, you will see the message "Sad to see you deleting your Note :(".
  
EXAMPLE
  $ noteli delete 2
```

_See code: [src/commands/delete.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/delete.ts)_

## `noteli help [COMMAND]`

Display help for a specfic command or all commands within noteli

```
USAGE
  to display help for a specific command in noteli:
  $ noteli help [COMMAND]
  
  to display all commands in noteli:
  $noteli help --all

ARGUMENTS
  COMMAND  command that you need help with
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `noteli login`

Log into your noteli account

```
USAGE
  $ noteli login

DESCRIPTION
  Uses Auth0 Social Login to authorize user using browser. 
  When you use the login command, you will be asked if you would like to open the browser to login. If you select "yes", the browser will open and you can login with any social media account you have. If you are a new user, you will be registered as a new user and then logged into the application. If you are a returning user, log in to the same social media account you chose last time. If you have successfully logged in, you will receive the message "Logged in successfully as " followed by your email.
```

_See code: [src/commands/login.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/login.ts)_

## `noteli logout`

Log out of your noteli account

```
USAGE
  $ noteli logout

DESCRIPTION
  Revokes the token and logs out user from system. If you have successfully logged out of the system, you will receive the message "To use Noteli again run '$ noteli login'". 
```

_See code: [src/commands/logout.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/logout.ts)_

## `noteli read`

Read your notes

```
USAGE
  $ noteli read
  $ noteli read <ID>

DESCRIPTION
  You can either read all your notes or a specific note using its ID.

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
  You can update a specific note using its ID. 
  If you have successfully updated the note, you will receive the message "Successfully updated your note with "Successfully updated your note" followed by the note's ID.

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
  Checks for the token and verifies with Auth0 for authencticity, then displays the current user that is logged in. You will see the message "You are logged in as " followed by the name and email of the user that is logged in.
```

_See code: [src/commands/whoami.ts](https://github.com/sahilpabale/noteli/blob/v1.5.4/src/commands/whoami.ts)_
<!-- commandsstop -->
