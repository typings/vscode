import * as vscode from 'vscode';

export var listCommand = {
  name: 'typings.list',
  fn: function list(context) {
    if (!vscode.workspace.rootPath) {
      vscode.window.showInformationMessage('No folder opened');
      return;
    }

    vscode.window.showInformationMessage('Will be ready real soon!');
  }
};