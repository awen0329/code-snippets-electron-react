import { CodeSnippets, CodeSnippet } from '@customTypes/CodeSnippetTypes';

export const SET_CODE_SNIPPETS = 'SET_CODE_SNIPPETS';
export const ADD_CODE_SNIPPET = 'ADD_CODE_SNIPPET';
export const UPDATE_CODE_SNIPPET = 'UPDATE_CODE_SNIPPET';
export const REMOVE_CODE_SNIPPET = 'REMOVE_CODE_SNIPPET';
export const SET_CURRENT_SNIPPET = 'SET_CURRENT_SNIPPET';
export const SET_NEXT_SNIPPET = 'SET_NEXT_SNIPPET';
export const SET_DIRTY = 'SET_DIRTY';

export type CodeSnippetAction =
  | { type: typeof SET_CODE_SNIPPETS; payload: CodeSnippets }
  | { type: typeof ADD_CODE_SNIPPET; payload: CodeSnippet }
  | { type: typeof UPDATE_CODE_SNIPPET; payload: CodeSnippet }
  | { type: typeof REMOVE_CODE_SNIPPET; payload: string }
  | { type: typeof SET_CURRENT_SNIPPET; payload?: CodeSnippet }
  | { type: typeof SET_NEXT_SNIPPET; payload?: CodeSnippet }
  | { type: typeof SET_DIRTY; payload: boolean };
