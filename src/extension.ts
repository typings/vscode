// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import {bundleCommand} from './bundle';
import {initCommand} from './init';
import {installCommand} from './install';
import {listCommand} from './ls';
import {runAnyCommand} from './run-any';
import {searchCommand} from './search';
import {uninstallCommand} from './uninstall';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let commands = [
    bundleCommand,
    initCommand,
    installCommand,
    listCommand,
    runAnyCommand,
    searchCommand,
    uninstallCommand
  ];

  context.subscriptions.concat(commands.map((command) => {
    return vscode.commands.registerCommand(command.name, () => {
      command.fn(context);
    })
  }));
}

// this method is called when your extension is deactivated
export function deactivate() {
}