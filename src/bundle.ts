import * as vscode from 'vscode';
import {bundle} from 'typings-core';

export var bundleCommand = {
  name: 'typings.bundle',
  fn: function bundleFn(context: vscode.ExtensionContext): void {
    if (!vscode.workspace.rootPath) {
      vscode.window.showInformationMessage('No folder opened');
      return;
    }

    bundle({ cwd: vscode.workspace.rootPath, ambient: false, out: 'test' })
      .then(() => {
        vscode.window.showInformationMessage('Bundle completed');
      });
  },
};
