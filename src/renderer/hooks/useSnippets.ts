import { useContext } from 'react';
import { CodeSnippetContext } from '@contexts/CodeSnippetContext';

const useSnippets = () => {
  const values = useContext(CodeSnippetContext);
  return values;
};

export default useSnippets;
