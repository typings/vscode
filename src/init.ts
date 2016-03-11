import * as vscode from 'vscode';
import { init } from 'typings-core';

export var initCommand = {
  name: 'typings.init',
  fn: function initFn(context) {
    if (!vscode.workspace.rootPath) {
      return vscode.window.showInformationMessage('No folder opened');
    }

    return vscode.workspace.findFiles('tsd.json', null, 1)
      .then((uriSet) => {
        if (uriSet.length > 0) {
          return vscode.window.showInformationMessage('Found tsd.json, do you want to upgrade?', 'No', 'Yes')
            .then((response) => {
              return response === 'Yes';
            });
        }

        return false;
      })
      .then((upgrade) => {
        return init({
          cwd: vscode.workspace.rootPath,
          upgrade
        }).then(() => {
          if (upgrade) {
            // TODO: delete the file automatically?
            return vscode.window.showInformationMessage('Upgrade completed. You can delete tsd.json. Happy coding!');
          }
          else {
            return vscode.window.showInformationMessage('Initialize completed. Happy coding!');
          }
        });
      });
  }
};
