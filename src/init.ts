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
    let options: InitializeOption = {
      cwd: vscode.workspace.rootPath,
    };

    vscode.workspace.findFiles('typings.json', null, 1)
      .then((typingsFilesUris) => {
        if (typingsFilesUris.length === 1) {
          throw new Error('typings.json already exists');
        }
      })
      .then(
      () => vscode.workspace.findFiles('tsd.json', null, 1),
      (err) => {
        vscode.window.showErrorMessage(err.message);
        throw err;
      })
      .then((tsdFilesUris) => {
        if (tsdFilesUris.length > 1) {
          throw new Error(`Found  ${tsdFilesUris.map(uri => uri.fsPath).join(',')}. Should not happen`);
        }

        if (tsdFilesUris.length === 1) {
          return vscode.window.showInformationMessage('Found tsd.json, do you want to upgrade?', 'Yes and delete tsd.json', 'Yes')
            .then((response) => {
              switch (response) {
                case 'Yes':
                  options.upgrade = true;
                  break;
                case 'Yes and delete tsd.json':
                default:
                  options.upgrade = true;
                  options.tsdPath = tsdFilesUris[0].fsPath;
              }
            });
        }
      })
      .then(() => initialize(options))
      .then(
      () => vscode.window.showInformationMessage(options.upgrade ?
        'Upgrade completed. Happy coding!' :
        'Initialize completed. Happy coding!')
      ,
      (err) => vscode.window.showErrorMessage(err.message)
      );
  },
};

