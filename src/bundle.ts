import * as vscode from 'vscode';
import {bundle} from 'typings-core';

import Config from './Config';

export var bundleCommand = {
  name: 'typings.bundle',
  fn: function bundleFn(context: vscode.ExtensionContext): void {
    if (!vscode.workspace.rootPath) {
      vscode.window.showInformationMessage('No folder opened');
      return;
    }

    const config = Config.read(vscode.workspace.rootPath);

    bundle({ cwd: vscode.workspace.rootPath, ambient: config.ambient, out: 'test' })
      .then(() => {
        vscode.window.showInformationMessage('Bundle completed');
      });
  },
};
