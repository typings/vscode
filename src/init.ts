import * as vscode from 'vscode';
import { init } from 'typings-core';
import * as fs from 'fs';

interface InitializeOption {
  cwd: string;
  upgrade?: boolean;
  /**
   * Path to tsd.json. If specified, it will be removed.
   */
  tsdPath?: string;
}

export function initialize(options: InitializeOption): any {
  const { cwd, upgrade } = options;

  return init({ cwd, upgrade })
  .then(() => {
    if (options.tsdPath) {
      fs.unlinkSync(options.tsdPath);
    }
 });
};

export var initCommand = {
  name: 'typings.init',
  fn: function initFn(context: vscode.ExtensionContext): void {
    if (!vscode.workspace.rootPath) {
      vscode.window.showInformationMessage('No folder opened');
    }

    let options: InitializeOption  = {
      cwd: vscode.workspace.rootPath,
    };

    vscode.workspace.findFiles('tsd.json', null, 1)
      .then((uriSet) => {
        if (uriSet.length > 1) {
          vscode.window.showErrorMessage(`Error in init, found ${uriSet.map(uri => uri.fsPath).join(',')}`);
        }

        if (uriSet.length === 1) {
          return vscode.window.showInformationMessage('Found tsd.json, do you want to upgrade?', 'No', 'Yes and delete tsd.json', 'Yes')
            .then((response) => {
              switch (response) {
                case 'Yes':
                  options.upgrade = true;
                  break;
                case 'Yes and delete tsd.json':
                default:
                  options.upgrade = true;
                  options.tsdPath = uriSet[0].fsPath;
              }
            });
        }
      })
      .then(() => {
        return initialize(options);
      })
      .then(() => {
          vscode.window.showInformationMessage(options.upgrade ?
            'Upgrade completed. Happy coding!' :
            'Initialize completed. Happy coding!');
      }, (err) => {
        vscode.window.showErrorMessage(err.message);
      });
  },
};

