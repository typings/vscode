import * as vscode from 'vscode';

export var searchCommand = {
  name: 'typings.search',
  fn: function search(context) {
    vscode.window.showInformationMessage('Will be ready real soon!');
  }
};