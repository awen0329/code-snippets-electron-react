import { CodeSnippet, CodeSnippets } from './CodeSnippetTypes';

export type CodeSnippetContextValuesType = {
  snippets: CodeSnippets;
  currentSnippet?: CodeSnippet;
  nextSnippet?: CodeSnippet;
  isDirty: boolean;
};

export type CodeSnippetContextActionsType = {
  saveSnippet: (snippet: CodeSnippet) => void;
  removeSnippet: (snippet: CodeSnippet) => void;
  setCurrentSnippet: (snippet: CodeSnippet | undefined) => void; // undefined means I'm creating a new snippet.
  setNextSnippet: (snippet: CodeSnippet | undefined) => void; // undefined means I'll create a new snippet
  setDirty: (b: boolean) => void;
};

export type CodeSnippetContextType = CodeSnippetContextValuesType &
  CodeSnippetContextActionsType;
