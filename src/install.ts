import * as vscode from 'vscode';

export var installCommand = {
  name: 'typings.install',
  fn: function install(context) {
    if (!vscode.workspace.rootPath) {
      vscode.window.showInformationMessage('No folder opened');
      return;
    }

    vscode.window.showInformationMessage('Will be ready real soon!');
  }
};