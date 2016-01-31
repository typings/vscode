import * as vscode from 'vscode';

export var initCommand = {
  name: 'typings.init',
  fn: function init(context) {
    if (!vscode.workspace.rootPath) {
      vscode.window.showInformationMessage('No folder opened');
      return;
    }
    vscode.window.showInformationMessage('Will be ready real soon!');
  }
};