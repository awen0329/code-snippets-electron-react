import { IpcMain } from 'electron';
import Store from 'electron-store';

import { CodeSnippets } from '@customTypes/CodeSnippetTypes';

const StoreKey = 'CodeSnippets';

const store = new Store<CodeSnippets>();

export default function InitStore(ipcMain: IpcMain) {
  if (!store.has(StoreKey)) {
    store.set(StoreKey, []);
  }

  ipcMain.on('save', async (event, snippets: CodeSnippets) => {
    try {
      store.set(StoreKey, snippets);
      event.reply('save', 'success');
    } catch (err) {
      event.reply('save', (err as Error).message);
    }
  });

  ipcMain.on('load', async (event) => {
    try {
      const snippets = await store.get<'CodeSnippets', CodeSnippets>(
        StoreKey,
        []
      );
      event.reply('load', snippets);
    } catch (err) {
      event.reply('load', (err as Error).message);
    }
  });
}
