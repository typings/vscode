import * as vscode from 'vscode';

import {installDependency} from 'typings-core';

export var installCommand = {
  name: 'typings.install',
  fn: function installFn(context) {
    if (!vscode.workspace.rootPath) {
      return vscode.window.showInformationMessage('No folder opened');
    }



// installDependency({name, location}, {cwd: vscode.workspace.rootPath, save,ambient});

    // vscode.window.showInformationMessage('Will be ready real soon!');
    // installFn().then((result) => {
    //   console.log('result', result);
    // }).catch((error) => {
    //   console.log('error', error);
    // });
    // vscode.window.showQuickPick([
    //   'from registry',
    //   'npm',
    //   'bower',
    //   'bitbucket',
    //   'github',
    //   'local file',
    //   'http',
    //   'reinstall definitions in tsconfig.json'
    // ],
    // {
    //   placeHolder: 'Where do you want to install the definition from?'
    // })
    // .then((item) => {
    //   vscode.window.showInformationMessage('Choice is ' + item);
    // });
  }
};