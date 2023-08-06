import { CodeTypes } from '@customTypes/codesnippet';

const codeTypes: {
  [K in CodeTypes]: string;
} = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
};

export default codeTypes;
