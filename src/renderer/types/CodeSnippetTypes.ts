export type CodeTypes = 'javascript' | 'typescript' | 'python' | 'cpp' | 'java';

export type CodeSnippet = {
  id: string;
  type: CodeTypes;
  title: string;
  code: string;
  description: string;
};

export type CodeSnippets = CodeSnippet[];
