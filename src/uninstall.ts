import * as vscode from 'vscode';

export var uninstallCommand = {
  name: 'typings.uninstall',
  fn: function uninstall(context) {
    if (!vscode.workspace.rootPath) {
      vscode.window.showInformationMessage('No folder opened');
      return;
    }

    vscode.window.showInformationMessage('Will be ready real soon!');
  }
};