import * as vscode from 'vscode';
import * as childProcess from 'child_process';
import 'bluebird';

function runFn(cmd): Promise<any> {
  console.log(cmd);
  return new Promise((resolve, reject) => {
    childProcess.exec('typings ' + cmd,
      { cwd: vscode.workspace.rootPath },
      (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        else {
          resolve(stdout);
        }
      }
    )
  });
}

export var runAnyCommand = {
  name: 'typings.runAny',
  fn: function list(context) {
    vscode.window.showInputBox({
      placeHolder: 'run any typings command',
      prompt: 'You need to pass in all flags needed (alpha version).',
      value: 'install'
    }).then((value) => {
      if (value.toLowerCase().startsWith('typings ')) {
        value = value.slice(7);
      }

      return runFn(value)
        .then((stdout) => {
          vscode.window.showInformationMessage(stdout.toString());
        }).catch((stderr) => {
          vscode.window.showErrorMessage(stderr);
        });
    });
  }
};