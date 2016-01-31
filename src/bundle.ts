import * as vscode from 'vscode';

export var bundleCommand = {
  name: 'typings.bundle',
  fn: function bundle(context) {
    if (!vscode.workspace.rootPath) {
      vscode.window.showInformationMessage('No folder opened');
      return;
    }

    vscode.window.showInformationMessage('Will be ready real soon!');
  }
};