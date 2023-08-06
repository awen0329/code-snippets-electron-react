import { CodeSnippets } from '@customTypes/codesnippet';

const defaultSnippets: CodeSnippets = [
  {
    id: '1',
    type: 'javascript',
    title: 'reactfc',
    description: 'Create a simple React FC.',
    code: 'import React from {react}',
  },
  {
    id: '2',
    type: 'python',
    title: 'deffn',
    description: 'Create a simple python function.',
    code: 'def func(): \n pass',
  },
];

export default defaultSnippets;
