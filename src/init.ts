import * as vscode from 'vscode';
import * as childProcess from 'child_process';
import 'bluebird';

function initFn(rootPath): Promise<any> {
  return new Promise((resolve, reject) => {
    childProcess.exec('typings init',
      { cwd: rootPath },
      (error, stdout, stderr) => {
        if (stderr) {
          reject(new Error('typings.json already exists'));
        }
        else {
          resolve();
        }
      }
    )
  });
}

export var initCommand = {
  name: 'typings.init',
  fn: function init(context) {
    if (!vscode.workspace.rootPath) {
      vscode.window.showInformationMessage('No folder opened');
      return;
    }

    initFn(vscode.workspace.rootPath).then(() => {
        vscode.window.showInformationMessage('typings.json created');
    }).catch((err)=> {
        vscode.window.showErrorMessage('typings.json already exists');
    });
  }
};