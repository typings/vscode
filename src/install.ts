import * as vscode from 'vscode';
import * as childProcess from 'child_process';


function installFn() {
  return new Promise((resolve, reject) => {
    let cmd = 'typings install';
    childProcess.exec(cmd, (error, stdio, stderr) => {
      console.log(error, stdio, stderr);
      resolve();
    });
  })
}

export var installCommand = {
  name: 'typings.install',
  fn: function install(context) {
    if (!vscode.workspace.rootPath) {
      vscode.window.showInformationMessage('No folder opened');
      return;
    }
    vscode.window.showInformationMessage('Will be ready real soon!');

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